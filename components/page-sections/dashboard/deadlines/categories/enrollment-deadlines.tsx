import { UserPlus } from "lucide-react";
import { DeadlineCategory } from "./deadline-category";

const enrollmentDeadlines = [
  {
    id: 1,
    title: "Add/Drop Courses",
    description: "Last day to add or drop courses without penalty",
    dueDate: "Oct 15, 2025",
    dueTime: "11:59 PM",
    priority: "high" as const,
    status: "pending" as const,
    daysLeft: 8,
  },
  {
    id: 2,
    title: "Course Withdrawal",
    description: "Last day to withdraw with 'W' grade",
    dueDate: "Nov 15, 2025",
    dueTime: "5:00 PM",
    priority: "medium" as const,
    status: "upcoming" as const,
    daysLeft: 39,
  },
  {
    id: 3,
    title: "Spring Registration",
    description: "Registration opens for Spring semester",
    dueDate: "Nov 1, 2025",
    dueTime: "8:00 AM",
    priority: "medium" as const,
    status: "upcoming" as const,
    daysLeft: 25,
  },
  {
    id: 4,
    title: "Course Evaluation",
    description: "Submit course evaluation forms",
    dueDate: "Nov 20, 2025",
    dueTime: "11:59 PM",
    priority: "low" as const,
    status: "not-started" as const,
    daysLeft: 44,
  },
  {
    id: 5,
    title: "Graduation Application",
    description: "Apply for Spring graduation ceremony",
    dueDate: "Dec 1, 2025",
    dueTime: "5:00 PM",
    priority: "medium" as const,
    status: "not-started" as const,
    daysLeft: 55,
  },
];

export function EnrollmentDeadlines() {
  return (
    <DeadlineCategory
      title="Enrollment Deadlines"
      icon={UserPlus}
      iconColor="text-purple-500"
      items={enrollmentDeadlines}
      actionText={{
        pending: "Take Action",
        completed: "View Confirmation",
        inProgress: "Continue Process",
        default: "Learn More",
      }}
    />
  );
}
