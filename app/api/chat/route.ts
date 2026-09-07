import Anthropic from "@anthropic-ai/sdk";
import { CHAT_MODEL, SYSTEM_PROMPT, buildPortfolioContext } from "@/lib/anthropic";

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

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      "The chat assistant isn't configured yet. Set ANTHROPIC_API_KEY to enable it.",
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const client = new Anthropic();
  const context = buildPortfolioContext();

  const messages: Anthropic.MessageParam[] = [
    ...(history ?? []).slice(-8).map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: message },
  ];

  const stream = client.messages.stream({
    model: CHAT_MODEL,
    max_tokens: 1024,
    system: [
      {
        type: "text",
        text: `${SYSTEM_PROMPT}\n\n# Portfolio context\n${context}`,
        cache_control: { type: "ephemeral" },
      },
    ],
    output_config: { effort: "low" },
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
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
