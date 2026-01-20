"use client";

export default function ShineButton() {
    return (
        <button
            type="button"
            className="group relative overflow-hidden rounded-xl bg-zinc-900 px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-zinc-800 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
        >
            <span className="relative z-10">Hover me, I sparkle</span>
            <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                style={{ width: "50%" }}
            />
        </button>
    );
}
