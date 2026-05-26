"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Layers, Radio, Gauge, FileCode2, Server } from "lucide-react";
import { resumeData } from "@/data/resumeContext";

const proficiencies = [
  { name: "React.js / Next.js", level: 95 },
  { name: "TypeScript", level: 88 },
  { name: "Redux Toolkit + React Query", level: 90 },
  { name: "WebSockets / Real-time", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Performance Optimization", level: 82 },
];

const stats = [
  { value: "30%", label: "Faster page loads" },
  { value: "40%", label: "Fewer API calls" },
  { value: "25%", label: "More onboardings" },
  { value: "2+", label: "Years in production" },
];

export default function Skills() {
  const langTrack = [...resumeData.skills.languagesAndFrontend, ...resumeData.skills.languagesAndFrontend];

  return (
    <section
      id="skills"
      className="relative py-32 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <div className="mb-14 max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4 font-display"
        >
          03 · Skills
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight"
        >
          The stack I <span className="text-gradient">trust in production.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
        {/* Marquee of core languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-6 glass rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-violet-400" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-display">
              Languages & Frontend
            </h4>
          </div>
          <div className="relative overflow-hidden">
            <div className="marquee-track gap-3">
              {langTrack.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold bg-white/5 border border-white/8 text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#121215] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#121215] to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4 glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-display">
              Proficiency
            </h4>
          </div>
          <div className="space-y-4">
            {proficiencies.map((p, i) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-200">{p.name}</span>
                  <span className="text-[10px] font-mono text-gray-500 font-bold">{p.level}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.level}%` }}
                    transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 grid grid-cols-2 gap-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 flex flex-col justify-center text-center">
              <span className="text-2xl md:text-3xl font-display font-black text-gradient">{s.value}</span>
              <span className="text-[10px] text-gray-400 mt-1 font-bold tracking-wide leading-tight">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Real-time architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-3 glass rounded-2xl p-6 hover:border-emerald-500/30 transition-colors"
        >
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-4 h-4 text-emerald-400" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-display">
              Real-Time Architecture
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.realTimeAndApis.map((s) => (
              <span key={s} className="px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* State & data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-3 glass rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-display">
              State & Remote Data
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.stateManagement.map((s) => (
              <span key={s} className="px-3.5 py-2 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-200">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Forms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileCode2 className="w-4 h-4 text-amber-400" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-display">
              Forms & Validation
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.formsAndValidation.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white/3 border border-white/5 text-gray-300">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-fuchsia-400" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-display">
              Styling & Components
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.stylingAndComponents.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white/3 border border-white/5 text-gray-300">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Backend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-4 h-4 text-violet-400" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-display">
              Backend & Tools
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.backendAndTools.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white/3 border border-white/5 text-gray-300">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Perf */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-6 glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="w-4 h-4 text-amber-400" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-display">
              Performance Optimization
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.performanceOptimization.map((s) => (
              <span key={s} className="px-3.5 py-2 rounded-lg text-xs font-black bg-amber-500/10 border border-amber-500/20 text-amber-400">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
