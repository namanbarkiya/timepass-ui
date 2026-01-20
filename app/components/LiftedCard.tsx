export default function LiftedCard() {
  return (
    <div
      className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-300/50"
      style={{ transform: "perspective(1000px) rotateX(0)" }}
    >
      <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">3D lift</span>
      <h3 className="mt-2 text-xl font-semibold text-zinc-800">Hover to lift</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
        translate-y and shadow transitions for a subtle 3D elevation. Clean and tactile.
      </p>
    </div>
  );
}
