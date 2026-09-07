export interface ChatMessageData {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageData) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-accent text-black"
            : "border border-border bg-surface text-text"
        }`}
      >
        {content || <span className="opacity-50">...</span>}
      </div>
    </div>
  );
}
