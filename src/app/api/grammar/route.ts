import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
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
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: `You are a professional resume proofreader. Your task is to find **only** spelling mistakes and punctuation errors in the resume.

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

            Reminder: **find spelling and punctuation errors only — do not polish or rewrite!**`,
          },
          {
            role: "user",
            content: content,
          },
        ],
      }),
    });

    const raw = await response.text();
    if (!response.ok) {
      const fallbackMessage = `Upstream API error: ${response.status} ${response.statusText}`;
      const parsedError = parseUpstreamError(raw, fallbackMessage);
      return NextResponse.json(
        { error: parsedError },
        { status: response.status }
      );
    }

    let data: unknown;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      return NextResponse.json(
        { error: "Invalid upstream response: expected JSON payload" },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in grammar check:", error);
    return NextResponse.json(
      { error: "Failed to check grammar" },
      { status: 500 }
    );
  }
}
export const runtime = "edge";
