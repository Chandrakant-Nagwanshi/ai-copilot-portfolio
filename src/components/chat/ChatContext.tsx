"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatContextValue {
  messages: ChatMessage[];
  isTyping: boolean;
  isPanelOpen: boolean;
  unreadCount: number;
  sendMessage: (text: string) => Promise<void>;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `**Hi — I'm Chandrakant's AI Career Copilot.**

I'm trained on his full resume, projects, and tech stack. Ask me anything — relocation, notice period, real-time architecture, the auction engine, performance gains. Or pick a quick topic below.`,
  timestamp: new Date("2026-05-26T12:00:00Z"),
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const inFlightRef = useRef(false);

  const openPanel = useCallback(() => {
    setIsPanelOpen(true);
    setUnreadCount(0);
  }, []);
  const closePanel = useCallback(() => setIsPanelOpen(false), []);
  const togglePanel = useCallback(() => {
    setIsPanelOpen((v) => {
      if (!v) setUnreadCount(0);
      return !v;
    });
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || inFlightRef.current) return;
      inFlightRef.current = true;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.content,
            timestamp: new Date(),
          },
        ]);
        if (!isPanelOpen) setUnreadCount((n) => n + 1);
      } catch (err) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "⚠️ **Connection error.** I couldn't reach the AI server. Please try again.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsTyping(false);
        inFlightRef.current = false;
      }
    },
    [messages, isPanelOpen]
  );

  const value = useMemo<ChatContextValue>(
    () => ({
      messages,
      isTyping,
      isPanelOpen,
      unreadCount,
      sendMessage,
      openPanel,
      closePanel,
      togglePanel,
    }),
    [messages, isTyping, isPanelOpen, unreadCount, sendMessage, openPanel, closePanel, togglePanel]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside <ChatProvider>");
  return ctx;
}
