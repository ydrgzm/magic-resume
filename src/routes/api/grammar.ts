import { createFileRoute } from "@tanstack/react-router";
import { AIModelType, AI_MODEL_CONFIGS } from "@/config/ai";
import { formatGeminiErrorMessage, getGeminiModelInstance } from "@/lib/server/gemini";

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

export const Route = createFileRoute("/api/grammar")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { apiKey, model, content, modelType, apiEndpoint } = body as {
            apiKey: string;
            model: string;
            content: string;
            modelType: AIModelType;
            apiEndpoint?: string;
          };

          const modelConfig = AI_MODEL_CONFIGS[modelType as AIModelType];
          if (!modelConfig) {
            throw new Error("Invalid model type");
          }

          const systemPrompt = `You are a professional resume proofreader. Your task is to find **only** spelling mistakes and punctuation errors in the resume.

            **Strictly prohibited**:
            1. ❌ Do NOT suggest any style, tone, or rewriting changes. If a sentence is grammatically correct (even if not elegant), do NOT flag it.
            2. ❌ Do NOT report “no errors found” or similar. If no spelling or punctuation errors exist, the “errors” array must be empty.
            3. ❌ Do NOT over-correct technical terms unless context makes it very clear it is a typo.

            **Only check these two error types**:
            1. ✅ **Spelling errors**: e.g. “recieve” instead of “receive”, “manger” instead of “manager”.
            2. ✅ **Serious punctuation errors**: only report repeated punctuation (e.g. “,,”) or clearly misplaced symbols.

            **Important exceptions (never flag)**:
            - ❌ Ignore mixed punctuation styles: in technical resumes, mixing punctuation conventions is acceptable style. Do NOT report this.
            - ❌ Ignore spacing: do not report missing or extra spaces.

            Return format (JSON):
            {
              “errors”: [
                {
                  “context”: “The full sentence containing the error (must be from the original text)”,
                  “text”: “The specific erroneous fragment (must be a string that actually exists in the original)”,
                  “suggestion”: “Only the corrected word or fragment (do NOT return the full sentence unless the whole sentence is wrong)”,
                  “reason”: “Spelling error / Punctuation error”,
                  “type”: “spelling”
                }
              ]
            }

            Reminder: **find spelling and punctuation errors only — do not polish or rewrite!**`;

          if (modelType === "gemini") {
            const geminiModel = model || "gemini-flash-latest";
            const modelInstance = getGeminiModelInstance({
              apiKey,
              model: geminiModel,
              systemInstruction: systemPrompt,
              generationConfig: {
                temperature: 0,
                responseMimeType: "application/json",
              },
            });

            const result = await modelInstance.generateContent(content);
            const text = result.response.text() || "";

            return Response.json({
              choices: [
                {
                  message: {
                    content: text,
                  },
                },
              ],
            });
          }

          const response = await fetch(modelConfig.url(apiEndpoint), {
            method: "POST",
            headers: modelConfig.headers(apiKey),
            body: JSON.stringify({
              model: modelConfig.requiresModelId ? model : modelConfig.defaultModel,
              response_format: {
                type: "json_object"
              },
              messages: [
                {
                  role: "system",
                  content: systemPrompt
                },
                {
                  role: "user",
                  content
                }
              ]
            })
          });

          const raw = await response.text();
          if (!response.ok) {
            const fallbackMessage = `Upstream API error: ${response.status} ${response.statusText}`;
            const parsedError = parseUpstreamError(raw, fallbackMessage);
            return Response.json(
              { error: parsedError },
              { status: response.status }
            );
          }

          let data: unknown;
          try {
            data = raw ? JSON.parse(raw) : {};
          } catch {
            return Response.json(
              { error: "Invalid upstream response: expected JSON payload" },
              { status: 502 }
            );
          }

          return Response.json(data);
        } catch (error) {
          console.error("Error in grammar check:", error);
          return Response.json(
            { error: formatGeminiErrorMessage(error) },
            { status: 500 }
          );
        }
      }
    }
  }
});
