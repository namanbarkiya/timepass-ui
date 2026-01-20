"use client";

import { useState } from "react";

const tabs = ["Overview", "Analytics", "Settings"];

export default function PillTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-1.5 backdrop-blur-sm">
      <div
        className="absolute rounded-xl bg-white shadow-sm transition-all duration-300 ease-out"
        style={{
          top: 6,
          bottom: 6,
          width: "calc((100% - 12px) / 3)",
          left: `calc(6px + ${active} * ((100% - 12px) / 3))`,
        }}
      />
      <div className="relative grid grid-cols-3">
        {tabs.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`relative z-10 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 ${
              i === active ? "text-zinc-900" : "text-zinc-600 hover:text-zinc-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
