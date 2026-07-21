"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your study assistant. Ask me anything about your notes.",
    },
  ]);

  function handleSend() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    // Placeholder: real AI API call will be wired up in a later phase.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "This is a placeholder response. AI integration coming soon.",
        },
      ]);
    }, 400);
  }

  return (
    <div className="flex flex-col h-[70vh] max-h-[600px]">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div
        className="flex-1 overflow-y-auto border rounded-md p-4 space-y-3"
        style={{ borderColor: "var(--border)" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a study question..."
          className="flex-1 border rounded-md px-3 py-2 text-sm bg-transparent"
          style={{ borderColor: "var(--border)" }}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
