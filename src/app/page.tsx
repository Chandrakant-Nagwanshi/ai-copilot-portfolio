"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Sparkles, Terminal, Code, Briefcase, 
  GraduationCap, Phone, Mail, MapPin, 
  Play, Timer, CheckCircle2, Cpu, 
  TrendingUp, Award, ExternalLink, Download, Loader2, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "@/data/resumeContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Home() {
  // Hydration safety mount check
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Tabs for Left Panel
  const [activeTab, setActiveTab] = useState<"experience" | "skills" | "playground">("experience");

  // AI Chat States
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `👋 **Welcome! I am Chandrakant's Dedicated AI Recopilot.**

I am trained directly on his complete professional experience, portfolio data, and technical philosophies. 

Ask me anything about his credentials, or choose one of the quick topics below to get started!`,
      timestamp: new Date("2026-05-26T12:00:00Z")
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggestion chips (optimized labels and queries)
  const suggestionChips = [
    { label: "💬 WebSocket & Bidding Panel", query: "Explain your experience with WebSockets and the e-procurement auction platform." },
    { label: "🏥 PsychUp Platform (Lead)", query: "What did you do as a Team Lead for the PsychUp platform?" },
    { label: "💳 Fintech & Payments", query: "Tell me about the Merchant Payment Panel and what tools you used." },
    { label: "⚡ React Performance Gains", query: "How did you achieve 30% page load optimization on Lincpay projects?" },
    { label: "💼 Relocation & Notice Period", query: "Are you open to relocation, and what is your notice period?" }
  ];

  // Auto scroll to chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  // Handle message send
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isAiTyping) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsAiTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          content: data.content,
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          content: "⚠️ **Connection Error:** Could not connect to the AI copilot server. Please make sure the server is running.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // ---------------- MOCK PLAYGROUND 1: LIVE AUCTION BIDDING ----------------
  const [currentBid, setCurrentBid] = useState(4500);
  const [bidsHistory, setBidsHistory] = useState<number[]>([4100, 4200, 4300, 4400, 4500]);
  const [bidsLog, setBidsLog] = useState<{ id: string; user: string; amount: number; time: string }[]>([
    { id: "1", user: "Bidder_332", amount: 4300, time: "2m ago" },
    { id: "2", user: "Bidder_105", amount: 4400, time: "1m ago" },
    { id: "3", user: "Bidder_332", amount: 4500, time: "30s ago" }
  ]);
  const [timeLeft, setTimeLeft] = useState(25);
  const [bidStatus, setBidStatus] = useState<string | null>(null);

  // Auction dynamic countdown
  useEffect(() => {
    if (activeTab !== "playground") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handlePlaceBid = () => {
    const nextAmount = currentBid + 100;
    setCurrentBid(nextAmount);
    setBidsHistory((prev) => [...prev, nextAmount]);
    
    const userBid = { id: Math.random().toString(), user: "You (Recruiter)", amount: nextAmount, time: "Just now" };
    setBidsLog((prev) => [userBid, ...prev.slice(0, 3)]);
    setBidStatus("Your bid placed successfully via Mock WebSockets!");
    setTimeLeft(30);

    setTimeout(() => {
      const rivalAmount = nextAmount + 100;
      setCurrentBid(rivalAmount);
      setBidsHistory((prev) => [...prev, rivalAmount]);
      const rivalBid = { id: Math.random().toString(), user: "Bidder_332", amount: rivalAmount, time: "Just now" };
      setBidsLog((prev) => [rivalBid, ...prev.slice(0, 3)]);
      setBidStatus("Bidder_332 outbid you! Real-time syncing active.");
    }, 1500);
  };

  // SVG Chart calculations
  const maxVal = Math.max(...bidsHistory);
  const minVal = Math.min(...bidsHistory);
  const range = maxVal - minVal || 1;
  const padding = 12;
  const chartWidth = 500;
  const chartHeight = 100;

  const points = bidsHistory.map((val, index) => {
    const x = padding + (index / (bidsHistory.length - 1)) * (chartWidth - 2 * padding);
    const y = (chartHeight - padding) - ((val - minVal) / range) * (chartHeight - 2 * padding);
    return `${x},${y}`;
  }).join(" ");

  const pathD = bidsHistory.map((val, index) => {
    const x = padding + (index / (bidsHistory.length - 1)) * (chartWidth - 2 * padding);
    const y = (chartHeight - padding) - ((val - minVal) / range) * (chartHeight - 2 * padding);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(" ");

  const areaD = bidsHistory.length > 0 
    ? `${pathD} L ${padding + (bidsHistory.length - 1) / (bidsHistory.length - 1) * (chartWidth - 2 * padding)} ${chartHeight} L ${padding} ${chartHeight} Z`
    : "";

  // ---------------- MOCK PLAYGROUND 2: PSYCHUP TIMED TEST ENGINE ----------------
  const [testActive, setTestActive] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);
  const [testTimer, setTestTimer] = useState(15);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const testQuestions = [
    {
      text: "How do you handle real-time rendering in a WebSockets system?",
      options: [
        "Render every single tick immediately using basic state updates",
        "Use debouncing, React.memo, and custom hooks to batch UI state updates",
        "Avoid using React and write pure Vanilla JavaScript",
        "Ignore performance as browsers are extremely fast nowadays"
      ],
      correctIndex: 1
    },
    {
      text: "What is the best way to handle asynchronous remote API caching in modern React?",
      options: [
        "Fetch inside useEffect and store everything in Redux Toolkit",
        "Use React Query (TanStack Query) for query deduplication, background caching, and automatic refetching",
        "Trigger raw window.fetch inside every single component render pass",
        "Use local storage for all API requests to bypass caching layers"
      ],
      correctIndex: 1
    }
  ];

  // Timed Test Countdown
  useEffect(() => {
    if (!testActive || testTimer <= 0) {
      if (testTimer === 0 && testActive) {
        handleNextQuestion();
      }
      return;
    }
    const timerInterval = setInterval(() => {
      setTestTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [testActive, testTimer]);

  const handleStartTest = () => {
    setTestActive(true);
    setTestScore(0);
    setCurrentQuestion(0);
    setTestTimer(15);
  };

  const handleNextQuestion = (selectedIdx?: number) => {
    if (selectedIdx === testQuestions[currentQuestion].correctIndex) {
      setTestScore((prev) => (prev || 0) + 50);
    }

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTestTimer(15);
    } else {
      setTestActive(false);
    }
  };

  // ---------------- INTERACTIVE ATS RESUME GENERATOR SIMULATION ----------------
  const [resumeState, setResumeState] = useState<"idle" | "generating" | "complete">("idle");
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownloadResume = () => {
    if (resumeState !== "idle") return;
    setResumeState("generating");
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setResumeState("complete");
          
          // Trigger actual clean text file download representing resume context
          const resumeText = `CHANDRAKANT NAGWANSHI\nReact JS Developer\nBhopal, India\nEmail: chandrakantnagwanshi97@gmail.com\n\nExperience:\n1. Lincpay Solutions Pvt. Ltd - React JS Developer (Oct 2024 - Present)\n2. Freelance Web Developer (Oct 2023 - July 2024)\n\nEducation:\nMCA - SGSITS, Indore (2021 - 2023)\nBCA - NRI Institute of Technology, Bhopal (2016 - 2019)`;
          const blob = new Blob([resumeText], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "Chandrakant_Nagwanshi_Resume.txt";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setTimeout(() => {
            setResumeState("idle");
          }, 3500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Formatted chat response markdown renderer
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Check for bold elements (**text**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="text-white font-extrabold">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const contentNode = parts.length > 0 ? parts : line;

      // Unordered lists
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanLine = line.replace(/^[\*\-]\s+/, '');
        
        // Parse bold formatting for lists inline to avoid render-recursion
        const listParts = [];
        let listLastIdx = 0;
        let listMatch;
        const listBoldRegex = /\*\*(.*?)\*\*/g;
        while ((listMatch = listBoldRegex.exec(cleanLine)) !== null) {
          if (listMatch.index > listLastIdx) {
            listParts.push(cleanLine.substring(listLastIdx, listMatch.index));
          }
          listParts.push(
            <strong key={listMatch.index} className="text-white font-extrabold">
              {listMatch[1]}
            </strong>
          );
          listLastIdx = listBoldRegex.lastIndex;
        }
        if (listLastIdx < cleanLine.length) {
          listParts.push(cleanLine.substring(listLastIdx));
        }
        const listContentNode = listParts.length > 0 ? listParts : cleanLine;

        return (
          <li key={idx} className="list-disc ml-5 mt-1 text-gray-300 leading-relaxed font-sans text-sm">
            {listContentNode}
          </li>
        );
      }

      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-xs font-black text-violet-400 uppercase tracking-widest mt-4 mb-2 font-display">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ') || line.startsWith('# ')) {
        return (
          <h3 key={idx} className="text-sm font-extrabold text-white mt-4 mb-2 font-display">
            {line.replace(/^##?\s+/, '')}
          </h3>
        );
      }

      // Spaces
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-gray-300 leading-relaxed text-sm mt-1 font-sans">
          {contentNode}
        </p>
      );
    });
  };

  // Client-side hydration rendering fallback guard
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] text-gray-100 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase font-display">Loading Portfolio Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0C] text-gray-100 flex flex-col font-sans relative overflow-hidden">
      
      {/* Decorative Interactive Background elements */}
      <div className="grid-overlay" />
      <div className="absolute top-[-15%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-violet-600/10 blur-[180px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-cyan-500/5 blur-[180px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "4s" }} />


      {/* HEADER BAR */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full border-b border-white/8 bg-[#0A0A0C]/70 backdrop-blur-xl px-6 md:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-display font-black text-xl text-white shadow-lg shadow-violet-500/20">
            CN
          </div>
          <div>
            <h1 className="font-display font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              {resumeData.personalInfo.name}
            </h1>
            <p className="text-[10px] text-violet-400 font-black tracking-widest uppercase mt-0.5 flex items-center gap-1.5 font-display">
              <Cpu className="w-3.5 h-3.5 animate-pulse" /> Frontend React Engineer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Open to High-Impact Opportunities
          </span>
        </div>
      </motion.header>

      {/* CORE GRID LAYOUT */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-6 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* LEFT PANEL */}
        <section className="lg:col-span-7 flex flex-col gap-8">
          
          {/* PROFILE CARD */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-[#121215]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-10 flex flex-col gap-8 relative overflow-hidden shadow-2xl hover:border-white/15 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-violet-500/5 rounded-full blur-3xl" />
            
            <div className="flex-1 flex flex-col justify-between gap-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-display font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 leading-tight">
                  Building Scalable, Highly Optimized Web Applications.
                </h2>
                <p className="text-gray-400 text-sm lg:text-base mt-4 leading-relaxed font-normal">
                  {resumeData.summary}
                </p>
              </div>

              {/* CONTACT DETAILS PANEL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 pt-6 border-t border-white/5 text-xs text-gray-300">
                <a href={`mailto:${resumeData.personalInfo.email}`} className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-violet-500/30 group-hover:bg-violet-500/5 transition-all">
                    <Mail className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="font-semibold">{resumeData.personalInfo.email}</span>
                </a>
                <a href={`tel:${resumeData.personalInfo.phone}`} className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-violet-500/30 group-hover:bg-violet-500/5 transition-all">
                    <Phone className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="font-semibold">{resumeData.personalInfo.phone}</span>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="font-semibold">{resumeData.personalInfo.location}</span>
                </div>
                
                {/* PDF Resume Simulator Trigger inside profile */}
                <button 
                  onClick={handleDownloadResume}
                  disabled={resumeState !== "idle"}
                  className="flex items-center gap-3 text-left hover:text-white transition-all group disabled:opacity-80 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center border border-violet-500 shadow-md shadow-violet-500/20 group-hover:scale-105 transition-all">
                    {resumeState === "idle" && <Download className="w-4 h-4 text-white" />}
                    {resumeState === "generating" && <Loader2 className="w-4 h-4 text-white animate-spin" />}
                    {resumeState === "complete" && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    {resumeState === "idle" && <span className="font-bold text-violet-400 group-hover:text-violet-300">Download PDF Resume</span>}
                    {resumeState === "generating" && (
                      <div className="flex flex-col gap-1 w-28">
                        <span className="text-[10px] text-gray-400 font-bold">Generating...</span>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-violet-500" style={{ width: `${downloadProgress}%` }} />
                        </div>
                      </div>
                    )}
                    {resumeState === "complete" && <span className="font-bold text-emerald-400">Download Complete!</span>}
                  </div>
                </button>
              </div>

              {/* Social and quick targets */}
              <div className="flex items-center gap-4 text-xs font-black border-t border-white/5 pt-4">
                <a href={`https://${resumeData.personalInfo.github}`} target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition-colors">
                  GitHub <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                  LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* TAB SYSTEM TABS CONTROLLER WITH SMOOTH SLIDING Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#121215]/40 border border-white/8 p-1.5 rounded-2xl flex gap-1.5 shadow-inner"
          >
            <button
              onClick={() => setActiveTab("experience")}
              className="relative flex-1 flex items-center justify-center gap-2.5 py-4 text-sm font-display font-black rounded-xl transition-all duration-300 cursor-pointer z-10 text-gray-400 hover:text-white"
            >
              {activeTab === "experience" && (
                <motion.span
                  layoutId="activeTabSlider"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl -z-10 shadow-lg shadow-violet-500/20"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <Briefcase className={`w-4 h-4 transition-colors ${activeTab === "experience" ? "text-white" : "text-gray-400"}`} />
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className="relative flex-1 flex items-center justify-center gap-2.5 py-4 text-sm font-display font-black rounded-xl transition-all duration-300 cursor-pointer z-10 text-gray-400 hover:text-white"
            >
              {activeTab === "skills" && (
                <motion.span
                  layoutId="activeTabSlider"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl -z-10 shadow-lg shadow-violet-500/20"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <Code className={`w-4 h-4 transition-colors ${activeTab === "skills" ? "text-white" : "text-gray-400"}`} />
              Core Skills
            </button>
            <button
              onClick={() => setActiveTab("playground")}
              className="relative flex-1 flex items-center justify-center gap-2.5 py-4 text-sm font-display font-black rounded-xl transition-all duration-300 cursor-pointer z-10 text-gray-400 hover:text-white"
            >
              {activeTab === "playground" && (
                <motion.span
                  layoutId="activeTabSlider"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl -z-10 shadow-lg shadow-violet-500/20"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <Terminal className={`w-4 h-4 transition-colors ${activeTab === "playground" ? "text-white" : "text-gray-400"}`} />
              Interactive Playgrounds
            </button>
          </motion.div>

          {/* ANIMATABLE TAB CONTENTS PORT */}
          <div className="flex-1 flex flex-col min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* EXPERIENCE TAB */}
              {activeTab === "experience" && (
                <motion.div 
                  key="experience-tab"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8"
                >
                  {resumeData.experience.map((exp, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ y: -3 }}
                      className="bg-[#121215]/50 backdrop-blur-2xl border border-white/8 rounded-3xl p-8 relative overflow-hidden shadow-xl hover:border-violet-500/20 hover:shadow-violet-950/5 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-white/5">
                        <div>
                          <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-3 font-display">
                            {exp.duration}
                          </span>
                          <h3 className="text-xl font-display font-black text-white tracking-tight">{exp.role}</h3>
                          <p className="text-sm font-semibold text-cyan-400 mt-1">{exp.company} • {exp.location}</p>
                        </div>
                      </div>

                      {exp.projects ? (
                        <div className="flex flex-col gap-8 mt-4">
                          {exp.projects.map((proj, pIdx) => (
                            <div key={pIdx} className="pl-6 border-l-2 border-violet-500/15 hover:border-violet-500 transition-colors duration-500">
                              <h4 className="text-base font-display font-black text-white flex items-center gap-3">
                                {proj.name} 
                                {proj.role === "Team Lead" && (
                                  <span className="px-2.5 py-1 rounded text-[9px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest font-display">
                                    {proj.role}
                                  </span>
                                )}
                              </h4>
                              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                                {proj.description}
                              </p>
                              <ul className="mt-4 space-y-2.5">
                                {proj.details.map((detail, dIdx) => (
                                  <li key={dIdx} className="text-gray-300 text-xs flex items-start gap-3 leading-relaxed">
                                    <span className="text-violet-500 font-extrabold select-none mt-1">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-3.5 mt-2">
                          {exp.highlights?.map((hl, hIdx) => (
                            <li key={hIdx} className="text-gray-300 text-xs flex items-start gap-3 leading-relaxed">
                              <span className="text-violet-500 font-extrabold select-none mt-1">•</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ))}

                  {/* EDUCATION BLOCK */}
                  <motion.div 
                    whileHover={{ y: -3 }}
                    className="bg-[#121215]/50 backdrop-blur-2xl border border-white/8 rounded-3xl p-8 shadow-xl hover:border-violet-500/20 transition-all duration-300"
                  >
                    <h3 className="text-lg font-display font-black text-white flex items-center gap-3 mb-6">
                      <GraduationCap className="w-5.5 h-5.5 text-cyan-400" /> Academic Credentials
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {resumeData.education.map((edu, idx) => (
                        <div key={idx} className="bg-white/3 border border-white/5 p-5 rounded-2xl hover:border-violet-500/20 transition-colors">
                          <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest block mb-2 font-display">
                            {edu.duration}
                          </span>
                          <h4 className="font-display font-black text-white text-sm leading-tight">{edu.degree}</h4>
                          <p className="text-gray-400 text-xs mt-1.5 font-medium">{edu.institution}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* SKILLS TAB */}
              {activeTab === "skills" && (
                <motion.div 
                  key="skills-tab"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#121215]/50 backdrop-blur-2xl border border-white/8 rounded-3xl p-8 lg:p-10 flex flex-col gap-8 shadow-2xl"
                >
                  {/* Languages & Frontend */}
                  <div className="group">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2.5 font-display group-hover:text-violet-400 transition-colors">
                      <span className="w-2 h-2 rounded bg-violet-400 shadow-md shadow-violet-500/50" /> Languages & Frontend
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {resumeData.skills.languagesAndFrontend.map((skill, sIdx) => (
                        <motion.span 
                          key={sIdx} 
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/3 border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-gray-200 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* State & Remote Data */}
                  <div className="group">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2.5 font-display group-hover:text-cyan-400 transition-colors">
                      <span className="w-2 h-2 rounded bg-cyan-400 shadow-md shadow-cyan-500/50" /> State & Remote Data
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {resumeData.skills.stateManagement.map((skill, sIdx) => (
                        <motion.span 
                          key={sIdx} 
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/3 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all text-gray-200 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Real-time Architecture */}
                  <div className="group">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2.5 font-display group-hover:text-emerald-400 transition-colors">
                      <span className="w-2 h-2 rounded bg-emerald-400 shadow-md shadow-emerald-500/50" /> Real-Time Architecture
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {resumeData.skills.realTimeAndApis.map((skill, sIdx) => (
                        <motion.span 
                          key={sIdx} 
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2.5 rounded-xl text-xs font-black bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Performance Optimization */}
                  <div className="group">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2.5 font-display group-hover:text-amber-400 transition-colors">
                      <span className="w-2 h-2 rounded bg-amber-400 shadow-md shadow-amber-500/50" /> Performance Optimization
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {resumeData.skills.performanceOptimization.map((skill, sIdx) => (
                        <motion.span 
                          key={sIdx} 
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2.5 rounded-xl text-xs font-black bg-amber-500/10 border border-amber-500/20 text-amber-400 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Splits Forms and Tools */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                    <div>
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 font-display">
                        Forms & Validation
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.formsAndValidation.map((skill, sIdx) => (
                          <span key={sIdx} className="px-3.5 py-2 rounded-lg text-[11px] font-semibold bg-white/3 border border-white/3 text-gray-400">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 font-display">
                        Backend Basics & Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.backendAndTools.map((skill, sIdx) => (
                          <span key={sIdx} className="px-3.5 py-2 rounded-lg text-[11px] font-semibold bg-white/3 border border-white/3 text-gray-400">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PLAYGROUND TAB */}
              {activeTab === "playground" && (
                <motion.div 
                  key="playground-tab"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8"
                >
                  {/* PLAYGROUND 1: AUCTION DASHBOARD SIMULATOR */}
                  <div className="bg-[#121215]/50 backdrop-blur-2xl border border-white/8 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/3 rounded-full blur-2xl" />
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div>
                        <span className="px-3 py-1 rounded text-[9px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-display">
                          E-Procurement Module
                        </span>
                        <h3 className="text-xl font-display font-black text-white mt-2 tracking-tight">Live WebSocket Auction Simulator</h3>
                        <p className="text-xs text-gray-400 mt-1">Simulate real-time STOMP state synchronization and graph tracking.</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/3 rounded-xl text-xs border border-white/5 font-mono text-cyan-400 shadow-inner">
                        <Timer className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                        <span className="font-bold">{timeLeft}s remaining</span>
                      </div>
                    </div>

                    {/* SVG GRAPH AREA PLOTTED DYNAMICALLY */}
                    <div className="mb-6 p-4 bg-black/40 border border-white/5 rounded-2xl shadow-inner relative overflow-hidden">
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                        <span>Real-Time Bids Plotted Trend Graph</span>
                        <span className="text-cyan-400 font-extrabold font-mono">Index scale ({bidsHistory.length} plots)</span>
                      </div>
                      
                      <div className="w-full overflow-hidden">
                        <svg viewBox="0 0 500 100" className="w-full h-24 stroke-violet-500 fill-violet-500/5">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          
                          {/* Base grid lines */}
                          <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                          {/* Gradient Area path */}
                          {areaD && (
                            <path d={areaD} fill="url(#chartGrad)" stroke="none" />
                          )}

                          {/* Line path */}
                          {pathD && (
                            <path d={pathD} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          )}

                          {/* Plot markers */}
                          {bidsHistory.map((val, idx) => {
                            const x = padding + (idx / (bidsHistory.length - 1)) * (chartWidth - 2 * padding);
                            const y = (chartHeight - padding) - ((val - minVal) / range) * (chartHeight - 2 * padding);
                            return (
                              <g key={idx}>
                                <circle 
                                  cx={x} 
                                  cy={y} 
                                  r="4" 
                                  className="fill-cyan-400 stroke-black stroke-2 shadow-xl hover:scale-125 transition-transform" 
                                />
                                <text 
                                  x={x} 
                                  y={y - 8} 
                                  textAnchor="middle" 
                                  className="font-mono text-[8px] fill-gray-400 font-bold"
                                >
                                  ${val}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    </div>

                    <div className="bg-black/50 border border-white/5 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-inner">
                      {/* Bid action block */}
                      <div className="flex flex-col justify-center items-center p-6 bg-white/3 rounded-2xl border border-white/5 text-center">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black font-display">Current Tender Price</span>
                        <span className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mt-2 tracking-tight">
                          ₹{(currentBid * 83).toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-gray-500 mt-1 font-semibold">($ {currentBid.toLocaleString("en-US")} USD equivalent)</span>
                        
                        <button
                          onClick={handlePlaceBid}
                          className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-display font-black text-xs py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 active:scale-95 cursor-pointer"
                        >
                          <TrendingUp className="w-4 h-4" /> Place Next Bid (+ $100)
                        </button>
                      </div>

                      {/* Log data sync feed */}
                      <div className="flex flex-col justify-between gap-4">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-3 border-b border-white/5 flex items-center justify-between font-display">
                          <span>STOMP websocket feed</span>
                          <span className="inline-flex items-center gap-1.5 text-[9px] text-emerald-400 lowercase font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> connected
                          </span>
                        </div>
                        <div className="space-y-2 flex-1 flex flex-col justify-center">
                          {bidsLog.map((bid, idx) => (
                            <div key={bid.id} className={`flex justify-between items-center text-xs p-3 rounded-xl border transition-all duration-300 ${
                              idx === 0 
                                ? "bg-violet-500/10 border-violet-500/20 text-violet-200 font-bold shadow-md" 
                                : "bg-white/3 border-white/3 text-gray-400"
                            }`}>
                              <span className="flex items-center gap-2">
                                {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />}
                                {bid.user}
                              </span>
                              <span className="font-mono">₹{(bid.amount * 83).toLocaleString("en-IN")}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {bidStatus && (
                      <div className="mt-4 px-4 py-3 bg-violet-500/10 border border-violet-500/20 rounded-xl text-xs text-violet-300 font-bold text-center animate-fade-in flex items-center justify-center gap-2 shadow-inner">
                        <Award className="w-4 h-4 text-violet-400 animate-bounce" />
                        {bidStatus}
                      </div>
                    )}
                  </div>

                  {/* PLAYGROUND 2: MENTAL HEALTH ASSESSMENT SIMULATOR */}
                  <div className="bg-[#121215]/50 backdrop-blur-2xl border border-white/8 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-violet-500/3 rounded-full blur-2xl" />
                    
                    <div className="flex justify-between items-center gap-4 mb-6">
                      <div>
                        <span className="px-3 py-1 rounded text-[9px] font-black bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-widest font-display">
                          Mental Health Module
                        </span>
                        <h3 className="text-xl font-display font-black text-white mt-2 tracking-tight">Timed Assessment Simulator (PsychUp)</h3>
                        <p className="text-xs text-gray-400 mt-1">Examine role-based timer scoring and conditional question logic.</p>
                      </div>
                    </div>

                    {!testActive ? (
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-6 shadow-inner">
                        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shadow-lg">
                          <Timer className="w-7 h-7 text-violet-400" />
                        </div>
                        <div>
                          <h4 className="font-display font-black text-white text-sm">Interactive Assessment Engine</h4>
                          <p className="text-xs text-gray-400 mt-2 max-w-[400px] mx-auto leading-relaxed">
                            Take a timed technical test simulating the PsychUp platform's automated scoring logic under pressure.
                          </p>
                        </div>
                        <button
                          onClick={handleStartTest}
                          className="bg-violet-600 hover:bg-violet-500 text-white font-display font-black text-xs px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-xl shadow-violet-500/20 active:scale-95 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" /> Start Timed Test
                        </button>
                      </div>
                    ) : (
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-6 shadow-inner">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                          <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest font-display">
                            Question {currentQuestion + 1} of {testQuestions.length}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-lg border ${
                            testTimer <= 5 
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse" 
                              : "bg-white/3 border-white/5 text-gray-400"
                          }`}>
                            {testTimer}s remaining
                          </span>
                        </div>
                        
                        <h4 className="font-display font-bold text-white text-sm leading-relaxed mb-6">
                          {testQuestions[currentQuestion].text}
                        </h4>
                        
                        <div className="space-y-3">
                          {testQuestions[currentQuestion].options.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleNextQuestion(idx)}
                              className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 hover:border-violet-500/30 text-xs font-semibold text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {testScore !== null && !testActive && (
                      <div className="mt-4 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs animate-fade-in shadow-inner">
                        <div className="flex items-center gap-2.5 text-emerald-300 font-bold">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                          <span>Mock Test Finished!</span>
                        </div>
                        <span className="font-black font-mono text-emerald-400 bg-emerald-500/5 px-3 py-1 rounded-lg border border-emerald-500/10">
                          Score Profile: {testScore}% Match
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </section>

        {/* RIGHT PANEL: SECURE AI CO-PILOT CHAT SYSTEM */}
        <motion.section 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 bg-[#121215]/60 backdrop-blur-2xl border border-white/10 rounded-3xl flex flex-col min-h-[550px] lg:h-[calc(100vh-140px)] relative overflow-hidden shadow-2xl hover:border-white/15 transition-colors duration-500"
        >
          {/* AI Panel Header */}
          <div className="px-6 py-5 border-b border-white/5 bg-white/3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-violet-400 animate-pulse shadow-md shadow-violet-400/50" />
              <div>
                <h3 className="text-sm font-display font-black text-white flex items-center gap-1.5 tracking-tight">
                  Recruiter Copilot <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-gray-400 font-bold mt-0.5 font-display">Trained directly on all resume parameters</p>
              </div>
            </div>
            <div className="text-[9px] px-2.5 py-1 rounded-lg font-mono font-bold bg-white/3 text-cyan-400 border border-white/5 shadow-inner">
              Gemini 2.5 Flash
            </div>
          </div>

          {/* AI Messages Stream Logs */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className={`flex flex-col max-w-[90%] ${
                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <span className="text-[9px] text-gray-500 font-bold mb-1.5 uppercase tracking-widest font-mono select-none">
                    {msg.role === "user" ? "Recruiter" : "AI Copilot"}
                  </span>

                  <div
                    className={`px-4 py-3 rounded-2xl border prose-chat ${
                      msg.role === "user"
                        ? "bg-violet-600 border-violet-500 text-white rounded-tr-none shadow-md shadow-violet-500/10 font-semibold"
                        : "bg-[#18181C]/90 border-white/5 text-gray-200 rounded-tl-none font-normal"
                    } shadow`}
                  >
                    {msg.role === "assistant" ? renderFormattedContent(msg.content) : msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* AI thinking state loader */}
            {isAiTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start max-w-[90%]"
              >
                <span className="text-[9px] text-gray-500 font-bold mb-1.5 uppercase tracking-widest font-mono">
                  AI Copilot
                </span>
                <div className="bg-[#18181C]/90 border border-white/5 rounded-2xl rounded-tl-none px-4.5 py-3.5 text-xs text-gray-400 flex items-center gap-2.5 shadow">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="font-semibold font-display">Formulating pitch...</span>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Chat suggestions chips */}
          <div className="px-5 py-3 border-t border-white/5 bg-white/3 flex flex-col gap-2.5">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black font-display">Choose a topic:</span>
            <div className="flex overflow-x-auto gap-2.5 pb-2 scrollbar-none">
              {suggestionChips.map((chip, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleSendMessage(chip.query)}
                  disabled={isAiTyping}
                  className="flex-shrink-0 px-4 py-2.5 rounded-full text-[10px] font-bold bg-white/3 border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-gray-200 disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                  {chip.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chat input block */}
          <div className="p-5 border-t border-white/5 bg-[#121215]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isAiTyping}
                placeholder="Ask me anything about Chandrakant..."
                className="w-full bg-[#18181C] border border-white/5 rounded-2xl py-4.5 pl-5 pr-14 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-all disabled:opacity-60 shadow-inner"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isAiTyping}
                className="absolute right-3.5 p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-white/3 text-white disabled:text-gray-500 transition-all flex items-center justify-center active:scale-95 shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </motion.section>

      </div>

      {/* FOOTER METRICS BAR */}
      <footer className="w-full border-t border-white/8 py-5 px-8 bg-[#0A0A0C] text-center flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-gray-500 font-semibold relative z-10">
        <p>© 2026 {resumeData.personalInfo.name}. All Rights Reserved.</p>
        <p className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" /> Custom Engine Built using Next.js 16, React 19, and Tailwind CSS.
        </p>
      </footer>

    </main>
  );
}

