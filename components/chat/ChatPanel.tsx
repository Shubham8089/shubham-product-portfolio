import { useEffect, useRef } from "react";
import { ChatMessage, type ChatMessageData } from "./ChatMessage";

interface ChatPanelProps {
  messages: ChatMessageData[];
  isStreaming: boolean;
}

export function ChatPanel({ messages, isStreaming }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-text-muted">
          Ask about a project, a company, or a skill.
        </p>
        <p className="font-mono text-xs text-text-faint">
          e.g. &quot;What did he build at SpotDraft?&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto px-1 py-2">
      {messages.map((m, i) => (
        <ChatMessage key={i} role={m.role} content={m.content} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
