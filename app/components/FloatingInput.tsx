"use client";

import { useState } from "react";

export default function FloatingInput() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-xl border border-zinc-300 bg-white/90 px-4 pt-5 pb-2 text-zinc-800 outline-none transition-all placeholder:opacity-0 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
        placeholder=" "
      />
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          floated
            ? "top-2.5 text-xs font-medium text-zinc-500"
            : "top-1/2 -translate-y-1/2 text-base text-zinc-400"
        }`}
      >
        Email address
      </label>
    </div>
  );
}
