import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/symposium")({
  head: () => ({
    meta: [
      { title: "Annual Science Symposium 2026 | CampusConnect" },
      {
        name: "description",
        content:
          "Innovating for Tomorrow: Subsystem Integration & Smart Infrastructure. July 6, 2026 at Main Campus Auditorium.",
      },
      { property: "og:title", content: "Annual Science Symposium 2026" },
      {
        property: "og:description",
        content: "Smart Campus Ecosystems, IoT, and Environmental Sustainability — July 6, 2026.",
      },
    ],
  }),
  component: SymposiumPage,
});

const schedule = [
  { time: "09:00 AM – 10:00 AM", session: "Keynote Address: The Future of Smart Spaces", location: "Main Auditorium" },
  { time: "10:30 AM – 01:00 PM", session: "Project Presentations & Live Peer Evaluations", location: "The Quadrangle" },
  { time: "01:00 PM – 02:00 PM", session: "Networking Luncheon & Green Canopy Walk", location: "Innovation Park Grounds" },
  { time: "02:15 PM – 04:30 PM", session: "Panel Discussion: Privacy-First AI Systems", location: "2nd Floor Exhibition Hall" },
  { time: "04:30 PM – 05:00 PM", session: "Valedictory & Awards Ceremony", location: "Main Auditorium" },
];

const tracks = [
  { t: "Smart Infrastructure & IoT", d: "Demonstrations of smart resource management networks, including live tracking systems like CampusConnect." },
  { t: "Environmental Technology", d: "Eco-restoration, lake preservation, and green campus design." },
  { t: "Robotics & Automations", d: "Comparative task performances, modern automation protocols, and systemic laws of robotics." },
  { t: "Biochemical Innovations", d: "Advanced laboratory insights into redox mechanics and crystal-water interactions." },
];

function SymposiumPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      <section className="bg-[var(--hero)] pb-14 pt-12 md:pt-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/notices"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Notices
          </Link>
          <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-primary">
            Annual Science Symposium 2026
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Innovating for Tomorrow: Subsystem Integration & Smart Infrastructure
          </h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <Pill icon={<Calendar className="h-3.5 w-3.5" />} label="July 6, 2026" />
            <Pill icon={<MapPin className="h-3.5 w-3.5" />} label="Main Campus Auditorium & Quadrangle" />
            <Pill icon={<Users className="h-3.5 w-3.5" />} label="Dept. of Science · MCC MRF Innovation Park" />
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-14 text-foreground">
        <h2 className="text-2xl font-bold tracking-tight">Event Overview</h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          The Annual Science Symposium is our premier academic exhibition, bringing together the
          bright minds of schools and universities to present groundbreaking research. This year, the
          symposium spotlights Smart Campus Ecosystems, IoT integrations, and Environmental
          Sustainability.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Students, researchers, and tech enthusiasts are invited to explore a series of high-level
          interactive installations, technical project displays, and live demonstrations of smart
          software applications.
        </p>

        <h3 className="mt-12 text-xl font-bold tracking-tight">Key Tracks & Presentation Topics</h3>
        <ul className="mt-5 space-y-4">
          {tracks.map((t) => (
            <li key={t.t} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-bold text-foreground">{t.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.d}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-xl font-bold tracking-tight">Symposium Schedule</h3>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Session</th>
                <th className="px-4 py-3 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s) => (
                <tr key={s.time} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold text-foreground">{s.time}</td>
                  <td className="px-4 py-3 text-foreground/80">{s.session}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-12 text-xl font-bold tracking-tight">Attendee Guidelines</h3>
        <ul className="mt-4 space-y-3 text-sm text-foreground/80">
          <li>
            <strong>Entry Access:</strong> Open to all registered institutional badges, visitors, and
            guest evaluators.
          </li>
          <li>
            <strong>Evaluation Mode:</strong> Projects will be assessed on scalability, UI/UX
            refinement, unique value proposition, and practical alignment with real-world
            institutional demands.
          </li>
          <li>
            <strong>Digital Navigation:</strong> Attendees are encouraged to use the CampusConnect
            Kiosk app for real-time venue adjustments, faculty availability, and directional mapping
            during the day.
          </li>
        </ul>
      </article>

      <SiteFooter />
    </main>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground/80 shadow-[var(--shadow-card)]">
      {icon}
      {label}
    </span>
  );
}
