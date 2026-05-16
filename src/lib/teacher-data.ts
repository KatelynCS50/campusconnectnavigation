export type Period = string;
export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
export const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export type Timetable = Record<Day, Period[]>;

export type TeacherAccount = {
  id: string;
  name: string; // login username
  displayName: string;
  department: string;
  room: string;
  initials: string;
  password: string;
  timetable: Timetable;
};

export const TEACHERS: TeacherAccount[] = [
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    displayName: "Dr. Sarah Mitchell",
    department: "Computer Science",
    room: "Room 302, Block B",
    initials: "SM",
    password: "Navi@cc1",
    timetable: {
      Monday: ["9 Emerald", "Free", "8 Ruby", "10 Pearl", "9 Ruby", "Free", "Free"],
      Tuesday: ["Free", "Free", "9 Ruby", "8 Emerald", "10 Pearl", "10 Pearl", "9 Emerald"],
      Wednesday: ["9 Emerald", "9 Ruby", "10 Pearl", "8 Ruby", "Free", "8 Emerald", "Free"],
      Thursday: ["10 Pearl", "9 Ruby", "9 Ruby", "9 Emerald", "8 Emerald", "Free", "Free"],
      Friday: ["9 Ruby", "Free", "8 Ruby", "Free", "Free", "10 Pearl", "9 Emerald"],
    },
  },
  {
    id: "amara-patel",
    name: "Amara Patel",
    displayName: "Dr. Amara Patel",
    department: "Visual Arts",
    room: "Studio 4B",
    initials: "AP",
    password: "Navi@cc1",
    timetable: {
      Monday: ["5 Pearl", "Free", "6 Ruby", "7 Pearl", "8 Ruby", "Free", "Free"],
      Tuesday: ["Free", "8 Ruby", "6 Ruby", "Free", "7 Pearl", "5 Pearl", "9 Emerald"],
      Wednesday: ["5 Pearl", "8 Ruby", "7 Pearl", "6 Ruby", "Free", "8 Emerald", "Free"],
      Thursday: ["5 Pearl", "7 Pearl", "6 Ruby", "6 Ruby", "8 Ruby", "Free", "Free"],
      Friday: ["6 Ruby", "Free", "8 Ruby", "Free", "Free", "7 Pearl", "5 Pearl"],
    },
  },
];

export function findTeacherByUsername(name: string) {
  const norm = name.trim().toLowerCase();
  return TEACHERS.find((t) => t.name.toLowerCase() === norm);
}

export function validatePassword(pw: string) {
  return (
    pw.length >= 8 &&
    /[0-9]/.test(pw) &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw)
  );
}
