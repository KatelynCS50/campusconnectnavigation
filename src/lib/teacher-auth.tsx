import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { TEACHERS, findTeacherByUsername, type TeacherAccount } from "./teacher-data";

export type TeacherStatus = "Available" | "In Class" | "Do Not Disturb" | "Absent";

type StoredAccount = { id: string; status: TeacherStatus };
type AuthState = {
  accounts: StoredAccount[]; // accounts saved on device
  activeId: string | null;
};

const STORAGE_KEY = "cc.teacher.auth.v1";

type Ctx = {
  activeTeacher: TeacherAccount | null;
  activeStatus: TeacherStatus | null;
  accounts: { account: TeacherAccount; status: TeacherStatus }[];
  login: (username: string, password: string) => { ok: true } | { ok: false; error: string };
  switchAccount: (id: string) => void;
  logout: () => void;
  removeAccount: (id: string) => void;
  setStatus: (status: TeacherStatus) => void;
  /** Look up status set by a logged-in teacher (overrides defaults). */
  getStatusFor: (teacherId: string) => TeacherStatus | null;
};

const TeacherAuthContext = createContext<Ctx | null>(null);

function loadState(): AuthState {
  if (typeof window === "undefined") return { accounts: [], activeId: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { accounts: [], activeId: null };
    return JSON.parse(raw);
  } catch {
    return { accounts: [], activeId: null };
  }
}

export function TeacherAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ accounts: [], activeId: null });

  useEffect(() => {
    setState(loadState());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const value = useMemo<Ctx>(() => {
    const activeTeacher =
      state.activeId ? TEACHERS.find((t) => t.id === state.activeId) ?? null : null;
    const activeAccount = state.accounts.find((a) => a.id === state.activeId);
    const accounts = state.accounts
      .map((a) => {
        const account = TEACHERS.find((t) => t.id === a.id);
        return account ? { account, status: a.status } : null;
      })
      .filter(Boolean) as { account: TeacherAccount; status: TeacherStatus }[];

    return {
      activeTeacher,
      activeStatus: activeAccount?.status ?? null,
      accounts,
      login: (username, password) => {
        const t = findTeacherByUsername(username);
        if (!t) return { ok: false, error: "Account not found." };
        if (t.password !== password) return { ok: false, error: "Incorrect password." };
        setState((prev) => {
          const exists = prev.accounts.some((a) => a.id === t.id);
          const accs = exists
            ? prev.accounts
            : [...prev.accounts, { id: t.id, status: "Available" as TeacherStatus }];
          return { accounts: accs, activeId: t.id };
        });
        return { ok: true };
      },
      switchAccount: (id) => setState((p) => ({ ...p, activeId: id })),
      logout: () => setState((p) => ({ ...p, activeId: null })),
      removeAccount: (id) =>
        setState((p) => ({
          accounts: p.accounts.filter((a) => a.id !== id),
          activeId: p.activeId === id ? null : p.activeId,
        })),
      setStatus: (status) =>
        setState((p) => ({
          ...p,
          accounts: p.accounts.map((a) => (a.id === p.activeId ? { ...a, status } : a)),
        })),
      getStatusFor: (teacherId) =>
        state.accounts.find((a) => a.id === teacherId)?.status ?? null,
    };
  }, [state]);

  return <TeacherAuthContext.Provider value={value}>{children}</TeacherAuthContext.Provider>;
}

export function useTeacherAuth() {
  const ctx = useContext(TeacherAuthContext);
  if (!ctx) throw new Error("useTeacherAuth must be used within TeacherAuthProvider");
  return ctx;
}
