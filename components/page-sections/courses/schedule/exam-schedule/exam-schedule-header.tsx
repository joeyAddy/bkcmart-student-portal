import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ViewType = "month" | "week" | "list";

interface ExamScheduleHeaderProps {
  monthYear: string;
  weekStart: string;
  viewType: ViewType;
  onNavigate: (direction: "prev" | "next") => void;
  onViewTypeChange: (viewType: ViewType) => void;
}

export function ExamScheduleHeader({
  monthYear,
  weekStart,
  viewType,
  onNavigate,
  onViewTypeChange,
}: ExamScheduleHeaderProps) {
  const getViewTitle = () => {
    switch (viewType) {
      case "month":
        return "Month View";
      case "week":
        return "Week View";
      case "list":
        return "List View";
      default:
        return "Month View";
    }
  };

  const getDisplayTitle = () => {
    switch (viewType) {
      case "month":
        return monthYear;
      case "week":
        return `Week of ${weekStart}`;
      case "list":
        return `${monthYear} - Exams`;
      default:
        return monthYear;
    }
  };

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          {getDisplayTitle()}
        </h1>
        <p className="text-sm text-muted-foreground">
          {viewType === "list"
            ? "View all scheduled exams and assessments for the month"
            : "Track your upcoming exams and assessments"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("prev")}
            className="p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("next")}
            className="p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {getViewTitle()}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewTypeChange("month")}>
              Month View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewTypeChange("week")}>
              Week View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewTypeChange("list")}>
              List View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
