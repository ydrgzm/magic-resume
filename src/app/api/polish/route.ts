import { NextResponse } from "next/server";
import { AIModelType } from "@/config/ai";
import { AI_MODEL_CONFIGS } from "@/config/ai";

const parseUpstreamError = (raw: string, fallback: string) => {
  if (!raw) return { message: fallback };
  try {
    const data = JSON.parse(raw) as {
      error?: { message?: string; code?: string };
      message?: string;
    };
    return {
      message: data.error?.message || data.message || fallback,
      code: data.error?.code
    };
  } catch {
    return { message: raw };
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey, model, content, modelType, apiEndpoint } = body;

    const modelConfig = AI_MODEL_CONFIGS[modelType as AIModelType];
    if (!modelConfig) {
      throw new Error("Invalid model type");
    }

    const response = await fetch(modelConfig.url(apiEndpoint), {
      method: "POST",
      headers: modelConfig.headers(apiKey),
      body: JSON.stringify({
        model: modelConfig.requiresModelId ? model : modelConfig.defaultModel,
        messages: [
          {
            role: "system",
            content: `You are a professional resume writing assistant. Help improve the following text to make it more professional and impactful.

              Guiding principles:
              1. Use more professional vocabulary and phrasing
              2. Highlight key achievements and skills
              3. Keep it concise and clear
              4. Use active voice
              5. Preserve all original information
              6. Preserve the input formatting exactly

              Output constraints (must follow):
              1. Output only the polished body text itself.
              2. Do not output any preamble, explanation, summary, or additional advice.
              3. Do not include lead-ins such as “Here is...”, “Based on your input...”, “This is...”, “Note:”, “Summary:”, etc.
              4. Do not add new section headings or closing paragraphs unrelated to the original.
              5. Do not wrap the result in a Markdown code block (\`\`\`).
              6. If you generate any explanatory content, remove it before outputting — return only the final body text.`,
          },
          {
            role: "user",
            content,
          },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const fallbackMessage = `Upstream API error: ${response.status} ${response.statusText}`;
      const rawError = await response.text();
      const parsedError = parseUpstreamError(rawError, fallbackMessage);
      return NextResponse.json(
        { error: parsedError },
        { status: response.status }
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let pending = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }

            pending += decoder.decode(value, { stream: true });
            const lines = pending.split(/\r?\n/);
            pending = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;

              try {
                const payload = trimmed.slice(5).trim();
                if (!payload || payload === "[DONE]") continue;

                const data = JSON.parse(payload) as {
                  error?: { message?: string };
                  choices?: Array<{ delta?: { content?: string } }>;
                };
                if (data.error?.message) {
                  controller.error(new Error(data.error.message));
                  return;
                }

                const content = data.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch (e) {
                console.error("Error parsing JSON:", e);
              }
            }
          }

          const tail = (pending + decoder.decode()).trim();
          if (tail.startsWith("data:")) {
            const payload = tail.slice(5).trim();
            if (payload && payload !== "[DONE]") {
              const data = JSON.parse(payload) as {
                choices?: Array<{ delta?: { content?: string } }>;
              };
              const content = data.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            }
          }

          controller.close();
        } catch (error) {
          console.error("Stream reading error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Polish error:", error);
    return NextResponse.json(
      { error: "Failed to polish content" },
      { status: 500 }
    );
  }
}

export const runtime = "edge";
