import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Send, Search, CalendarDays } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScheduleModal } from "@/components/schedule-modal";
import { useTeacherAuth } from "@/lib/teacher-auth";
import { TEACHERS, type TeacherAccount } from "@/lib/teacher-data";

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Directory — Find Your Community | CampusConnect" },
      {
        name: "description",
        content:
          "Locate faculty and classmates in real time. Filter by department and navigate directly with smart pathfinding.",
      },
      { property: "og:title", content: "Directory — Find Your Community | CampusConnect" },
      {
        property: "og:description",
        content:
          "Locate faculty and classmates in real time. Filter by department and navigate directly with smart pathfinding.",
      },
    ],
  }),
  component: DirectoryPage,
});

type Status = "Available" | "In Class" | "Do Not Disturb" | "Absent" | "Busy";

type Member = {
  name: string;
  dept: string;
  room: string;
  status: Status;
  initials: string;
  category: "Teachers" | "Students";
  field: "Science" | "Arts" | "Engineering";
  teacherId?: string; // links to TEACHERS for live status + schedule
};

const baseMembers: Member[] = [
  { name: "Dr. Sarah Mitchell", dept: "Dept. of Computer Science", room: "Room 302, Block B", status: "Available", initials: "SM", category: "Teachers", field: "Science", teacherId: "sarah-mitchell" },
  { name: "Marcus Chen", dept: "Dept. of Arts", room: "Lecture Hall B", status: "In Class", initials: "MC", category: "Students", field: "Arts" },
  { name: "Prof. Elena Rodriguez", dept: "Dept. of Science", room: "Faculty Office 12", status: "Busy", initials: "ER", category: "Teachers", field: "Science" },
  { name: "Jordan Smith", dept: "Dept. of Engineering", room: "Main Library G-4", status: "Available", initials: "JS", category: "Students", field: "Engineering" },
  { name: "Dr. Amara Patel", dept: "Dept. of Visual Arts", room: "Studio 4B", status: "Available", initials: "AP", category: "Teachers", field: "Arts", teacherId: "amara-patel" },
  { name: "Liam O'Connor", dept: "Dept. of Science", room: "Physics Lab 210", status: "In Class", initials: "LO", category: "Students", field: "Science" },
];

const filters = ["All", "Teachers", "Science", "Arts"] as const;
type Filter = (typeof filters)[number];

function statusStyles(status: Status) {
  switch (status) {
    case "Available":
      return "bg-[var(--emerald)] text-[color:var(--emerald-foreground)]";
    case "In Class":
      return "bg-destructive text-destructive-foreground";
    case "Do Not Disturb":
    case "Busy":
      return "bg-[oklch(0.72_0.17_60)] text-[oklch(0.18_0.03_250)]";
    case "Absent":
      return "bg-muted-foreground/30 text-foreground/70";
  }
}

// Location is visible only when Available or In Class. Hidden for DND/Busy/Absent.
function locationVisible(status: Status) {
  return status === "Available" || status === "In Class";
}

function DirectoryPage() {
  const [active, setActive] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [scheduleFor, setScheduleFor] = useState<TeacherAccount | null>(null);
  const { getStatusFor } = useTeacherAuth();

  // Apply live overrides from logged-in teachers.
  const members = baseMembers.map((m) => {
    if (m.teacherId) {
      const live = getStatusFor(m.teacherId);
      if (live) return { ...m, status: live as Status };
    }
    return m;
  });

  const filtered = members.filter((m) => {
    const matchesFilter =
      active === "All" ||
      (active === "Teachers" && m.category === "Teachers") ||
      (active === "Science" && m.field === "Science") ||
      (active === "Arts" && m.field === "Arts");
    const matchesQuery =
      !query.trim() ||
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.dept.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      <section className="bg-[var(--hero)] pb-16 pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Find Your Community
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Locate faculty members and classmates in real time across the campus.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card p-2 pl-5 shadow-[var(--shadow-card)]">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or department"
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  active === f
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "border border-border bg-card text-foreground/70 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">No matches. Try a different filter or search term.</p>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => {
              const showLocation = locationVisible(m.status);
              const teacher = m.teacherId
                ? TEACHERS.find((t) => t.id === m.teacherId) ?? null
                : null;
              return (
                <article
                  key={m.name}
                  className="group rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="relative">
                      <div className="grid h-20 w-20 place-items-center rounded-3xl bg-secondary text-xl font-bold text-foreground/70">
                        {m.initials}
                      </div>
                      <span
                        className={`absolute -right-2 -top-2 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-[var(--shadow-card)] ${statusStyles(
                          m.status,
                        )}`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {m.name}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-muted-foreground">{m.dept}</p>
                    </div>
                  </div>

                  {showLocation ? (
                    <>
                      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground/80">{m.room}</span>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <Link
                          to="/map"
                          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-[11px] font-black uppercase tracking-widest text-primary-foreground transition hover:opacity-95"
                        >
                          <Send className="h-3.5 w-3.5" />
                          Navigate
                        </Link>
                        {teacher && (
                          <button
                            onClick={() => setScheduleFor(teacher)}
                            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-[11px] font-black uppercase tracking-widest text-foreground/80 transition hover:text-foreground"
                          >
                            <CalendarDays className="h-3.5 w-3.5" /> Schedule
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/60 px-4 py-4 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Location Private
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {m.status === "Absent"
                          ? `${m.name.split(" ").slice(-1)[0]} is absent today.`
                          : `Available again when ${m.name.split(" ").slice(-1)[0]} is free.`}
                      </p>
                      {teacher && (
                        <button
                          onClick={() => setScheduleFor(teacher)}
                          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[10px] font-black uppercase tracking-widest text-foreground/70 transition hover:text-foreground"
                        >
                          <CalendarDays className="h-3 w-3" /> View Schedule
                        </button>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <ScheduleModal teacher={scheduleFor} onClose={() => setScheduleFor(null)} />
      <SiteFooter />
    </main>
  );
}
