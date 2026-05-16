import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Book, FlaskConical, Users, Navigation, Plus, Minus } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import campusMap from "@/assets/campus-map.png";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Campus Map — Explore Campus | CampusConnect" },
      {
        name: "description",
        content:
          "Explore an isometric view of the campus. Identify classrooms, labs, and staff rooms with IoT precision.",
      },
      { property: "og:title", content: "Campus Map — Explore Campus | CampusConnect" },
      {
        property: "og:description",
        content:
          "Explore an isometric view of the campus. Identify classrooms, labs, and staff rooms with IoT precision.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [zoom, setZoom] = useState(1);
  const zoomIn = () => setZoom((z) => Math.min(2.2, +(z + 0.2).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(2)));

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      <section className="bg-[var(--hero)] py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-4 lg:items-start">
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
              <LegendItem icon={<FlaskConical className="h-4 w-4" />} label="Labs" tone="emerald" />
              <LegendItem icon={<Users className="h-4 w-4" />} label="Staff Rooms" tone="amber" />
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="relative h-[600px] overflow-hidden rounded-[2.5rem] border-[12px] border-card bg-secondary shadow-[var(--shadow-soft)]">
              <div className="absolute inset-0 overflow-auto">
                <div
                  className="flex h-full min-h-full min-w-full items-center justify-center transition-transform duration-300 ease-out"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
                >
                  <img
                    src={campusMap}
                    alt="Isometric illustration of the CampusConnect campus with classrooms, courtyard and play fields"
                    className="max-h-full max-w-full select-none object-contain"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 z-30 flex items-center gap-4 rounded-3xl border border-white/10 bg-primary px-5 py-4 text-primary-foreground shadow-[var(--shadow-soft)]">
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

              <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-2.5">
                <button
                  onClick={zoomIn}
                  aria-label="Zoom in"
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-card text-foreground shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)] active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={zoomOut}
                  aria-label="Zoom out"
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-card text-foreground shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)] active:scale-95"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="rounded-full bg-card/85 px-2 py-0.5 text-center text-[10px] font-black uppercase tracking-widest text-foreground/70 backdrop-blur">
                  {Math.round(zoom * 100)}%
                </span>
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
