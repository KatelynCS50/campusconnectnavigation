import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Send, Search } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

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

type Status = "Available" | "In Class" | "Busy";

const members: {
  name: string;
  dept: string;
  room: string;
  status: Status;
  initials: string;
  category: "Teachers" | "Students";
  field: "Science" | "Arts" | "Engineering";
}[] = [
  { name: "Dr. Sarah Jenkins", dept: "Dept. of Science", room: "Science Lab 302", status: "Available", initials: "SJ", category: "Teachers", field: "Science" },
  { name: "Marcus Chen", dept: "Dept. of Arts", room: "Lecture Hall B", status: "In Class", initials: "MC", category: "Students", field: "Arts" },
  { name: "Prof. Elena Rodriguez", dept: "Dept. of Science", room: "Faculty Office 12", status: "Busy", initials: "ER", category: "Teachers", field: "Science" },
  { name: "Jordan Smith", dept: "Dept. of Engineering", room: "Main Library G-4", status: "Available", initials: "JS", category: "Students", field: "Engineering" },
  { name: "Dr. Amara Patel", dept: "Dept. of Arts", room: "Studio 4B", status: "Available", initials: "AP", category: "Teachers", field: "Arts" },
  { name: "Liam O'Connor", dept: "Dept. of Science", room: "Physics Lab 210", status: "In Class", initials: "LO", category: "Students", field: "Science" },
];

const filters = ["All", "Teachers", "Students", "Science", "Arts"] as const;
type Filter = (typeof filters)[number];

function statusStyles(status: Status) {
  switch (status) {
    case "Available":
      return "bg-[var(--emerald)] text-[color:var(--emerald-foreground)]";
    case "In Class":
      return "bg-destructive text-destructive-foreground";
    case "Busy":
      return "bg-[oklch(0.72_0.17_60)] text-[oklch(0.18_0.03_250)]";
  }
}

function DirectoryPage() {
  const [active, setActive] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const filtered = members.filter((m) => {
    const matchesFilter =
      active === "All" ||
      (active === "Teachers" && m.category === "Teachers") ||
      (active === "Students" && m.category === "Students") ||
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
            {filtered.map((m) => (
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

                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground/80">{m.room}</span>
                </div>

                <Link
                  to="/map"
                  className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-95"
                >
                  <Send className="h-4 w-4" />
                  Click to Navigate
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
