export default function GlassCard() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/20 p-6 shadow-2xl backdrop-blur-2xl transition-all hover:border-white/40 hover:bg-white/25">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60" />
      <div className="relative">
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Glass Card</span>
        <h3 className="mt-2 text-xl font-semibold text-zinc-800">Frosted depth</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Layered backdrop blur, soft borders, and a gradient overlay. Pure Tailwind.
        </p>
      </div>
    </div>
  );
}
