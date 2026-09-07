import { GoogleGenAI } from "@google/genai";
import { CHAT_MODEL, SYSTEM_PROMPT, buildPortfolioContext } from "@/lib/gemini";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  const { message, history } = (await request.json()) as {
    message: string;
    history?: ChatMessage[];
  };

  if (!message || typeof message !== "string") {
    return new Response("Missing message", { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      "The chat assistant isn't configured yet. Set GEMINI_API_KEY to enable it.",
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const context = buildPortfolioContext();

  const contents = [
    ...(history ?? []).slice(-8).map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    })),
    { role: "user" as const, parts: [{ text: message }] },
  ];

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = await ai.models.generateContentStream({
          model: CHAT_MODEL,
          contents,
          config: {
            systemInstruction: `${SYSTEM_PROMPT}\n\n# Portfolio context\n${context}`,
            maxOutputTokens: 1024,
          },
        });
        for await (const chunk of stream) {
          if (chunk.text) {
            controller.enqueue(encoder.encode(chunk.text));
          }
        }
      } catch (err) {
        controller.enqueue(encoder.encode("\n\nSomething went wrong while responding."));
        console.error("chat stream error", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
