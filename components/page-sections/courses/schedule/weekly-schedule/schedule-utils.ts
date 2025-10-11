import { ScheduleEvent } from "./event-card";

export interface DaySchedule {
  [key: string]: ScheduleEvent[];
}

// Get current week dates
export const getWeekDates = (date: Date): Date[] => {
  const week = [];
  const startDate = new Date(date);
  const day = startDate.getDay();
  const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  startDate.setDate(diff);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    week.push(day);
  }
  return week;
};

// Get event for specific time slot
export const getEventForTimeSlot = (
  scheduleData: DaySchedule,
  dayName: string,
  timeSlot: string
): ScheduleEvent | undefined => {
  const dayEvents = scheduleData[dayName] || [];
  const slotHour = parseInt(timeSlot.split(" ")[0]);
  const slotPeriod = timeSlot.split(" ")[1];

  return dayEvents.find((event) => {
    const eventHour = parseInt(event.time.split(":")[0]);
    const eventPeriod = eventHour >= 12 ? "PM" : "AM";
    const adjustedEventHour =
      eventHour > 12 ? eventHour - 12 : eventHour === 0 ? 12 : eventHour;

    return adjustedEventHour === slotHour && eventPeriod === slotPeriod;
  });
};

// Calculate event height based on duration
export const getEventHeight = (event: ScheduleEvent): number => {
  const startHour = parseInt(event.time.split(":")[0]);
  const startMinute = parseInt(event.time.split(":")[1]);
  const endHour = parseInt(event.endTime.split(":")[0]);
  const endMinute = parseInt(event.endTime.split(":")[1]);

  const duration = endHour * 60 + endMinute - (startHour * 60 + startMinute);
  return Math.max(duration / 60, 1); // At least 1 hour height
};

// Time slots constants
export const TIME_SLOTS = [
  "07 AM",
  "08 AM",
  "09 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "01 PM",
  "02 PM",
  "03 PM",
];

export const DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const DAY_FULL_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Sample schedule data
export const SAMPLE_SCHEDULE_DATA: DaySchedule = {
  Monday: [
    {
      id: "1",
      title: "Computer Science Lecture",
      time: "10:00",
      endTime: "11:00",
      color: "#10b981", // green
      course: "CS 101",
      location: "Room A201",
      instructor: "Dr. Smith",
    },
  ],
  Tuesday: [
    {
      id: "2",
      title: "Mathematics",
      time: "09:00",
      endTime: "10:00",
      color: "#f59e0b", // orange
      course: "MATH 201",
      location: "Room B105",
      instructor: "Prof. Johnson",
    },
  ],
  Wednesday: [
    {
      id: "3",
      title: "Database Systems",
      time: "08:00",
      endTime: "09:00",
      color: "#06b6d4", // cyan
      course: "CS 301",
      location: "Lab C302",
      instructor: "Dr. Wilson",
    },
    {
      id: "4",
      title: "Physics Lab",
      time: "14:00",
      endTime: "16:00",
      color: "#8b5cf6", // purple
      course: "PHY 201",
      location: "Physics Lab",
      instructor: "Dr. Brown",
    },
  ],
  Thursday: [
    {
      id: "5",
      title: "Software Engineering",
      time: "10:00",
      endTime: "11:00",
      color: "#10b981", // green
      course: "CS 401",
      location: "Room A301",
      instructor: "Prof. Davis",
    },
    {
      id: "6",
      title: "Statistics",
      time: "13:00",
      endTime: "14:00",
      color: "#ef4444", // red
      course: "STAT 101",
      location: "Room B201",
      instructor: "Dr. Miller",
    },
  ],
  Friday: [
    {
      id: "7",
      title: "Web Development",
      time: "10:00",
      endTime: "11:00",
      color: "#10b981", // green
      course: "CS 302",
      location: "Computer Lab",
      instructor: "Mr. Anderson",
    },
  ],
  Saturday: [],
  Sunday: [],
};
