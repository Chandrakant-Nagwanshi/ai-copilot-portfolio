"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, Play, Timer, TrendingUp } from "lucide-react";

interface Bid {
  id: string;
  user: string;
  amount: number;
  time: string;
}

const initialBidsLog: Bid[] = [
  { id: "1", user: "Bidder_332", amount: 4300, time: "2m ago" },
  { id: "2", user: "Bidder_105", amount: 4400, time: "1m ago" },
  { id: "3", user: "Bidder_332", amount: 4500, time: "30s ago" },
];

const testQuestions = [
  {
    text: "How do you handle real-time rendering in a WebSockets system?",
    options: [
      "Render every single tick immediately using basic state updates",
      "Use debouncing, React.memo, and custom hooks to batch UI state updates",
      "Avoid using React and write pure Vanilla JavaScript",
      "Ignore performance as browsers are extremely fast nowadays",
    ],
    correctIndex: 1,
  },
  {
    text: "What is the best way to handle asynchronous remote API caching in modern React?",
    options: [
      "Fetch inside useEffect and store everything in Redux Toolkit",
      "Use React Query (TanStack Query) for query deduplication, background caching, and automatic refetching",
      "Trigger raw window.fetch inside every single component render pass",
      "Use local storage for all API requests to bypass caching layers",
    ],
    correctIndex: 1,
  },
];

const padding = 12;
const chartWidth = 500;
const chartHeight = 100;

export default function Playground() {
  // -------------------- AUCTION --------------------
  const [currentBid, setCurrentBid] = useState(4500);
  const [bidsHistory, setBidsHistory] = useState<number[]>([4100, 4200, 4300, 4400, 4500]);
  const [bidsLog, setBidsLog] = useState<Bid[]>(initialBidsLog);
  const [timeLeft, setTimeLeft] = useState(25);
  const [bidStatus, setBidStatus] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePlaceBid = () => {
    const nextAmount = currentBid + 100;
    setCurrentBid(nextAmount);
    setBidsHistory((prev) => [...prev, nextAmount]);
    const userBid: Bid = { id: crypto.randomUUID(), user: "You (Recruiter)", amount: nextAmount, time: "Just now" };
    setBidsLog((prev) => [userBid, ...prev.slice(0, 3)]);
    setBidStatus("Your bid placed successfully via mock WebSockets!");
    setTimeLeft(30);

    setTimeout(() => {
      const rivalAmount = nextAmount + 100;
      setCurrentBid(rivalAmount);
      setBidsHistory((prev) => [...prev, rivalAmount]);
      const rivalBid: Bid = { id: crypto.randomUUID(), user: "Bidder_332", amount: rivalAmount, time: "Just now" };
      setBidsLog((prev) => [rivalBid, ...prev.slice(0, 3)]);
      setBidStatus("Bidder_332 outbid you! Real-time syncing active.");
    }, 1500);
  };

  const maxVal = Math.max(...bidsHistory);
  const minVal = Math.min(...bidsHistory);
  const range = maxVal - minVal || 1;

  const pathD = bidsHistory
    .map((val, index) => {
      const x = padding + (index / (bidsHistory.length - 1)) * (chartWidth - 2 * padding);
      const y = chartHeight - padding - ((val - minVal) / range) * (chartHeight - 2 * padding);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const areaD =
    bidsHistory.length > 0
      ? `${pathD} L ${padding + (chartWidth - 2 * padding)} ${chartHeight} L ${padding} ${chartHeight} Z`
      : "";

  // -------------------- PSYCHUP --------------------
  const [testActive, setTestActive] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);
  const [testTimer, setTestTimer] = useState(15);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStartTest = () => {
    setTestActive(true);
    setTestScore(0);
    setCurrentQuestion(0);
    setTestTimer(15);
  };

  const handleNextQuestion = (selectedIdx?: number) => {
    if (selectedIdx === testQuestions[currentQuestion].correctIndex) {
      setTestScore((p) => (p || 0) + 50);
    }
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion((p) => p + 1);
      setTestTimer(15);
    } else {
      setTestActive(false);
    }
  };

  useEffect(() => {
    if (!testActive) return;
    if (testTimer <= 0) {
      const id = setTimeout(handleNextQuestion, 0);
      return () => clearTimeout(id);
    }
    const t = setInterval(() => setTestTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testActive, testTimer]);

  return (
    <section id="playground" className="relative py-32 px-5 md:px-10 max-w-[1200px] mx-auto">
      <div className="mb-14 max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4 font-display"
        >
          04 · Playground
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight"
        >
          Don&apos;t take my word for it — <span className="text-gradient">play with the work.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-base md:text-lg mt-5 leading-relaxed"
        >
          Two live mock-ups of systems I shipped in production. Click around — they&apos;re fully interactive.
        </motion.p>
      </div>

      <div className="flex flex-col gap-10">
        {/* AUCTION */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <span className="px-3 py-1 rounded text-[9px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-display">
                E-Procurement · Real-time
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-black text-white mt-2 tracking-tight">Live WebSocket Auction</h3>
              <p className="text-sm text-gray-400 mt-1.5">Simulates STOMP state synchronization and a live trend chart.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/3 rounded-xl text-xs border border-white/5 font-mono text-cyan-400 shadow-inner">
              <Timer className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span className="font-bold">{timeLeft}s remaining</span>
            </div>
          </div>

          <div className="mb-6 p-4 bg-black/40 border border-white/5 rounded-2xl shadow-inner overflow-hidden">
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
              <span>Real-time bid trend</span>
              <span className="text-cyan-400 font-extrabold">{bidsHistory.length} plots</span>
            </div>
            <svg viewBox="0 0 500 100" className="w-full h-24 stroke-violet-500 fill-violet-500/5">
              <defs>
                <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              {areaD && <path d={areaD} fill="url(#chartGrad2)" stroke="none" />}
              {pathD && <path d={pathD} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
              {bidsHistory.map((val, idx) => {
                const x = padding + (idx / (bidsHistory.length - 1)) * (chartWidth - 2 * padding);
                const y = chartHeight - padding - ((val - minVal) / range) * (chartHeight - 2 * padding);
                return (
                  <g key={idx}>
                    <circle cx={x} cy={y} r="4" className="fill-cyan-400 stroke-black stroke-2" />
                    <text x={x} y={y - 8} textAnchor="middle" className="font-mono text-[8px] fill-gray-400 font-bold">
                      ${val}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="bg-black/50 border border-white/5 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-5 shadow-inner">
            <div className="flex flex-col justify-center items-center p-5 bg-white/3 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black font-display">Current tender price</span>
              <span className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mt-2 tracking-tight">
                ₹{(currentBid * 83).toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-gray-500 mt-1 font-semibold">${currentBid.toLocaleString("en-US")} USD equivalent</span>
              <button
                onClick={handlePlaceBid}
                className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-display font-black text-xs py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 active:scale-95 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4" /> Place bid (+ $100)
              </button>
            </div>

            <div className="flex flex-col justify-between gap-3">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-3 border-b border-white/5 flex items-center justify-between font-display">
                <span>STOMP feed</span>
                <span className="inline-flex items-center gap-1.5 text-[9px] text-emerald-400 lowercase font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> connected
                </span>
              </div>
              <div className="space-y-2">
                {bidsLog.map((bid, idx) => (
                  <div
                    key={bid.id}
                    className={`flex justify-between items-center text-xs p-3 rounded-xl border transition-all duration-300 ${
                      idx === 0
                        ? "bg-violet-500/10 border-violet-500/20 text-violet-200 font-bold shadow-md"
                        : "bg-white/3 border-white/3 text-gray-400"
                    }`}
                  >
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
            <div className="mt-4 px-4 py-3 bg-violet-500/10 border border-violet-500/20 rounded-xl text-sm text-violet-300 font-bold text-center flex items-center justify-center gap-2 shadow-inner">
              <Award className="w-4 h-4 text-violet-400" />
              {bidStatus}
            </div>
          )}
        </motion.div>

        {/* PSYCHUP */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl" />

          <div className="mb-6">
            <span className="px-3 py-1 rounded text-[9px] font-black bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-widest font-display">
              Healthcare · Mental Health
            </span>
            <h3 className="text-xl md:text-2xl font-display font-black text-white mt-2 tracking-tight">PsychUp Timed Assessment</h3>
            <p className="text-sm text-gray-400 mt-1.5">Role-based timer scoring and conditional question logic.</p>
          </div>

          {!testActive ? (
            <div className="bg-black/40 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-5 shadow-inner">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shadow-lg">
                <Timer className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h4 className="font-display font-black text-white text-lg">Interactive Assessment Engine</h4>
                <p className="text-sm text-gray-400 mt-2 max-w-[420px] mx-auto leading-relaxed">
                  Take a timed technical test simulating the PsychUp scoring logic under pressure.
                </p>
              </div>
              <button
                onClick={handleStartTest}
                className="bg-violet-600 hover:bg-violet-500 text-white font-display font-black text-xs px-7 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-xl shadow-violet-500/20 active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Start timed test
              </button>
            </div>
          ) : (
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 shadow-inner">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest font-display">
                  Question {currentQuestion + 1} of {testQuestions.length}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-3 py-1 rounded-lg border ${
                    testTimer <= 5
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse"
                      : "bg-white/3 border-white/5 text-gray-400"
                  }`}
                >
                  {testTimer}s remaining
                </span>
              </div>

              <h4 className="font-display font-bold text-white text-base md:text-lg leading-relaxed mb-5">
                {testQuestions[currentQuestion].text}
              </h4>

              <div className="space-y-3">
                {testQuestions[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNextQuestion(idx)}
                    className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 hover:border-violet-500/30 text-sm font-semibold text-gray-200 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {testScore !== null && !testActive && (
            <div className="mt-4 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-sm shadow-inner">
              <div className="flex items-center gap-2.5 text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Mock test finished!</span>
              </div>
              <span className="font-black font-mono text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/10">
                Score: {testScore}%
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
