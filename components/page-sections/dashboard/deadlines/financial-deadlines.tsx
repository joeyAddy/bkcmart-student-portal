import { DollarSign } from "lucide-react";
import { DeadlineCategory } from "./deadline-category";

const financialDeadlines = [
  {
    id: 1,
    title: "Tuition Payment",
    description: "Fall semester tuition payment",
    amount: "$3,250.00",
    dueDate: "Oct 12, 2025",
    dueTime: "5:00 PM",
    priority: "high" as const,
    status: "pending" as const,
    daysLeft: 5,
  },
  {
    id: 2,
    title: "Student Activity Fee",
    description: "Semester activity and recreation fee",
    amount: "$150.00",
    dueDate: "Oct 15, 2025",
    dueTime: "11:59 PM",
    priority: "medium" as const,
    status: "pending" as const,
    daysLeft: 8,
  },
  {
    id: 3,
    title: "Lab Fee - Chemistry",
    description: "Laboratory equipment and materials fee",
    amount: "$85.00",
    dueDate: "Oct 20, 2025",
    dueTime: "5:00 PM",
    priority: "medium" as const,
    status: "not-started" as const,
    daysLeft: 13,
  },
  {
    id: 4,
    title: "Parking Permit Renewal",
    description: "Annual parking permit renewal",
    amount: "$120.00",
    dueDate: "Oct 25, 2025",
    dueTime: "11:59 PM",
    priority: "low" as const,
    status: "not-started" as const,
    daysLeft: 18,
  },
  {
    id: 5,
    title: "Library Fine Payment",
    description: "Overdue book return fine",
    amount: "$25.00",
    dueDate: "Oct 30, 2025",
    dueTime: "5:00 PM",
    priority: "low" as const,
    status: "not-started" as const,
    daysLeft: 23,
  },
];

export function FinancialDeadlines() {
  return (
    <DeadlineCategory
      title="Financial Deadlines"
      icon={DollarSign}
      iconColor="text-green-500"
      items={financialDeadlines}
      actionText={{
        pending: "Make Payment",
        completed: "View Receipt",
        inProgress: "Continue Payment",
        default: "View Details",
      }}
    />
  );
}
