import { Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DeadlineItem {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: "high" | "medium" | "low";
  status:
    | "pending"
    | "in-progress"
    | "completed"
    | "not-started"
    | "upcoming"
    | "paid"
    | "submitted";
  daysLeft: number;
  amount?: string;
}

interface DeadlineCardProps {
  item: DeadlineItem;
  actionText?: {
    pending?: string;
    completed?: string;
    inProgress?: string;
    default?: string;
  };
}

export function DeadlineCard({
  item,
  actionText = {
    pending: "Take Action",
    completed: "View Details",
    inProgress: "Continue",
    default: "View",
  },
}: DeadlineCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "completed":
      case "paid":
      case "submitted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 3) return "text-red-600 font-semibold";
    if (daysLeft <= 7) return "text-yellow-600 font-medium";
    return "text-green-600 font-medium";
  };

  const getButtonText = (status: string) => {
    switch (status) {
      case "pending":
        return actionText.pending || "Take Action";
      case "completed":
      case "paid":
      case "submitted":
        return actionText.completed || "View Details";
      case "in-progress":
        return actionText.inProgress || "Continue";
      default:
        return actionText.default || "View";
    }
  };

  return (
    <div className="flex-shrink-0 w-72 md:w-auto p-4 border rounded-lg hover:bg-muted/30 transition-colors">
      <div className="space-y-3">
        {/* Header with Status Icon and Priority */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <div className="flex-shrink-0 mt-0.5">
              {getStatusIcon(item.status)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-tight text-foreground">
                {item.title}
              </h4>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`text-xs font-medium flex-shrink-0 ${getPriorityColor(
              item.priority
            )}`}
          >
            {item.priority}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Amount Row (if present) */}
        {item.amount && (
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">
              {item.amount}
            </span>
          </div>
        )}

        {/* Date, Time and Days Left */}
        <div className="space-y-2">
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>Due: {item.dueDate}</span> <span>{item.dueTime}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-medium ${getDaysLeftColor(
                item.daysLeft
              )}`}
            >
              {item.daysLeft} days left
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full h-8 text-xs font-medium"
          >
            {getButtonText(item.status)}
          </Button>
        </div>
      </div>
    </div>
  );
}
