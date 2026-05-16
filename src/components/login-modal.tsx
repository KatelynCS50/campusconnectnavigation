import { useEffect, useState } from "react";
import { X, Eye, EyeOff, UserPlus, LogOut, Check } from "lucide-react";
import { useTeacherAuth } from "@/lib/teacher-auth";
import { validatePassword } from "@/lib/teacher-data";

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login, accounts, switchAccount, removeAccount, activeTeacher } = useTeacherAuth();
  const [mode, setMode] = useState<"accounts" | "form">(accounts.length ? "accounts" : "form");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setMode(accounts.length ? "accounts" : "form");
      setUsername("");
      setPassword("");
      setError(null);
    }
  }, [open, accounts.length]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validatePassword(password)) {
      setError("Password must be 8+ chars with upper, lower, number & symbol.");
      return;
    }
    const result = login(username, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-xl font-extrabold tracking-tight text-foreground">Teacher Portal</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to control your live availability and edit your info.
        </p>

        {mode === "accounts" && accounts.length > 0 ? (
          <>
            <ul className="mt-6 space-y-2">
              {accounts.map(({ account, status }) => (
                <li
                  key={account.id}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-3"
                >
                  <button
                    onClick={() => {
                      switchAccount(account.id);
                      onClose();
                    }}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-card text-sm font-bold text-foreground/70">
                      {account.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{account.displayName}</p>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {account.department} · {status}
                      </p>
                    </div>
                    {activeTeacher?.id === account.id && (
                      <Check className="h-4 w-4 text-[color:var(--emerald-foreground)]" />
                    )}
                  </button>
                  <button
                    aria-label={`Remove ${account.displayName}`}
                    onClick={() => removeAccount(account.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-card hover:text-destructive"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setMode("form")}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border px-4 py-3 text-xs font-bold uppercase tracking-widest text-foreground/70 transition hover:text-foreground"
            >
              <UserPlus className="h-4 w-4" /> Add another account
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Username
              </span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Sarah Mitchell"
                className="mt-2 w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition focus:border-primary"
                required
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Password
              </span>
              <div className="mt-2 flex items-center rounded-2xl border border-border bg-secondary/40 pr-2 focus-within:border-primary">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Navi@cc1"
                  className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-card"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-[10px] text-muted-foreground">
                Must be 8+ chars with uppercase, lowercase, number & symbol.
              </p>
            </label>

            {error && (
              <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-primary px-5 py-3.5 text-xs font-black uppercase tracking-widest text-primary-foreground transition hover:opacity-95"
            >
              Sign In
            </button>

            {accounts.length > 0 && (
              <button
                type="button"
                onClick={() => setMode("accounts")}
                className="block w-full text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                ← Back to accounts
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
