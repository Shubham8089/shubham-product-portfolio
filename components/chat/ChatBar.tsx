"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, ArrowUp } from "lucide-react";
import { ChatPanel } from "./ChatPanel";
import type { ChatMessageData } from "./ChatMessage";

export function ChatBar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function send() {
    const text = input.trim();
    if (!text || isStreaming) return;

    setInput("");
    setOpen(true);
    const history = messages;
    const nextMessages: ChatMessageData[] = [
      ...history,
      { role: "user", content: text },
      { role: "assistant", content: "" },
    ];
    setMessages(nextMessages);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Something went wrong reaching the assistant. Try again in a moment.",
        };
        return copy;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="w-full max-w-xl">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 12 }}
              animate={{ opacity: 1, height: "min(400px, 60dvh)", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-2 flex max-h-[60dvh] flex-col overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-[var(--shadow-card)] backdrop-blur-md"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-2.5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
                  Ask my work
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="text-text-faint transition-colors hover:text-text"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="min-h-0 flex-1 px-3">
                <ChatPanel messages={messages} isStreaming={isStreaming} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`flex items-center gap-2 rounded-full border bg-surface/95 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur-md transition-colors ${
            open ? "border-accent/40" : "border-border"
          }`}
        >
          <Sparkles size={16} className="shrink-0 text-accent" />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder="Ask anything about my work..."
            className="w-full bg-transparent text-sm text-text placeholder:text-text-faint focus:outline-none"
          />
          <button
            type="button"
            onClick={send}
            disabled={!input.trim() || isStreaming}
            aria-label="Send"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-black transition-opacity disabled:opacity-30"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
