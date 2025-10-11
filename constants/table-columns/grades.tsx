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
import { ExternalLink, BookOpen, FileText, TrendingUp } from "lucide-react";

// Grade types
export interface CourseGrade {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  credits: number;
  currentGrade?: {
    letterGrade: string;
    percentage: number;
    points: number;
    maxPoints: number;
  };
  gradingPeriod: string; // "Fall 2025", "Spring 2025", etc.
  status: "IN_PROGRESS" | "COMPLETED" | "NOT_GRADED" | "PENDING";
  lastUpdated: string;
  assignments: {
    completed: number;
    total: number;
    averageScore?: number;
  };
  examScores?: {
    midterm?: number;
    final?: number;
  };
  attendance?: {
    present: number;
    total: number;
    percentage: number;
  };
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Helper function to get grade color
const getGradeColor = (grade: string, percentage?: number) => {
  if (!percentage) {
    if (grade === "A+" || grade === "A") return "text-green-600";
    if (grade === "A-" || grade === "B+") return "text-green-500";
    if (grade === "B" || grade === "B-") return "text-blue-600";
    if (grade === "C+" || grade === "C") return "text-yellow-600";
    if (grade === "C-" || grade === "D+") return "text-orange-600";
    return "text-red-600";
  }

  if (percentage >= 97) return "text-green-600";
  if (percentage >= 93) return "text-green-500";
  if (percentage >= 90) return "text-green-400";
  if (percentage >= 87) return "text-blue-600";
  if (percentage >= 83) return "text-blue-500";
  if (percentage >= 80) return "text-blue-400";
  if (percentage >= 77) return "text-yellow-600";
  if (percentage >= 73) return "text-yellow-500";
  if (percentage >= 70) return "text-yellow-400";
  if (percentage >= 67) return "text-orange-600";
  if (percentage >= 60) return "text-orange-500";
  return "text-red-600";
};

// Helper function to get status color
const getStatusColor = (status: CourseGrade["status"]) => {
  switch (status) {
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "COMPLETED":
      return "bg-green-100 text-green-800 border-green-200";
    case "NOT_GRADED":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const gradesColumns: ColumnDef<CourseGrade>[] = [
  {
    accessorKey: "courseCode",
    header: "Course",
    cell: ({ row }) => {
      const courseGrade = row.original;
      return (
        <div className="space-y-1">
          <div className="font-mono font-medium text-sm">
            {courseGrade.courseCode}
          </div>
          <div className="font-medium text-sm text-foreground max-w-[200px] truncate">
            {courseGrade.courseName}
          </div>
          <div className="text-xs text-muted-foreground">
            {courseGrade.instructor}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "credits",
    header: "Credits",
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium text-sm">
          {row.getValue("credits")}
        </div>
      );
    },
  },
  {
    accessorKey: "currentGrade",
    header: "Current Grade",
    cell: ({ row }) => {
      const courseGrade = row.original;

      if (!courseGrade.currentGrade) {
        return (
          <div className="text-sm text-muted-foreground text-center">
            <div>Not Available</div>
            <div className="text-xs">No grades yet</div>
          </div>
        );
      }

      const { letterGrade, percentage, points, maxPoints } =
        courseGrade.currentGrade;
      const gradeColor = getGradeColor(letterGrade, percentage);

      return (
        <div className="space-y-1">
          <div className={`font-bold text-lg ${gradeColor}`}>{letterGrade}</div>
          <div className="text-xs text-muted-foreground">
            {percentage.toFixed(1)}% ({points}/{maxPoints})
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "assignments",
    header: "Assignments",
    cell: ({ row }) => {
      const courseGrade = row.original;
      const { completed, total, averageScore } = courseGrade.assignments;
      const progressPercentage = (completed / total) * 100;

      return (
        <div className="space-y-2 w-32">
          <div className="flex items-center justify-between text-xs">
            <span>
              {completed}/{total} completed
            </span>
            {averageScore && (
              <span className="font-medium">{averageScore.toFixed(1)}%</span>
            )}
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">
            {progressPercentage.toFixed(0)}% complete
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "examScores",
    header: "Exam Scores",
    cell: ({ row }) => {
      const courseGrade = row.original;
      const examScores = courseGrade.examScores;

      if (!examScores) {
        return (
          <div className="text-xs text-muted-foreground">No exams yet</div>
        );
      }

      return (
        <div className="space-y-1 text-xs">
          {examScores.midterm && (
            <div className="flex justify-between">
              <span>Midterm:</span>
              <span
                className={`font-medium ${getGradeColor(
                  "",
                  examScores.midterm
                )}`}
              >
                {examScores.midterm}%
              </span>
            </div>
          )}
          {examScores.final && (
            <div className="flex justify-between">
              <span>Final:</span>
              <span
                className={`font-medium ${getGradeColor("", examScores.final)}`}
              >
                {examScores.final}%
              </span>
            </div>
          )}
          {!examScores.midterm && !examScores.final && (
            <div className="text-muted-foreground">Not available</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
    cell: ({ row }) => {
      const courseGrade = row.original;
      const attendance = courseGrade.attendance;

      if (!attendance) {
        return <div className="text-xs text-muted-foreground">Not tracked</div>;
      }

      const attendanceColor =
        attendance.percentage >= 90
          ? "text-green-600"
          : attendance.percentage >= 80
          ? "text-yellow-600"
          : "text-red-600";

      return (
        <div className="space-y-1">
          <div className={`font-medium text-sm ${attendanceColor}`}>
            {attendance.percentage.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">
            {attendance.present}/{attendance.total} classes
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as CourseGrade["status"];
      return (
        <Badge variant="outline" className={`${getStatusColor(status)}`}>
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => {
      const courseGrade = row.original;
      return (
        <div className="text-xs text-muted-foreground">
          {formatDate(courseGrade.lastUpdated)}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const courseGrade = row.original;

      return (
        <TooltipProvider>
          <div className="flex items-center space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Navigate to course details
                    window.location.href = `/courses/${courseGrade.courseId}`;
                  }}
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Course</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Navigate to assignments
                    window.location.href = `/courses/assignments?course=${courseGrade.courseId}`;
                  }}
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Assignments</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Navigate to grade details/breakdown
                    window.location.href = `/academics/grades/course/${courseGrade.courseId}`;
                  }}
                >
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Grade Breakdown</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    },
  },
];
