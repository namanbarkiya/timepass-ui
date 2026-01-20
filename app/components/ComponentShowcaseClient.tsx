"use client";

import { useEffect, useState } from "react";

type Props = {
  source: string;
  sourcePath: string;
  children: React.ReactNode;
};

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function ComponentShowcaseClient({ source, sourcePath, children }: Props) {
  const [open, setOpen] = useState(false);

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
          <CodeIcon className="h-5 w-5" />
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
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-200/80 bg-zinc-50/90 px-5 py-3">
              <span
                id="code-modal-title"
                className="font-mono text-sm font-medium text-zinc-700"
              >
                {sourcePath}.tsx
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-200/80 hover:text-zinc-800"
                aria-label="Close"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
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
