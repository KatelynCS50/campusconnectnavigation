import { Link } from "@tanstack/react-router";
import { Logo } from "./site-nav";

type FooterLink = { label: string; to: "/" | "/directory" | "/map" | "/live-status" | "/notices" | "/privacy" | "/terms" };

function FooterCol({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              to={i.to}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const navigation: FooterLink[] = [
    { label: "Find Teacher", to: "/directory" },
    { label: "Campus Map", to: "/map" },
    { label: "Live Status", to: "/live-status" },
  ];
  const support: FooterLink[] = [
    { label: "Help Centre", to: "/map" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ];

  return (
    <footer className="border-t border-border bg-[var(--hero)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2">
        <div className="max-w-md">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Bridging the gap between academia and student life through intelligent navigation.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <FooterCol title="Navigation" items={navigation} />
          <FooterCol title="Support" items={support} />
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
          <p>Crafted for modern campuses.</p>
        </div>
      </div>
    </footer>
  );
}
