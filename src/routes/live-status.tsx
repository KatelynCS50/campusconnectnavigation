import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, MapPin, Lock, CircleDot, Activity, Wifi } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/live-status")({
  head: () => ({
    meta: [
      { title: "Live Status — Real-Time Faculty & Spaces | CampusConnect" },
      {
        name: "description",
        content:
          "See live faculty availability and resource occupancy across campus. Privacy-first: locations hidden when staff are in meetings.",
      },
      { property: "og:title", content: "Live Status — Real-Time Faculty & Spaces | CampusConnect" },
      {
        property: "og:description",
        content:
          "See live faculty availability and resource occupancy. Privacy-first design protects focus time.",
      },
    ],
  }),
  component: LiveStatusPage,
});

type Status = "Available" | "In Class" | "In Meeting" | "Busy";

type Person = {
  name: string;
  initials: string;
  dept: string;
  room: string;
  status: Status;
  time?: string;
};

const faculty: Person[] = [
  { name: "Dr. Sarah Mitchell", initials: "SM", dept: "Computer Science", room: "Room 302, Block B", status: "Available" },
  { name: "Prof. David Chen", initials: "DC", dept: "Physics & Engineering", room: "Lecture Hall 4", status: "In Class", time: "Until 11:30 AM" },
  { name: "Dr. Elena Rodriguez", initials: "ER", dept: "Applied Mathematics", room: "Dean's Office", status: "In Meeting", time: "Back at 2:00 PM" },
  { name: "Dr. Amara Patel", initials: "AP", dept: "Visual Arts", room: "Studio 4B", status: "Available" },
  { name: "Prof. Liam O'Connor", initials: "LO", dept: "Astrophysics", room: "Observatory Deck", status: "Busy", time: "Back at 4:15 PM" },
  { name: "Dr. Marcus Wei", initials: "MW", dept: "Biomedical Eng.", room: "Bio Lab 7", status: "In Class", time: "Until 12:45 PM" },
];

const resources = [
  { name: "Central Library", open: false, note: "Closed for maintenance" },
  { name: "Student Cafeteria", open: true, note: "Serving lunch until 3 PM" },
  { name: "Engineering Lab 3", open: true, note: "All stations available" },
] as const;

function statusBadge(status: Status) {
  switch (status) {
    case "Available":
      return "bg-[var(--emerald)]/12 text-[oklch(0.45_0.16_155)]";
    case "In Class":
      return "bg-destructive/10 text-destructive";
    case "In Meeting":
      return "bg-[oklch(0.95_0.05_70)] text-[oklch(0.55_0.16_60)]";
    case "Busy":
      return "bg-[oklch(0.95_0.05_70)] text-[oklch(0.55_0.16_60)]";
  }
}

function LiveStatusPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      faculty.filter(
        (p) =>
          !query.trim() ||
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.dept.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const counts = {
    Available: faculty.filter((p) => p.status === "Available").length,
    "In Class": faculty.filter((p) => p.status === "In Class").length,
    "In Meeting": faculty.filter((p) => p.status === "In Meeting" || p.status === "Busy").length,
  };

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      <section className="bg-[var(--hero)] pb-12 pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Live Faculty Status
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Real-time availability across the campus — privacy-first by design.
            </p>
          </div>

          {/* Availability summary pills */}
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            <SummaryPill tone="emerald" label="Available" count={counts.Available} />
            <SummaryPill tone="danger" label="In Class" count={counts["In Class"]} />
            <SummaryPill tone="warning" label="In Meeting" count={counts["In Meeting"]} />
          </div>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card p-2 pl-5 shadow-[var(--shadow-card)]">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search faculty by name or department"
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const isBusy = p.status === "In Meeting" || p.status === "Busy";
            return (
              <article
                key={p.name}
                className={`rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] ${
                  isBusy ? "opacity-95" : ""
                }`}
              >
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-base font-bold text-foreground/70">
                      {p.initials}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold leading-tight text-foreground">
                        {p.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                        {p.dept}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusBadge(
                      p.status,
                    )}`}
                  >
                    <CircleDot className="h-2.5 w-2.5" />
                    {p.status}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-6">
                  {isBusy ? (
                    <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/60 p-5">
                      <div className="flex flex-col items-center text-center">
                        <Lock className="mb-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Location Private
                        </p>
                        {p.time && (
                          <p className="mt-1 text-sm font-semibold text-foreground/70">
                            {p.time}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                        <MapPin className="h-4 w-4 text-primary" />
                        {p.room}
                      </div>
                      {p.status === "Available" ? (
                        <Link
                          to="/map"
                          className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                        >
                          View Schedule
                        </Link>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {p.time}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Resource occupancy */}
        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                Resource Occupancy
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Live IoT sensor data across shared campus spaces.
              </p>
            </div>
            <span className="hidden items-center gap-2 text-xs font-semibold text-muted-foreground md:inline-flex">
              <Wifi className="h-3.5 w-3.5" /> Updated just now
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {resources.map((r) => (
              <div
                key={r.name}
                className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">{r.name}</h3>
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest ${
                      r.open
                        ? "bg-[var(--emerald)]/15 text-[oklch(0.42_0.16_155)]"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        r.open ? "bg-[var(--emerald)]" : "bg-destructive"
                      }`}
                    />
                    {r.open ? "Open" : "Closed"}
                  </span>
                </div>
                <p className="mt-4 text-xs font-medium text-muted-foreground">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function SummaryPill({
  tone,
  label,
  count,
}: {
  tone: "emerald" | "danger" | "warning";
  label: string;
  count: number;
}) {
  const cls =
    tone === "emerald"
      ? "bg-[var(--emerald)]/12 text-[oklch(0.42_0.16_155)]"
      : tone === "danger"
        ? "bg-destructive/10 text-destructive"
        : "bg-[oklch(0.95_0.05_70)] text-[oklch(0.5_0.16_60)]";
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-[var(--shadow-card)]`}
    >
      <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-black ${cls}`}>
        {count}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/80">
        {label}
      </span>
    </div>
  );
}
