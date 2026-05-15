import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | CampusConnect" },
      {
        name: "description",
        content:
          "How CampusConnect protects student and faculty data while powering real-time campus navigation.",
      },
      { property: "og:title", content: "Privacy Policy | CampusConnect" },
      {
        property: "og:description",
        content:
          "Learn how CampusConnect handles IoT data, profiles, and live availability with privacy-first design.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
            Legal · Privacy
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
          Privacy Policy
        </h1>
        <p className="mt-6 text-base text-slate-600 md:text-lg">
          CampusConnect is committed to protecting the privacy of students and faculty while
          providing intelligent navigation services across the campus.
        </p>

        <Section title="1. Data We Collect">
          <p>
            <strong>User Profiles.</strong> We collect names, departments, and professional photos
            for the &ldquo;Find Your Community&rdquo; directory.
          </p>
          <p>
            <strong>Real-Time Location.</strong> We use IoT sensor data to determine faculty
            availability — Available, In Class, In Meeting, or Busy.
          </p>
          <p>
            <strong>Live Metrics.</strong> We track occupancy status for resources like the library
            and labs to display them as &ldquo;OPEN&rdquo; or &ldquo;CLOSED&rdquo;.
          </p>
        </Section>

        <Section title="2. Privacy Protections">
          <p>
            <strong>Teacher privacy.</strong> When faculty are marked as &ldquo;Busy&rdquo; or
            &ldquo;In Meeting&rdquo;, their specific room location and navigation paths are hidden
            from the public directory to ensure focus time is respected.
          </p>
          <p>
            <strong>Student privacy.</strong> While students can use the platform, they are not
            listed in the public searchable directory.
          </p>
        </Section>

        <Section title="3. Data Usage">
          <p>
            Data is used solely for campus navigation, resource management, and academic
            announcements. It is never sold to third parties.
          </p>
        </Section>

        <Section title="4. Contact">
          <p>
            Questions about this policy? Reach the CampusConnect data steward via the Student
            Affairs office.
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
