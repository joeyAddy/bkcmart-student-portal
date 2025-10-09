import { FileText } from "lucide-react";
import { DeadlineCategory } from "./deadline-category";

const documentDeadlines = [
  {
    id: 1,
    title: "Transcript Request",
    description: "Submit official transcript request for scholarship",
    dueDate: "Oct 20, 2025",
    dueTime: "5:00 PM",
    priority: "medium" as const,
    status: "pending" as const,
    daysLeft: 13,
  },
  {
    id: 2,
    title: "Financial Aid Forms",
    description: "Complete FAFSA renewal application",
    dueDate: "Nov 30, 2025",
    dueTime: "11:59 PM",
    priority: "high" as const,
    status: "in-progress" as const,
    daysLeft: 54,
  },
  {
    id: 3,
    title: "Recommendation Letter",
    description: "Request recommendation letters for internship",
    dueDate: "Oct 25, 2025",
    dueTime: "5:00 PM",
    priority: "medium" as const,
    status: "not-started" as const,
    daysLeft: 18,
  },
  {
    id: 4,
    title: "Graduation Documents",
    description: "Submit degree audit form for graduation review",
    dueDate: "Dec 5, 2025",
    dueTime: "5:00 PM",
    priority: "low" as const,
    status: "not-started" as const,
    daysLeft: 59,
  },
  {
    id: 5,
    title: "Research Proposal",
    description: "Submit research proposal for thesis committee",
    dueDate: "Nov 10, 2025",
    dueTime: "11:59 PM",
    priority: "high" as const,
    status: "not-started" as const,
    daysLeft: 34,
  },
];

export function DocumentDeadlines() {
  return (
    <DeadlineCategory
      title="Document Deadlines"
      icon={FileText}
      iconColor="text-blue-500"
      items={documentDeadlines}
      actionText={{
        pending: "Submit Now",
        completed: "Download Copy",
        inProgress: "Continue Application",
        default: "Start Application",
      }}
    />
  );
}
