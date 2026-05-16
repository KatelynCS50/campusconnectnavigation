import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Megaphone,
  Info,
  Bell,
  UserMinus,
  BookOpen,
  Trophy,
  FlaskConical,
  GraduationCap,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import noticesHero from "@/assets/notices-hero.jpg";
import { useTeacherAuth } from "@/lib/teacher-auth";

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
        content: "Latest academic news, teacher absences, and live campus updates in one place.",
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
    body: "The official results for the Spring 2026 semester are now available on the student portal. Please check your dashboard for individual performance reports.",
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

const baseAbsences = [
  { id: "static-1", name: "Prof. James Chen", course: "Intro to CS", tag: "SUBSTITUTE", tone: "emerald" as const, initials: "JC" },
  { id: "static-2", name: "Ms. Elena Rodriguez", course: "Spanish B2", tag: "RESOLVED", tone: "muted" as const, initials: "ER" },
];

const quickUpdates = [
  {
    key: "library",
    icon: BookOpen,
    title: "Library",
    body:
      "Attention: Due to upcoming exams, please return all borrowed books by May 17th, 2026.",
    accent: "bg-white/15",
  },
  {
    key: "exams",
    icon: GraduationCap,
    title: "Exams",
    body:
      "Official Notification: Board Exams are scheduled to commence on June 6th, 2026.",
    accent: "bg-white/15",
  },
  {
    key: "sports",
    icon: Trophy,
    title: "Sports",
    body:
      "Practice Alert: Kho-Kho and Basketball team practice begins at 1:00 PM today in the Play Field.",
    accent: "bg-white/15",
  },
  {
    key: "labs",
    icon: FlaskConical,
    title: "Labs",
    body:
      "Access Restricted: Practical Exams are currently underway in the Biology Lab. Lab unavailable until 5:00 PM.",
    accent: "bg-white/15",
  },
];

const clubMeetings = [
  { club: "Math Club", room: "Quadrangle" },
  { club: "Eco Club", room: "Ground Floor Hall" },
  { club: "Art Club", room: "Art Room" },
  { club: "Drama Club", room: "2nd Floor Hall" },
  { club: "History Club", room: "Pre-KG Mimosa Room" },
  { club: "STEM Club", room: "Physics Lab" },
];

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
  const { accounts } = useTeacherAuth();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % quickUpdates.length), 5000);
    return () => clearInterval(id);
  }, []);

  // Auto-include any logged-in teacher marked "Absent" in the Absences widget.
  const dynamicAbsences = accounts
    .filter((a) => a.status === "Absent")
    .map((a) => ({
      id: a.account.id,
      name: a.account.displayName,
      course: a.account.department,
      tag: "ABSENT",
      tone: "danger" as const,
      initials: a.account.initials,
    }));
  const absences = [...dynamicAbsences, ...baseAbsences];

  const current = quickUpdates[idx];

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      <section className="bg-[var(--hero)] pb-12 pt-16 md:pt-20">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Campus Notices
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Stay updated with the latest academic news and schedule changes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-5 inline-flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
              <Bell className="h-4 w-4 text-primary" /> Announcements
            </h2>

            {/* Featured Symposium card */}
            <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
              <div className="relative">
                <img
                  src={noticesHero}
                  alt="Symposium venue interior"
                  width={1280}
                  height={640}
                  className="h-56 w-full object-cover md:h-72"
                />
                <span className="absolute left-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-card)]">
                  Flagship Event
                </span>
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    Annual Science Symposium 2026
                  </h3>
                  <span className="shrink-0 text-xs font-medium text-muted-foreground">
                    July 6, 2026
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Innovating for Tomorrow: Subsystem Integration & Smart Infrastructure. Join
                  schools and universities for keynotes, project showcases, and live demonstrations
                  across the Main Auditorium and Quadrangle.
                </p>
                <div className="mt-5">
                  <Link
                    to="/symposium"
                    className="inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-xs font-black uppercase tracking-widest text-foreground/80 transition hover:text-foreground"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </article>

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

            {/* Club meetings */}
            <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-base font-bold tracking-tight text-foreground">
                Club Meeting Directory
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {clubMeetings.map((c) => (
                  <div
                    key={c.club}
                    className="flex items-center justify-between rounded-2xl bg-secondary/50 px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-foreground">{c.club}</span>
                    <span className="text-xs font-medium text-muted-foreground">{c.room}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="inline-flex items-center gap-2 text-sm font-bold tracking-tight text-foreground">
                <UserMinus className="h-4 w-4 text-destructive" /> Teacher Absences
              </h3>
              <ul className="mt-5 space-y-4">
                {absences.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-3">
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

            {/* Rotating quick updates */}
            <div className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between">
                <h3 className="inline-flex items-center gap-2 text-sm font-bold tracking-tight">
                  <Bell className="h-4 w-4" /> Quick Updates
                </h3>
                <div className="flex gap-1.5">
                  {quickUpdates.map((u, i) => (
                    <button
                      key={u.key}
                      onClick={() => setIdx(i)}
                      aria-label={`Show ${u.title} update`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === idx ? "w-6 bg-primary-foreground" : "w-1.5 bg-primary-foreground/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-start gap-3">
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${current.accent}`}>
                  <current.icon className="h-5 w-5" />
                </div>
                <div className="min-h-[80px]">
                  <p className="text-sm font-bold uppercase tracking-widest">{current.title}</p>
                  <p className="mt-1 text-xs leading-relaxed opacity-90">{current.body}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
