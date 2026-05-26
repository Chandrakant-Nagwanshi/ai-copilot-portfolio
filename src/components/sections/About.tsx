"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitCommit, MapPin, Briefcase, Zap } from "lucide-react";
import { resumeData } from "@/data/resumeContext";

const facts = [
  { icon: Briefcase, label: "Experience", value: "2+ years production React" },
  { icon: MapPin, label: "Based in", value: "Bhopal · open to relocate" },
  { icon: GitCommit, label: "Currently", value: "React JS Dev @ Lincpay" },
  { icon: Zap, label: "Specialty", value: "Real-time + performance" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4 font-display"
            >
              01 · About
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight"
            >
              I build apps that survive <span className="text-gradient">real users</span> and <span className="text-gradient">real load.</span>
            </motion.h2>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-300 text-base md:text-lg leading-relaxed"
          >
            {resumeData.summary}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {facts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-5 hover:border-violet-500/30 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                    <f.icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">
                    {f.label}
                  </span>
                </div>
                <p className="text-white text-sm font-bold">{f.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
