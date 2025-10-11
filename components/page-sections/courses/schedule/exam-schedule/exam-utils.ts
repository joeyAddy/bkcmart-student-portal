export interface ExamEvent {
  id: number;
  title: string;
  course: string;
  instructor: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: "midterm" | "final" | "quiz" | "practical";
  duration: string;
  materials?: string[];
  notes?: string;
}

export const SAMPLE_EXAM_DATA: ExamEvent[] = [
  {
    id: 1,
    title: "Web Development Midterm",
    course: "CS 3340",
    instructor: "Dr. Johnson",
    date: "2025-10-15",
    startTime: "09:00",
    endTime: "10:30",
    location: "Room 301",
    type: "midterm",
    duration: "90 minutes",
    materials: ["Calculator allowed", "1 page notes"],
  },
  {
    id: 2,
    title: "Database Systems Quiz",
    course: "CS 3380",
    instructor: "Prof. Smith",
    date: "2025-10-16",
    startTime: "14:00",
    endTime: "15:00",
    location: "Room 205",
    type: "quiz",
    duration: "60 minutes",
  },
  {
    id: 3,
    title: "Data Structures Final",
    course: "CS 2340",
    instructor: "Dr. Brown",
    date: "2025-11-20",
    startTime: "10:00",
    endTime: "12:00",
    location: "Room 101",
    type: "final",
    duration: "120 minutes",
    materials: ["No materials allowed"],
  },
  {
    id: 4,
    title: "Software Engineering Practical",
    course: "CS 4350",
    instructor: "Prof. Davis",
    date: "2025-10-18",
    startTime: "13:00",
    endTime: "15:00",
    location: "Lab 402",
    type: "practical",
    duration: "120 minutes",
    materials: ["Laptop required", "IDE pre-installed"],
  },
  {
    id: 5,
    title: "Computer Networks Quiz",
    course: "CS 4380",
    instructor: "Dr. Wilson",
    date: "2025-10-22",
    startTime: "11:00",
    endTime: "12:00",
    location: "Room 303",
    type: "quiz",
    duration: "60 minutes",
  },
];

export const EXAM_TYPE_COLORS = {
  midterm: "#3b82f6", // blue
  final: "#ef4444", // red
  quiz: "#10b981", // green
  practical: "#8b5cf6", // purple
} as const;

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Get week dates starting from Sunday
export function getWeekDates(date: Date): Date[] {
  const week = [];
  const startDate = new Date(date);
  const day = startDate.getDay();
  const diff = startDate.getDate() - day;
  startDate.setDate(diff);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    week.push(day);
  }
  return week;
}

// Create calendar grid for month view
export function createCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: { day: number; isCurrentMonth: boolean; date: Date }[] =
    [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, daysInPrevMonth - i),
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(year, month, day),
    });
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(year, month + 1, day),
    });
  }

  return calendarDays;
}

// Get exams for a specific date
export function getExamsForDate(date: Date, exams: ExamEvent[]): ExamEvent[] {
  const dateStr = date.toISOString().split("T")[0];
  return exams.filter((exam) => exam.date === dateStr);
}

// Check if date is today
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

// Get upcoming exams in date range
export function getUpcomingExams(
  startDate: Date,
  endDate: Date,
  exams: ExamEvent[]
): ExamEvent[] {
  return exams
    .filter((exam) => {
      const examDate = new Date(exam.date);
      return examDate >= startDate && examDate <= endDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date + "T" + a.startTime);
      const dateB = new Date(b.date + "T" + b.startTime);
      return dateA.getTime() - dateB.getTime();
    });
}
