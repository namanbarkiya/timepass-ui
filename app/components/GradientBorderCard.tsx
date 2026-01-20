export default function GradientBorderCard() {
  return (
    <div className="group relative rounded-2xl p-[2px]">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 opacity-80 transition-opacity group-hover:opacity-100" />
      <div className="absolute inset-[2px] rounded-[14px] bg-white" />
      <div className="relative rounded-2xl bg-gradient-to-br from-zinc-50 to-white p-6">
        <span className="text-xs font-medium uppercase tracking-widest text-violet-600">Gradient border</span>
        <h3 className="mt-2 text-xl font-semibold text-zinc-800">Too many colors</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Violet, fuchsia, amber. It&apos;s having a moment. No SVG.
        </p>
      </div>
    </div>
  );
}
