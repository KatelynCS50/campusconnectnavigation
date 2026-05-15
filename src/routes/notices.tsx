import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  CheckCircle2,
  Megaphone,
  Info,
  Bell,
  UserMinus,
  Wifi,
  Coffee,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import noticesHero from "@/assets/notices-hero.jpg";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "Campus Notices — News & Schedule Updates | CampusConnect" },
      {
        name: "description",
        content:
          "Stay updated with the latest academic news, teacher absences, and quick campus updates.",
      },
      { property: "og:title", content: "Campus Notices — News & Schedule Updates | CampusConnect" },
      {
        property: "og:description",
        content:
          "Latest academic news, teacher absences, and live campus updates in one place.",
      },
      { property: "og:image", content: noticesHero },
      { name: "twitter:image", content: noticesHero },
    ],
  }),
  component: NoticesPage,
});

const feed = [
  {
    icon: CheckCircle2,
    tone: "emerald",
    title: "Semester Results Published",
    time: "Today, 10:15 AM",
    body: "The official results for the Spring 2024 semester are now available on the student portal. Please check your dashboard for individual performance reports.",
  },
  {
    icon: Megaphone,
    tone: "primary",
    title: "Main Hall Maintenance",
    time: "Yesterday",
    body: "Access to the Main Campus Hall will be restricted between 2 PM and 6 PM due to electrical maintenance. Please use the East Gate entry.",
  },
  {
    icon: Info,
    tone: "muted",
    title: "Lost & Found: Blue Backpack",
    time: "Oct 24",
    body: "A blue backpack was found in Room 302. Please claim it from the Student Affairs office with proper identification.",
  },
] as const;

const absences = [
  { name: "Dr. Sarah Miller", course: "Calculus III", tag: "CANCELLED", tone: "danger" as const, initials: "SM" },
  { name: "Prof. James Chen", course: "Intro to CS", tag: "SUBSTITUTE", tone: "emerald" as const, initials: "JC" },
  { name: "Ms. Elena Rodriguez", course: "Spanish B2", tag: "RESOLVED", tone: "muted" as const, initials: "ER" },
];

const tags = ["Library", "Exams", "Sports", "Labs", "Clubs"];

function toneClass(tone: "emerald" | "primary" | "muted" | "danger") {
  switch (tone) {
    case "emerald":
      return "bg-[var(--emerald)]/12 text-[oklch(0.42_0.16_155)]";
    case "primary":
      return "bg-primary/10 text-primary";
    case "danger":
      return "bg-destructive/10 text-destructive";
    case "muted":
      return "bg-secondary text-muted-foreground";
  }
}

function NoticesPage() {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      <section className="bg-[var(--hero)] pb-12 pt-16 md:pt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Campus Notices
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Stay updated with the latest academic news and schedule changes.
              </p>
            </div>
            <div className="flex w-full max-w-sm items-center gap-2 rounded-full border border-border bg-card p-2 pl-5 shadow-[var(--shadow-card)]">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notices..."
                className="flex-1 bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Announcements stack */}
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <Bell className="h-4 w-4 text-primary" /> Announcements
              </h2>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                Mark all as read
              </button>
            </div>

            {/* Featured Hero card */}
            <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
              <div className="relative">
                <img
                  src={noticesHero}
                  alt="Modern campus library with floor-to-ceiling windows"
                  width={1280}
                  height={640}
                  className="h-56 w-full object-cover md:h-72"
                />
                <span className="absolute left-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-card)]">
                  Urgent
                </span>
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    Annual Science Symposium 2024
                  </h3>
                  <span className="shrink-0 text-xs font-medium text-muted-foreground">
                    2 hours ago
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Registration is now open for the Annual Science Symposium. All undergraduate
                  students are encouraged to present their research projects. Early bird
                  registration ends this Friday.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-full bg-primary px-5 py-2.5 text-xs font-black uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-95">
                    Register Now
                  </button>
                  <button className="rounded-full border border-border bg-card px-5 py-2.5 text-xs font-black uppercase tracking-widest text-foreground/80 transition hover:text-foreground">
                    Details
                  </button>
                </div>
              </div>
            </article>

            {/* Feed */}
            <div className="mt-6 space-y-4">
              {feed.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="flex items-start gap-5 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)]"
                  >
                    <div
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${toneClass(
                        item.tone,
                      )}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                        <span className="shrink-0 text-xs font-medium text-muted-foreground">
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Right widgets */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="inline-flex items-center gap-2 text-sm font-bold tracking-tight text-foreground">
                <UserMinus className="h-4 w-4 text-destructive" /> Teacher Absences
              </h3>
              <ul className="mt-5 space-y-4">
                {absences.map((a) => (
                  <li key={a.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-xs font-bold text-foreground/70">
                        {a.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{a.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {a.course}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-widest ${toneClass(
                        a.tone,
                      )}`}
                    >
                      {a.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-soft)]">
              <h3 className="inline-flex items-center gap-2 text-sm font-bold tracking-tight">
                <Bell className="h-4 w-4" /> Quick Updates
              </h3>
              <ul className="mt-5 space-y-5">
                <li className="flex items-start gap-3">
                  <Wifi className="mt-0.5 h-4 w-4 text-destructive" />
                  <div>
                    <p className="text-sm font-bold">Library: Closed</p>
                    <p className="text-xs leading-relaxed opacity-75">
                      Currently closed for maintenance — reopens tomorrow 8 AM.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Coffee className="mt-0.5 h-4 w-4 text-[var(--emerald)]" />
                  <div>
                    <p className="text-sm font-bold">Cafeteria: Open</p>
                    <p className="text-xs leading-relaxed opacity-75">
                      Serving lunch until 3 PM, extended hours during exam week.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(active === t ? null : t)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest transition ${
                    active === t
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "border border-border bg-card text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
