import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeadlineCard } from "../shared/deadline-card";

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

interface DeadlineCategoryProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  items: DeadlineItem[];
  actionText?: {
    pending?: string;
    completed?: string;
    inProgress?: string;
    default?: string;
  };
}

export function DeadlineCategory({
  title,
  icon: Icon,
  iconColor,
  items,
  actionText = {
    pending: "Take Action",
    completed: "View Details",
    inProgress: "Continue",
    default: "View",
  },
}: DeadlineCategoryProps) {
  const displayItems = items.slice(0, 5); // Show only 5 closest deadlines

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Horizontal scrolling container for mobile, grid for larger screens */}
        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0">
          {displayItems.map((item) => (
            <DeadlineCard key={item.id} item={item} actionText={actionText} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No upcoming deadlines</p>
          </div>
        )}

        {items.length > 5 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Showing 5 of {items.length} deadlines
            </p>
            <Button variant="ghost" size="sm" className="mt-2 text-xs">
              View All {title}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
