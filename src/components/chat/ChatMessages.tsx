"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "./ChatContext";
import MarkdownRenderer from "./MarkdownRenderer";

export default function ChatMessages() {
  const { messages, isTyping } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 scrollbar-thin">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`flex flex-col max-w-[92%] ${
              msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            <span className="text-[9px] text-gray-500 font-bold mb-1.5 uppercase tracking-widest font-mono select-none">
              {msg.role === "user" ? "You" : "AI Copilot"}
            </span>
            <div
              className={`px-4 py-3 rounded-2xl border prose-chat shadow ${
                msg.role === "user"
                  ? "bg-violet-600 border-violet-500 text-white rounded-tr-none shadow-violet-500/10 font-semibold"
                  : "bg-[#18181C]/90 border-white/5 text-gray-200 rounded-tl-none"
              }`}
            >
              {msg.role === "assistant" ? (
                <MarkdownRenderer content={msg.content} />
              ) : (
                msg.content
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start max-w-[92%]"
        >
          <span className="text-[9px] text-gray-500 font-bold mb-1.5 uppercase tracking-widest font-mono">
            AI Copilot
          </span>
          <div className="bg-[#18181C]/90 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-gray-400 flex items-center gap-2.5 shadow">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="font-semibold font-display">Formulating pitch...</span>
          </div>
        </motion.div>
      )}

      <div ref={endRef} />
    </div>
  );
}
