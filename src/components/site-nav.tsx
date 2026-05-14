import { Link } from "@tanstack/react-router";
import { MapPin, User } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground">
        <MapPin className="h-4 w-4" strokeWidth={2.5} />
      </div>
      <span className="text-lg font-bold tracking-tight text-foreground">
        CampusConnect
      </span>
    </Link>
  );
}

export function SiteNav() {
  const links = [
    { label: "Home", to: "/" as const },
    { label: "Directory", to: "/directory" as const },
    { label: "Map", to: "/map" as const },
    { label: "Live Status", to: "/directory" as const },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-[var(--hero)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="relative py-1 text-sm font-medium text-foreground/80 transition hover:text-foreground"
              activeProps={{ className: "relative py-1 text-sm font-semibold text-foreground" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Account"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)]"
        >
          <User className="h-4 w-4 text-foreground/70" />
        </button>
      </div>
    </header>
  );
}
