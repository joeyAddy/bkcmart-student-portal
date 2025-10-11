import {
  Clock,
  MapPin,
  User,
  BookOpen,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ExamEvent, EXAM_TYPE_COLORS } from "./exam-utils";

interface ExamCardProps {
  exam: ExamEvent;
  variant?: "grid" | "list";
}

export function ExamCard({ exam, variant = "grid" }: ExamCardProps) {
  const examColor = EXAM_TYPE_COLORS[exam.type];
  const examDateTime = new Date(`${exam.date}T${exam.startTime}`);

  if (variant === "list") {
    return (
      <div
        className="p-4 bg-card border shadow-sm rounded-xs"
        style={{
          borderLeft: `4px solid ${examColor}`,
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{exam.title}</h3>
              <Badge
                variant="secondary"
                className="text-xs"
                style={{
                  backgroundColor: `${examColor}15`,
                  color: examColor,
                }}
              >
                {exam.type}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{exam.course}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{exam.instructor}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {exam.startTime} - {exam.endTime}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{exam.location}</span>
              </div>
            </div>
            {exam.materials && (
              <div className="mt-2 flex items-start gap-1 text-sm text-muted-foreground">
                <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{exam.materials.join(", ")}</span>
              </div>
            )}
          </div>
          <div className="text-right text-sm">
            <div className="font-medium text-foreground">
              {examDateTime.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="text-muted-foreground">{exam.duration}</div>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant
  return (
    <div
      className="p-3 bg-card border shadow-sm rounded text-xs"
      style={{
        borderLeft: `4px solid ${examColor}`,
      }}
    >
      <div className="flex items-center gap-1 mb-2">
        {exam.type === "final" && (
          <AlertCircle className="w-3 h-3 text-red-500" />
        )}
        <span className="font-medium truncate text-sm">{exam.title}</span>
      </div>
      <div className="space-y-1 text-muted-foreground">
        <div className="flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          <span className="truncate">{exam.course}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{exam.startTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{exam.location}</span>
        </div>
      </div>
      <div className="mt-2">
        <Badge
          variant="secondary"
          className="text-xs"
          style={{
            backgroundColor: `${examColor}15`,
            color: examColor,
          }}
        >
          {exam.type}
        </Badge>
      </div>
    </div>
  );
}
