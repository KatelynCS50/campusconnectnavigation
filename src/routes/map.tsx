import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  const [zoom, setZoom] = useState(1);
  const zoomIn = () => setZoom((z) => Math.min(2, +(z + 0.2).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(2)));

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      <section className="bg-[var(--hero)] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4 lg:items-start">
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
            <div className="relative h-[600px] overflow-hidden rounded-[2.5rem] border-[12px] border-card shadow-[var(--shadow-soft)]">
              {/* Grass + lake base */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 70% 80%, oklch(0.78 0.13 175) 0%, oklch(0.62 0.16 175) 18%, transparent 24%), linear-gradient(135deg, oklch(0.78 0.14 155) 0%, oklch(0.68 0.16 150) 100%)",
                }}
              />
              {/* MCC Lake reflective shader */}
              <div
                className="pointer-events-none absolute right-[8%] bottom-[12%] h-40 w-56 rounded-[50%] opacity-90 mix-blend-screen blur-sm"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 30%, oklch(0.95 0.05 220) 0%, oklch(0.7 0.16 220) 40%, oklch(0.5 0.14 230) 80%)",
                }}
                aria-hidden
              />
              <span className="absolute right-[12%] bottom-[10%] z-20 rounded-full bg-card/85 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary shadow-[var(--shadow-card)] backdrop-blur">
                MCC Lake
              </span>

              {/* Pathways */}
              <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
                <path
                  d="M 0,400 Q 300,420 500,360 T 900,320"
                  stroke="oklch(0.85 0.02 80)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              {/* 3D scene */}
              <div className="relative z-10 h-full w-full" style={{ perspective: "1400px" }}>
                <div
                  className="flex h-full items-center justify-center transition-transform duration-300 ease-out"
                  style={{
                    transform: `scale(${zoom}) rotateX(48deg) rotateZ(-30deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex items-end gap-12">
                    <Building3D
                      title="BLOCK A"
                      subtitle="Administrative"
                      tone="amber"
                      floors={3}
                    />
                    <Building3D
                      title="BLOCK B"
                      subtitle="Classrooms"
                      tone="primary"
                      floors={4}
                      elevated
                    />
                    <Building3D title="BLOCK C" subtitle="Science Labs" tone="emerald" floors={3} />
                  </div>
                </div>
              </div>

              {/* HUD */}
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

              {/* Zoom controls */}
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

function Building3D({
  title,
  subtitle,
  tone,
  floors,
  elevated = false,
}: {
  title: string;
  subtitle: string;
  tone: "primary" | "emerald" | "amber";
  floors: number;
  elevated?: boolean;
}) {
  const palette =
    tone === "primary"
      ? { wall: "oklch(0.78 0.05 250)", roof: "oklch(0.55 0.13 258)", trim: "oklch(0.36 0.13 258)" }
      : tone === "emerald"
        ? { wall: "oklch(0.85 0.04 155)", roof: "oklch(0.5 0.14 155)", trim: "oklch(0.35 0.14 155)" }
        : { wall: "oklch(0.9 0.04 75)", roof: "oklch(0.6 0.14 60)", trim: "oklch(0.42 0.14 60)" };

  const width = 130;
  const depth = 100;
  const floorH = 34;
  const height = floors * floorH;

  return (
    <div
      className="relative"
      style={{
        width,
        height,
        transformStyle: "preserve-3d",
        transform: `translateZ(${elevated ? 30 : 0}px)`,
      }}
    >
      {/* Front face with windows */}
      <div
        className="absolute left-0 top-0 origin-bottom-left"
        style={{
          width,
          height,
          background: palette.wall,
          transform: `rotateX(-90deg) translateY(${height}px) translateZ(0px)`,
          transformOrigin: "bottom",
          boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.08)",
        }}
      >
        <div className="grid h-full w-full p-2" style={{ gridTemplateRows: `repeat(${floors}, 1fr)` }}>
          {Array.from({ length: floors }).map((_, f) => (
            <div key={f} className="grid grid-cols-4 items-center gap-1.5 px-1">
              {Array.from({ length: 4 }).map((__, w) => (
                <div
                  key={w}
                  className="h-4 rounded-[2px]"
                  style={{
                    background:
                      "linear-gradient(160deg, oklch(0.95 0.04 220) 0%, oklch(0.78 0.1 220) 60%, oklch(0.55 0.12 240) 100%)",
                    boxShadow: `inset 0 0 0 1px ${palette.trim}`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Entrance overhang on bottom row */}
        <div
          className="absolute bottom-0 left-1/2 h-3 w-12 -translate-x-1/2 rounded-t-md"
          style={{ background: palette.trim }}
        />
      </div>

      {/* Right side face */}
      <div
        className="absolute right-0 top-0"
        style={{
          width: depth,
          height,
          background: `linear-gradient(180deg, ${palette.wall} 0%, oklch(0.6 0.04 250) 100%)`,
          transform: `rotateY(90deg) translateX(${width - depth / 2}px) translateZ(${depth / 2}px)`,
          transformOrigin: "right center",
          filter: "brightness(0.85)",
        }}
      />

      {/* Roof with texture */}
      <div
        className="absolute left-0"
        style={{
          width,
          height: depth,
          top: -depth / 2,
          background: `repeating-linear-gradient(45deg, ${palette.roof} 0 6px, oklch(0.5 0.05 250) 6px 12px)`,
          transform: `rotateX(90deg) translateZ(${height / 2}px) translateY(${-depth / 2}px)`,
          boxShadow: "0 8px 24px -4px rgba(0,0,0,0.25)",
          border: `2px solid ${palette.trim}`,
        }}
      />

      {/* Floating label */}
      <div
        className="absolute -top-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-white/60 bg-white/85 px-4 py-2 text-center shadow-[var(--shadow-soft)] backdrop-blur-xl"
        style={{ transform: "translateX(-50%) rotateZ(30deg) rotateX(-48deg) translateY(-20px)" }}
      >
        <span className="block text-sm font-extrabold tracking-tight text-primary">{title}</span>
        <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
