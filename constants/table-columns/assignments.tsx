"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, FileText, Eye, Upload, Download } from "lucide-react";
import { StudentAssignment } from "@/lib/store/api/assignments";

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Helper function to format time remaining
const formatTimeRemaining = (dueDate: string, status: string) => {
  if (status === "SUBMITTED" || status === "GRADED") return "-";

  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "1 day left";
  return `${diffDays} days left`;
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "SUBMITTED":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "GRADED":
      return "bg-green-100 text-green-800 border-green-200";
    case "OVERDUE":
      return "bg-red-100 text-red-800 border-red-200";
    case "DRAFT":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Helper function to get priority color
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-700 border-red-200";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "LOW":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export const assignmentColumns: ColumnDef<StudentAssignment>[] = [
  {
    accessorKey: "title",
    header: "Assignment",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <div className="space-y-1">
          <div className="font-medium text-sm">{assignment.title}</div>
          <div className="text-xs text-muted-foreground">
            {assignment.courseCode} - {assignment.courseName}
          </div>
          <div className="flex items-center gap-1">
            <Badge
              variant="outline"
              className={`text-xs ${getPriorityColor(assignment.priority)}`}
            >
              {assignment.priority}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {assignment.category}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const assignment = row.original;
      const isOverdue = assignment.status === "OVERDUE";
      const timeRemaining = formatTimeRemaining(
        assignment.dueDate,
        assignment.status
      );

      return (
        <div className="text-sm">
          <div className={isOverdue ? "text-red-600 font-medium" : ""}>
            {formatDate(assignment.dueDate)}
          </div>
          <div
            className={`text-xs ${
              isOverdue ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {timeRemaining}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <Badge
          variant="outline"
          className={`${getStatusColor(assignment.status)}`}
        >
          {assignment.status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <div className="space-y-1 w-24">
          <Progress value={assignment.progress} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">
            {assignment.progress}%
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => {
      const assignment = row.original;

      if (!assignment.grade) {
        return (
          <div className="text-sm text-muted-foreground">
            {assignment.status === "PENDING" || assignment.status === "DRAFT"
              ? "Not submitted"
              : assignment.status === "SUBMITTED"
              ? "Pending"
              : "-"}
          </div>
        );
      }

      const percentage =
        (assignment.grade.score / assignment.grade.maxScore) * 100;
      const gradeColor =
        percentage >= 90
          ? "text-green-600"
          : percentage >= 80
          ? "text-blue-600"
          : percentage >= 70
          ? "text-yellow-600"
          : "text-red-600";

      return (
        <div className="text-sm">
          <div className={`font-medium ${gradeColor}`}>
            {assignment.grade.letterGrade}
          </div>
          <div className="text-xs text-muted-foreground">
            {assignment.grade.score}/{assignment.grade.maxScore}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <div className="text-sm">
          <div>{assignment.instructor}</div>
          <div className="text-xs text-muted-foreground">
            {assignment.estimatedTime}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const assignment = row.original;

      return (
        <TooltipProvider>
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Navigate to assignment details
                    window.location.href = `/courses/assignments/${assignment.id}`;
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Assignment Details</p>
              </TooltipContent>
            </Tooltip>

            {assignment.status === "PENDING" ||
            assignment.status === "DRAFT" ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Navigate to submission page
                      window.location.href = `/courses/assignments/${assignment.id}/submit`;
                    }}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Submit Assignment</p>
                </TooltipContent>
              </Tooltip>
            ) : assignment.submission ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // View submission
                      window.location.href = `/courses/assignments/${assignment.id}/submission`;
                    }}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Submission</p>
                </TooltipContent>
              </Tooltip>
            ) : null}

            {assignment.grade?.feedback && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // View feedback
                      window.location.href = `/courses/assignments/${assignment.id}/feedback`;
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Feedback</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Open course page
                    window.location.href = `/courses/${assignment.courseId}`;
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Course</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    },
  },
];
