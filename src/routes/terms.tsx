import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | CampusConnect" },
      {
        name: "description",
        content:
          "Rules for using CampusConnect's navigation, directory, and live status tools.",
      },
      { property: "og:title", content: "Terms of Service | CampusConnect" },
      {
        property: "og:description",
        content:
          "Acceptance, permitted use, conduct, and disclaimers for the CampusConnect platform.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Legal · Terms
          </span>
        </div>
      </div>

      <article
        className="mx-auto max-w-3xl px-6 py-16 leading-relaxed"
        style={{ fontFamily: '"Google Sans", "Product Sans", system-ui, sans-serif' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Effective {new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-base text-slate-600 md:text-lg">
          By using CampusConnect, you agree to abide by your school&rsquo;s digital conduct
          policies and to the terms below.
        </p>

        <Section title="1. Permitted Use">
          <p>
            <strong>Navigation.</strong> Use the 3D isometric map and the &ldquo;Current Path&rdquo;
            HUD to find classrooms and facilities.
          </p>
          <p>
            <strong>Directory.</strong> Use &ldquo;Find Your Community&rdquo; to locate faculty for
            academic purposes only.
          </p>
        </Section>

        <Section title="2. User Conduct">
          <p>
            You may not use live status data to harass or interrupt faculty members, especially
            when they are marked as &ldquo;In Class&rdquo; or &ldquo;In Meeting&rdquo;.
          </p>
          <p>
            Follow the &ldquo;Current Path&rdquo; instructions safely while moving through campus
            grounds.
          </p>
        </Section>

        <Section title="3. Platform Disclaimer">
          <p>
            <strong>Data accuracy.</strong> While CampusConnect uses IoT sensors for live updates,
            slight delays may occur in &ldquo;OPEN/CLOSED&rdquo; resource statuses.
          </p>
          <p>
            <strong>Service changes.</strong> We may update campus maps and notice boards as school
            requirements change.
          </p>
        </Section>

        <Section title="4. Limitation of Liability">
          <p>
            CampusConnect is a navigation aid and is not responsible for missed classes or schedule
            conflicts resulting from user error.
          </p>
        </Section>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] text-slate-700">{children}</div>
    </section>
  );
}
