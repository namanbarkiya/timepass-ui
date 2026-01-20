"use client";

import { Code2, Copy, Link, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  source: string;
  sourcePath: string;
  children: React.ReactNode;
};

const GITHUB_BASE = "https://github.com/namanbarkiya/timepass-ui";

export default function ComponentShowcaseClient({ source, sourcePath, children }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const githubFileUrl = `${GITHUB_BASE}/blob/main/app/components/${sourcePath}.tsx`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative">
      {children}
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          aria-label={`Show code for ${sourcePath}`}
        >
          <Code2 className="h-5 w-5" aria-hidden />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="code-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 animate-[backdrop-in_0.2s_ease-out] bg-zinc-900/60 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div
            className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-2xl shadow-zinc-900/25 animate-[modal-in_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-zinc-200/80 bg-zinc-50/90 px-5 py-3">
              <span
                id="code-modal-title"
                className="truncate font-mono text-sm font-medium text-zinc-700"
              >
                {sourcePath}.tsx
              </span>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200/80 hover:text-zinc-800"
                  aria-label="Copy code"
                >
                  {copied ? "Copied!" : <Copy className="h-4 w-4" aria-hidden />}
                </button>
                <a
                  href={githubFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-200/80 hover:text-zinc-800"
                  aria-label={`View ${sourcePath}.tsx on GitHub`}
                >
                  <Link className="h-4 w-4" aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-200/80 hover:text-zinc-800"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>

            {/* Code */}
            <div className="min-h-0 flex-1 overflow-auto bg-zinc-900">
              <pre className="p-5">
                <code className="font-mono text-[13px] leading-relaxed text-zinc-100">
                  {source}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
