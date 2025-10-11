import { Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface DeadlineEvent {
  id: number;
  date: string;
  title: string;
  category: string;
  priority: string;
  time: string;
}

interface DeadlineEventCardProps {
  event: DeadlineEvent;
  variant?: "grid" | "list";
  isToday?: boolean;
}

export function DeadlineEventCard({
  event,
  variant = "grid",
  isToday = false,
}: DeadlineEventCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "#3b82f6"; // blue
      case "financial":
        return "#ef4444"; // red
      case "enrollment":
        return "#10b981"; // green
      case "document":
        return "#8b5cf6"; // purple
      default:
        return "#6b7280"; // gray
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === "high") {
      return <AlertCircle className="w-3 h-3 text-red-500" />;
    }
    return null;
  };

  if (variant === "list") {
    return (
      <div
        className={`p-4 bg-card border shadow-sm ${
          isToday ? "!border-l-destructive bg-destructive/10" : ""
        }`}
        style={{
          borderLeft: `4px solid ${getCategoryColor(event.category)}`,
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getPriorityIcon(event.priority)}
              <h3 className="font-medium text-foreground">{event.title}</h3>
              <Badge
                variant="secondary"
                className="text-xs"
                style={{
                  backgroundColor: `${getCategoryColor(event.category)}15`,
                  color: getCategoryColor(event.category),
                }}
              >
                {event.category}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-2 bg-card border shadow-sm text-foreground text-xs"
      style={{
        borderLeft: `4px solid ${getCategoryColor(event.category)}`,
      }}
    >
      <div className="flex items-center gap-1 mb-1">
        {getPriorityIcon(event.priority)}
        <span className="font-medium truncate text-sm">{event.title}</span>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <Clock className="w-3 h-3" />
        <span>{event.time}</span>
      </div>
      <div className="mt-1">
        <Badge
          variant="secondary"
          className="text-xs"
          style={{
            backgroundColor: `${getCategoryColor(event.category)}15`,
            color: getCategoryColor(event.category),
          }}
        >
          {event.category}
        </Badge>
      </div>
    </div>
  );
}
