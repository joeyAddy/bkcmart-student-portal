import { BookOpen } from "lucide-react";
import { DeadlineCategory } from "./deadline-category";

const academicDeadlines = [
  {
    id: 1,
    title: "React Components Assignment",
    description: "Web Development",
    dueDate: "Oct 10, 2025",
    dueTime: "11:59 PM",
    priority: "high" as const,
    status: "pending" as const,
    daysLeft: 3,
  },
  {
    id: 2,
    title: "Database Design Project",
    description: "Database Systems",
    dueDate: "Oct 15, 2025",
    dueTime: "5:00 PM",
    priority: "medium" as const,
    status: "in-progress" as const,
    daysLeft: 8,
  },
  {
    id: 3,
    title: "Midterm Exam",
    description: "Data Structures",
    dueDate: "Oct 18, 2025",
    dueTime: "10:00 AM",
    priority: "high" as const,
    status: "upcoming" as const,
    daysLeft: 11,
  },
  {
    id: 4,
    title: "Research Paper Draft",
    description: "Computer Science",
    dueDate: "Oct 22, 2025",
    dueTime: "11:59 PM",
    priority: "medium" as const,
    status: "not-started" as const,
    daysLeft: 15,
  },
  {
    id: 5,
    title: "Algorithm Analysis Quiz",
    description: "Data Structures",
    dueDate: "Oct 25, 2025",
    dueTime: "2:00 PM",
    priority: "low" as const,
    status: "not-started" as const,
    daysLeft: 18,
  },
];

export function AcademicDeadlines() {
  return (
    <DeadlineCategory
      title="Academic Deadlines"
      icon={BookOpen}
      iconColor="text-blue-500"
      items={academicDeadlines}
      actionText={{
        pending: "Work on Assignment",
        completed: "View Results",
        inProgress: "Continue Work",
        default: "View Assignment",
      }}
    />
  );
}
