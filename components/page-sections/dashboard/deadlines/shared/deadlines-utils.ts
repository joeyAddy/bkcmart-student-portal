import { DeadlineEvent } from "./deadline-event-card";

export interface DeadlineSchedule {
  [key: string]: DeadlineEvent[];
}

// Sample calendar events data
export const SAMPLE_DEADLINE_DATA: DeadlineEvent[] = [
  {
    id: 1,
    date: "2025-10-10",
    title: "React Assignment Due",
    category: "academic",
    priority: "high",
    time: "11:59 PM",
  },
  {
    id: 2,
    date: "2025-10-12",
    title: "Tuition Payment Due",
    category: "financial",
    priority: "high",
    time: "5:00 PM",
  },
  {
    id: 3,
    date: "2025-10-15",
    title: "Add/Drop Deadline",
    category: "enrollment",
    priority: "medium",
    time: "11:59 PM",
  },
  {
    id: 4,
    date: "2025-10-18",
    title: "Midterm Exam",
    category: "academic",
    priority: "high",
    time: "10:00 AM",
  },
  {
    id: 5,
    date: "2025-10-20",
    title: "Transcript Request Deadline",
    category: "document",
    priority: "medium",
    time: "5:00 PM",
  },
];

// Get current week dates for week view
export const getWeekDates = (date: Date): Date[] => {
  const week = [];
  const startDate = new Date(date);
  const day = startDate.getDay();
  const diff = startDate.getDate() - day; // Start from Sunday
  startDate.setDate(diff);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    week.push(day);
  }
  return week;
};

// Get events for a specific date
export const getEventsForDate = (
  deadlines: DeadlineEvent[],
  date: Date
): DeadlineEvent[] => {
  const dateStr = date.toISOString().split("T")[0];
  return deadlines.filter((event) => event.date === dateStr);
};

// Create calendar grid for month view
export const createCalendarGrid = (year: number, month: number) => {
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
};

// Check if a date is today
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

// Month names
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

// Day names
export const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
