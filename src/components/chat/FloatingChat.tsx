"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Sparkles, X } from "lucide-react";
import { useChat } from "./ChatContext";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const suggestionChips = [
  { label: "Real-time auction engine", query: "Tell me about your WebSocket auction engine — what was the hardest part?" },
  { label: "PsychUp (Team Lead)", query: "What did you ship as Team Lead on PsychUp?" },
  { label: "Performance wins", query: "How did you cut page load times by 30%?" },
  { label: "Notice period & relocation", query: "What's your notice period and are you open to relocation?" },
];

export default function FloatingChat() {
  const { isPanelOpen, togglePanel, closePanel, unreadCount, sendMessage } = useChat();

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={togglePanel}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-violet-600/30 border border-white/10 cursor-pointer group"
        aria-label={isPanelOpen ? "Close AI chat" : "Open AI chat"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isPanelOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="m"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#08080A] animate-pulse" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {!isPanelOpen && unreadCount > 0 && (
          <span className="absolute -top-2 -left-2 min-w-[20px] h-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow">
            {unreadCount}
          </span>
        )}

        {/* Tooltip on hover */}
        {!isPanelOpen && (
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#18181C] border border-white/10 text-white text-xs font-bold px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none">
            Ask my AI <Sparkles className="inline w-3 h-3 ml-1 text-violet-400" />
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: 40, opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed z-50 right-4 left-4 bottom-24 md:left-auto md:right-6 md:bottom-24 md:w-[420px] h-[min(70vh,640px)] flex flex-col glass rounded-3xl overflow-hidden shadow-2xl"
            >
              <header className="px-5 py-4 border-b border-white/5 bg-white/3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-violet-400 animate-pulse shadow-md shadow-violet-400/50" />
                  <div>
                    <h3 className="text-sm font-display font-black text-white flex items-center gap-1.5 tracking-tight">
                      Career Copilot <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">Trained on Chandrakant&apos;s full resume</p>
                  </div>
                </div>
                <button
                  onClick={closePanel}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-gray-300" />
                </button>
              </header>

              <ChatMessages />

              <div className="px-4 pt-2 pb-2 border-t border-white/5 bg-white/3 shrink-0">
                <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
                  {suggestionChips.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => sendMessage(c.query)}
                      className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold bg-white/5 hover:bg-violet-500/15 hover:border-violet-500/30 border border-white/5 text-gray-300 hover:text-white transition-all cursor-pointer"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-white/5 bg-[#0E0E11] shrink-0">
                <ChatInput variant="panel" autoFocus />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
