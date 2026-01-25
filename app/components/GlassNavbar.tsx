import { Github } from "lucide-react";

export default function GlassNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 mx-auto mt-4 max-w-5xl px-4 sm:px-6">
            <div
                className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-6 py-3 shadow-xl backdrop-blur-xl supports-backdrop-filter:bg-white/5"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            >
                <a
                    href="/"
                    className="text-lg font-semibold tracking-tight text-zinc-800"
                >
                    Timepass UI
                </a>
                <a
                    href="https://github.com/namanbarkiya/timepass-ui/tree/main/app/components"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-300/50 bg-white/40 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-400/60 hover:bg-white/70 hover:shadow"
                >
                    <Github className="h-5 w-5" aria-hidden />
                    Steal the code
                </a>
            </div>
        </nav>
    );
}
