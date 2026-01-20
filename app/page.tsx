import {
  GlassNavbar,
  GlassCard,
  GradientBorderCard,
  PillTabs,
  FloatingInput,
  ShineButton,
  LiftedCard,
} from "./components";
import ComponentShowcase from "./components/ComponentShowcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-zinc-50">
      <GlassNavbar />

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6">
        <section className="mb-16">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-800 sm:text-4xl">
            Components
          </h1>
          <p className="mt-2 text-zinc-600">
            Classy, difficult Tailwind-only pieces. No component libraries.
          </p>
        </section>

        <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <ComponentShowcase sourcePath="GlassCard">
            <GlassCard />
          </ComponentShowcase>
          <ComponentShowcase sourcePath="GradientBorderCard">
            <GradientBorderCard />
          </ComponentShowcase>
          <ComponentShowcase sourcePath="LiftedCard">
            <LiftedCard />
          </ComponentShowcase>
          <div className="sm:col-span-2">
            <ComponentShowcase sourcePath="PillTabs">
              <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                  Pill tabs
                </span>
                <div className="mt-4 max-w-sm">
                  <PillTabs />
                </div>
              </div>
            </ComponentShowcase>
          </div>
          <ComponentShowcase sourcePath="FloatingInput">
            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                Floating label
              </span>
              <div className="mt-4">
                <FloatingInput />
              </div>
            </div>
          </ComponentShowcase>
          <ComponentShowcase sourcePath="ShineButton">
            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                Shine button
              </span>
              <div className="mt-4">
                <ShineButton />
              </div>
            </div>
          </ComponentShowcase>
        </section>
      </main>
    </div>
  );
}
