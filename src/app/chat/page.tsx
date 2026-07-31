"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

// How close to the bottom (in px) counts as "still at the bottom" for the
// purpose of auto-scroll. A small tolerance avoids fighting sub-pixel
// rounding from the browser.
const BOTTOM_THRESHOLD_PX = 48;

export default function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Whether the view is currently "pinned" to the bottom. Auto-scroll only
  // fires while pinned; the moment the user scrolls up, we unpin so a
  // streaming response doesn't yank them back down mid-read.
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);

  function handleScroll() {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsPinnedToBottom(distanceFromBottom <= BOTTOM_THRESHOLD_PX);
  }

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
    setIsPinnedToBottom(true);
  }

  // Auto-scroll as new content streams in, but only while pinned. This
  // effect fires on every message-array change, including each streamed
  // token, so it needs to be cheap and it needs to respect the pin.
  useEffect(() => {
    if (isPinnedToBottom) {
      scrollToBottom("auto");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const isBusy = status === "submitted" || status === "streaming";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isBusy) return;
    sendMessage({ text: input });
    setInput("");
    setIsPinnedToBottom(true);
  }

  return (
    <div className="flex flex-col h-[75vh] max-h-[700px]">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      <div className="relative flex-1 min-h-0">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto border rounded-md p-4 space-y-3"
          style={{ borderColor: "var(--border)" }}
        >
          {messages.length === 0 && (
            <p className="text-sm text-gray-500">
              Ask a study question to get started — summarize notes,
              generate quiz questions, or work through a concept together.
            </p>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] sm:max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                message.role === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : "mr-auto bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {message.parts.map((part, i) =>
                part.type === "text" ? (
                  <span key={`${message.id}-${i}`}>{part.text}</span>
                ) : null
              )}
            </div>
          ))}

          {/* Thinking indicator: shown only in the gap between sending
              and the first streamed token arriving. Once any assistant
              text part exists for the in-flight turn, this disappears
              and the streamed bubble above takes over -- a handoff, not
              an abrupt swap. */}
          {status === "submitted" && (
            <div
              className="mr-auto max-w-[80%] px-3 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 flex gap-1"
              aria-live="polite"
              aria-label="Assistant is thinking"
            >
              <span className="animate-bounce [animation-delay:-0.3s]">•</span>
              <span className="animate-bounce [animation-delay:-0.15s]">•</span>
              <span className="animate-bounce">•</span>
            </div>
          )}
        </div>

        {!isPinnedToBottom && (
          <button
            type="button"
            onClick={() => scrollToBottom()}
            className="absolute bottom-3 right-3 rounded-full bg-gray-900 text-white text-xs px-3 py-1.5 shadow-md hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900"
          >
            Jump to latest
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a study question..."
          disabled={isBusy}
          className="flex-1 min-w-0 border rounded-md px-3 py-2 text-sm bg-transparent disabled:opacity-60"
          style={{ borderColor: "var(--border)" }}
        />
        {isBusy ? (
          <button
            type="button"
            onClick={() => stop()}
            className="shrink-0 px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="shrink-0 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
