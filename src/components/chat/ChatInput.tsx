"use client";

import React, { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { useChat } from "./ChatContext";

interface Props {
  variant?: "hero" | "panel";
  placeholder?: string;
  autoFocus?: boolean;
  /** If true, sending a message also opens the floating panel. */
  openPanelOnSend?: boolean;
}

export default function ChatInput({
  variant = "panel",
  placeholder = "Ask me anything about Chandrakant...",
  autoFocus = false,
  openPanelOnSend = false,
}: Props) {
  const { sendMessage, isTyping, openPanel } = useChat();
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text || isTyping) return;
    setValue("");
    if (openPanelOnSend) openPanel();
    await sendMessage(text);
  };

  if (variant === "hero") {
    return (
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl group">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 rounded-2xl blur-md opacity-70 group-focus-within:opacity-100 animate-pulse-slow transition duration-500" />
        <div className="relative flex items-center bg-[#1A1A22] border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
          <Sparkles className="ml-4 w-5 h-5 text-violet-300 shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isTyping}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="flex-1 bg-transparent px-3 py-4 text-base text-white placeholder-gray-400 focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!value.trim() || isTyping}
            className="mr-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:from-white/10 disabled:to-white/10 disabled:text-gray-500 text-white text-sm font-display font-black tracking-wide transition-all flex items-center gap-2 active:scale-95 cursor-pointer shadow-lg shadow-violet-500/30 disabled:shadow-none"
          >
            Ask AI
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isTyping}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full bg-[#18181C] border border-white/5 rounded-2xl py-4 pl-5 pr-14 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-all disabled:opacity-60 shadow-inner"
      />
      <button
        type="submit"
        disabled={!value.trim() || isTyping}
        className="absolute right-3 p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-white/5 text-white disabled:text-gray-500 transition-all flex items-center justify-center active:scale-95 shadow-md cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
