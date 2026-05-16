import { LogOut, Check } from "lucide-react";
import { useTeacherAuth, type TeacherStatus } from "@/lib/teacher-auth";

const OPTIONS: { label: TeacherStatus; tone: string; dot: string }[] = [
  { label: "Available", tone: "bg-[var(--emerald)] text-[color:var(--emerald-foreground)]", dot: "bg-white/80" },
  { label: "In Class", tone: "bg-destructive text-destructive-foreground", dot: "bg-white/80" },
  { label: "Do Not Disturb", tone: "bg-[oklch(0.72_0.17_60)] text-[oklch(0.2_0.03_250)]", dot: "bg-foreground/40" },
  { label: "Absent", tone: "bg-muted-foreground/30 text-foreground/70", dot: "bg-foreground/40" },
];

export function TeacherStatusBar() {
  const { activeTeacher, activeStatus, setStatus, logout } = useTeacherAuth();
  if (!activeTeacher) return null;

  return (
    <div className="border-b border-border/60 bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-background/10 text-xs font-bold">
            {activeTeacher.initials}
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Teacher dashboard</p>
            <p className="text-sm font-semibold">{activeTeacher.displayName}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {OPTIONS.map((o) => {
            const isActive = activeStatus === o.label;
            return (
              <button
                key={o.label}
                onClick={() => setStatus(o.label)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition ${
                  isActive ? o.tone + " shadow-[var(--shadow-glow)]" : "bg-background/10 text-background/80 hover:bg-background/20"
                }`}
              >
                {isActive && <Check className="h-3 w-3" />}
                {o.label}
              </button>
            );
          })}
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-full bg-background/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-background/70 transition hover:bg-background/20"
          >
            <LogOut className="h-3 w-3" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
