import { createFileRoute } from "@tanstack/react-router";
import { Book, FlaskConical, Users, Navigation, Plus, Minus } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Campus Map — Explore Campus | CampusConnect" },
      {
        name: "description",
        content:
          "Explore an isometric 3D view of the campus. Identify classrooms, labs, and staff rooms with IoT precision.",
      },
      { property: "og:title", content: "Campus Map — Explore Campus | CampusConnect" },
      {
        property: "og:description",
        content:
          "Explore an isometric 3D view of the campus. Identify classrooms, labs, and staff rooms with IoT precision.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      <section className="bg-[var(--hero)] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4 lg:items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Explore Campus
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Navigate through school blocks and facilities with IoT precision.
            </p>

            <div className="mt-10 space-y-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Map Legend
              </p>
              <LegendItem icon={<Book className="h-4 w-4" />} label="Classrooms" tone="primary" />
              <LegendItem
                icon={<FlaskConical className="h-4 w-4" />}
                label="Labs"
                tone="emerald"
              />
              <LegendItem icon={<Users className="h-4 w-4" />} label="Staff Rooms" tone="amber" />
            </div>
          </aside>

          {/* Map canvas */}
          <div className="lg:col-span-3">
            <div className="relative h-[560px] overflow-hidden rounded-[2.5rem] border-[12px] border-card bg-secondary shadow-[var(--shadow-soft)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.95_0.04_250),oklch(0.88_0.02_250))]" />

              {/* Subtle isometric grid */}
              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full opacity-30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="iso" width="60" height="34" patternUnits="userSpaceOnUse">
                    <path d="M0 17 L30 0 L60 17 L30 34 Z" fill="none" stroke="oklch(0.7 0.02 250)" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#iso)" />
              </svg>

              {/* Glassmorphism blocks */}
              <div className="relative z-10 flex h-full items-center justify-center">
                <div className="flex flex-wrap items-end justify-center gap-10">
                  <BlockLabel title="BLOCK A" subtitle="Administrative" />
                  <BlockLabel title="BLOCK B" subtitle="Classrooms" elevated />
                  <BlockLabel title="BLOCK C" subtitle="Science & Labs" />
                </div>
              </div>

              {/* Navigation HUD */}
              <div className="absolute bottom-6 left-6 flex items-center gap-4 rounded-3xl border border-white/10 bg-primary px-5 py-4 text-primary-foreground shadow-[var(--shadow-soft)]">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <Navigation className="h-5 w-5 fill-current" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    Current Path
                  </p>
                  <p className="text-base font-bold tracking-tight md:text-lg">
                    Block B, Hallway 2-C
                  </p>
                </div>
              </div>

              {/* Zoom controls */}
              <div className="absolute bottom-6 right-6 flex flex-col gap-2.5">
                <button
                  aria-label="Zoom in"
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-card text-foreground shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)]"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  aria-label="Zoom out"
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-card text-foreground shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)]"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function LegendItem({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: "primary" | "emerald" | "amber";
}) {
  const toneClass =
    tone === "primary"
      ? "bg-primary/10 text-primary"
      : tone === "emerald"
        ? "bg-[var(--emerald)]/15 text-[oklch(0.45_0.16_155)]"
        : "bg-[oklch(0.95_0.05_70)] text-[oklch(0.55_0.16_60)]";
  return (
    <div className="flex items-center gap-4">
      <div className={`grid h-9 w-9 place-items-center rounded-xl ${toneClass}`}>{icon}</div>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}

function BlockLabel({
  title,
  subtitle,
  elevated = false,
}: {
  title: string;
  subtitle: string;
  elevated?: boolean;
}) {
  return (
    <div
      className={`rounded-[2rem] border border-white/60 bg-white/40 px-8 py-7 text-center shadow-[var(--shadow-soft)] backdrop-blur-xl ${
        elevated ? "-translate-y-6" : "translate-y-6"
      }`}
    >
      <span className="block text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
        {title}
      </span>
      <span className="mt-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {subtitle}
      </span>
    </div>
  );
}
