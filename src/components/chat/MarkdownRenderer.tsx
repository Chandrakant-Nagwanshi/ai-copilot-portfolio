"use client";

import React from "react";

function renderInline(line: string) {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(line)) !== null) {
    if (m.index > last) parts.push(line.substring(last, m.index));
    parts.push(
      <strong key={`${m.index}-${m[1]}`} className="text-white font-extrabold">
        {m[1]}
      </strong>
    );
    last = regex.lastIndex;
  }
  if (last < line.length) parts.push(line.substring(last));
  return parts.length > 0 ? parts : line;
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          return (
            <li
              key={idx}
              className="list-disc ml-5 mt-1 text-gray-300 leading-relaxed text-sm"
            >
              {renderInline(line.replace(/^[\*\-]\s+/, ""))}
            </li>
          );
        }

        if (line.startsWith("### ")) {
          return (
            <h4
              key={idx}
              className="text-xs font-black text-violet-400 uppercase tracking-widest mt-4 mb-2 font-display"
            >
              {line.replace("### ", "")}
            </h4>
          );
        }
        if (line.startsWith("## ") || line.startsWith("# ")) {
          return (
            <h3
              key={idx}
              className="text-sm font-extrabold text-white mt-4 mb-2 font-display"
            >
              {line.replace(/^##?\s+/, "")}
            </h3>
          );
        }

        if (trimmed === "") return <div key={idx} className="h-2" />;

        return (
          <p
            key={idx}
            className="text-gray-300 leading-relaxed text-sm mt-1"
          >
            {renderInline(line)}
          </p>
        );
      })}
    </>
  );
}
