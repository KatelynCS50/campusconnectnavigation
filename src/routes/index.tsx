import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  User,
  MapPin,
  Map as MapIcon,
  Bell,
  Activity,
  Wifi,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import libraryKiosk from "@/assets/library-kiosk.jpg";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/directory" });
  };

  return (
    <section className="relative bg-[var(--hero)] pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground/70 shadow-[var(--shadow-card)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" />
          Your campus, intelligently connected
        </span>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[88px] lg:leading-[1.02]">
          Find. Connect. Navigate.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Your digital concierge for campus life — locate peers in real time,
          peek at faculty schedules, and move through every hallway with
          effortless precision.
        </p>

        <form onSubmit={submit} className="mx-auto mt-10 max-w-2xl">
          <div className="group flex items-center gap-2 rounded-full border border-border bg-card p-2 pl-6 shadow-[var(--shadow-glow)] transition focus-within:shadow-[0_0_0_10px_oklch(0.36_0.13_258/0.08),0_16px_50px_-8px_oklch(0.36_0.13_258/0.25)]">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search teacher or student name"
              className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground md:text-base"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
            >
              SEARCH
            </button>
          </div>
        </form>

        <BentoGrid />
      </div>
    </section>
  );
}

function BentoGrid() {
  return (
    <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-5 text-left md:grid-cols-3">
      <Link
        to="/directory"
        className="md:row-span-2 relative overflow-hidden rounded-3xl border border-border bg-[var(--emerald)] p-8 text-[color:var(--emerald-foreground)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
      >
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider opacity-90">
            <Activity className="h-4 w-4" />
            Live Status
          </div>
          <h3 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
            Check current teacher status &amp; availability.
          </h3>
          <p className="mt-3 text-sm/6 opacity-90">
            Real-time presence across every department, updated the moment
            things change.
          </p>
          <div className="mt-auto flex items-center gap-2 pt-10 text-sm font-medium">
            View live board <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>

      <FeatureCard
        to="/directory"
        icon={<User className="h-5 w-5" />}
        title="Find Teacher"
        body="Locate any faculty member instantly with smart presence detection."
      />
      <FeatureCard
        to="/map"
        icon={<MapIcon className="h-5 w-5" />}
        title="Campus Map"
        body="Interactive 2D and 3D navigation across all building floors."
      />

      <article className="md:col-span-2 relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
        <div className="flex items-start gap-5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Bell className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">Notices</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--emerald)]/10 px-2.5 py-1 text-[11px] font-medium text-[oklch(0.45_0.16_155)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--emerald)]" />
                Live
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Live school announcements — exam schedules, room changes, and
              campus alerts streamed to you.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  to: "/directory" | "/map";
}) {
  return (
    <Link
      to={to}
      className="group rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
    >
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </Link>
  );
}

function Precision() {
  const checklist = [
    { t: "Indoor Navigation", d: "Turn-by-turn through every floor and wing." },
    { t: "Real-time Updates", d: "IoT sensors keep status fresh by the second." },
    { t: "Instant Notifications", d: "Never miss a room change or campus alert." },
    { t: "Smarter Connectivity", d: "Peer-to-peer presence woven into the map." },
  ];

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground/70">
            <Wifi className="h-3.5 w-3.5" />
            IoT-enabled ecosystem
          </span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-primary md:text-5xl lg:text-6xl">
            Precision in your palm
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            CampusConnect weaves smart sensors, live schedules, and indoor
            mapping into a single calm interface — so you can glide between
            classes, labs, and study spaces without ever guessing where to go
            next.
          </p>

          <ul className="mt-10 space-y-5">
            {checklist.map((c) => (
              <li key={c.t} className="flex items-start gap-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--emerald)] text-[color:var(--emerald-foreground)]">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{c.t}</p>
                  <p className="text-sm text-muted-foreground">{c.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-soft)]">
            <img
              src={libraryKiosk}
              alt="Student using a digital navigation kiosk in a grand campus library"
              width={1280}
              height={1536}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute left-6 top-6 flex items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur md:left-8 md:top-8">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--emerald)] text-[color:var(--emerald-foreground)]">
              <MapPin className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Library</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--emerald)]" />
                Closed for maintenance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <Hero />
      <Precision />
      <SiteFooter />
    </main>
  );
}
