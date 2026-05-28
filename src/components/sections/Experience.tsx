"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, MessageSquareText } from "lucide-react";
import { resumeData } from "@/data/resumeContext";
import { useChat } from "../chat/ChatContext";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const { sendMessage, openPanel } = useChat();

  const askAboutProject = (projectName: string) => {
    openPanel();
    sendMessage(`Tell me more about the ${projectName} project — your role, the tech stack, and what you shipped.`);
  };

  return (
    <section
      id="experience"
      className="relative py-32 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <div className="mb-14 max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4 font-display"
        >
          02 · Experience
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight"
        >
          Where I&apos;ve <span className="text-gradient">shipped real software.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-base md:text-lg mt-5 leading-relaxed"
        >
          Two years of production frontend across fintech, healthcare, and real-time procurement systems.
        </motion.p>
      </div>

      <div ref={containerRef} className="relative">
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/8" aria-hidden />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 w-px bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
          aria-hidden
        />

        <div className="flex flex-col gap-16">
          {resumeData.experience.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${idx}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12"
            >
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 rounded-full bg-violet-500 ring-4 ring-[#08080A] shadow-[0_0_16px_rgba(139,92,246,0.7)]" />

              <div className={`${idx % 2 === 0 ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"}`}>
                <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-3 font-display">
                  {exp.duration}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">{exp.role}</h3>
                <p className="text-base font-semibold text-cyan-400 mt-1.5">
                  {exp.company} · {exp.location}
                </p>
              </div>

              <div className={`mt-6 md:mt-0 space-y-6 ${idx % 2 === 0 ? "md:pl-12" : "md:order-1 md:pr-12"}`}>
                {exp.projects ? (
                  exp.projects.map((proj) => (
                    <div
                      key={proj.name}
                      className="glass rounded-2xl p-6 hover:border-violet-500/30 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="text-lg md:text-xl font-display font-black text-white flex items-center gap-2 flex-wrap">
                          {proj.name}
                          {proj.role !== "Frontend Developer" && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest font-display">
                              {proj.role}
                            </span>
                          )}
                        </h4>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{proj.description}</p>
                      <ul className="space-y-2.5">
                        {proj.details.map((d, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2.5 leading-relaxed">
                            <span className="text-violet-500 font-black select-none mt-1">›</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => askAboutProject(proj.name)}
                        className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-violet-300 hover:text-violet-200 transition-colors cursor-pointer"
                      >
                        <MessageSquareText className="w-3.5 h-3.5" />
                        Ask the AI about this project
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="glass rounded-2xl p-6">
                    <ul className="space-y-2.5">
                      {exp.highlights?.map((h, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2.5 leading-relaxed">
                          <span className="text-violet-500 font-black select-none mt-1">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Education node */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative pl-12 md:pl-0"
          >
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-[#08080A] shadow-[0_0_16px_rgba(34,211,238,0.7)]" />

            <div className="md:max-w-3xl md:mx-auto">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-display">
                  Education
                </span>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-display font-black text-white flex items-center gap-3 mb-5 justify-center">
                  <GraduationCap className="w-5 h-5 text-cyan-400" /> Academic Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resumeData.education.map((edu) => (
                    <div
                      key={edu.degree}
                      className="bg-white/3 border border-white/5 p-5 rounded-xl hover:border-cyan-500/20 transition-colors"
                    >
                      <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block mb-2 font-display">
                        {edu.duration}
                      </span>
                      <h4 className="font-display font-black text-white text-base leading-tight">{edu.degree}</h4>
                      <p className="text-gray-400 text-sm mt-1.5 font-medium">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
