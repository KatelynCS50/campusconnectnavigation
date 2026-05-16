import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, User } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useTeacherAuth } from "@/lib/teacher-auth";
import { LoginModal } from "./login-modal";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoImg}
        alt="CampusConnect logo"
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl object-contain"
      />
      <span className="text-lg font-bold tracking-tight text-foreground">CampusConnect</span>
    </Link>
  );
}

export function SiteNav() {
  const links = [
    { label: "Home", to: "/" as const },
    { label: "Directory", to: "/directory" as const },
    { label: "Map", to: "/map" as const },
    { label: "Live Status", to: "/live-status" as const },
    { label: "Notices", to: "/notices" as const },
  ];
  const { activeTeacher, accounts } = useTeacherAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
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
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-bold uppercase tracking-widest text-foreground/80 shadow-[var(--shadow-card)] transition hover:text-foreground"
          >
            {activeTeacher ? (
              <>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
                  {activeTeacher.initials}
                </span>
                <span className="hidden sm:inline">Switch</span>
              </>
            ) : accounts.length > 0 ? (
              <>
                <User className="h-3.5 w-3.5" /> Accounts
              </>
            ) : (
              <>
                <LogIn className="h-3.5 w-3.5" /> Teacher Login
              </>
            )}
          </button>
        </div>
      </header>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
