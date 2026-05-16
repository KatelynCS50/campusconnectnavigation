import { X } from "lucide-react";
import { DAYS, type TeacherAccount } from "@/lib/teacher-data";

export function ScheduleModal({
  teacher,
  onClose,
}: {
  teacher: TeacherAccount | null;
  onClose: () => void;
}) {
  if (!teacher) return null;
  const periods = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="border-b border-border bg-[var(--hero)] px-7 py-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Weekly timetable
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
            {teacher.displayName}
          </h2>
          <p className="text-sm text-muted-foreground">{teacher.department}</p>
        </div>

        <div className="max-h-[60vh] overflow-auto p-2 md:p-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-border bg-secondary/60 px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Period
                </th>
                {DAYS.map((d) => (
                  <th
                    key={d}
                    className="border border-border bg-secondary/60 px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((p, idx) => (
                <tr key={p}>
                  <td className="border border-border bg-card px-3 py-2 text-sm font-bold text-foreground">
                    {p}
                  </td>
                  {DAYS.map((d) => {
                    const cell = teacher.timetable[d][idx];
                    const isFree = cell === "Free";
                    return (
                      <td
                        key={d}
                        className={`border border-border px-3 py-2 text-sm font-medium ${
                          isFree
                            ? "bg-secondary/40 text-muted-foreground"
                            : "bg-card text-foreground"
                        }`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
