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
import { ExternalLink, BookOpen, Calendar } from "lucide-react";
import { StudentCourse } from "@/lib/store/api/courses";

export const coursesColumns: ColumnDef<StudentCourse>[] = [
  {
    accessorKey: "code",
    header: "Course Code",
    cell: ({ row }) => {
      return (
        <div className="font-mono font-medium text-sm">
          {row.getValue("code")}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Course Name",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="max-w-xs">
          <div className="font-medium text-sm truncate">
            {row.getValue("name")}
          </div>
          <div className="text-xs text-muted-foreground">{course.category}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("instructor")}</div>;
    },
  },
  {
    accessorKey: "credits",
    header: "Credits",
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("credits")}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as StudentCourse["status"];
      const getVariant = (status: StudentCourse["status"]) => {
        switch (status) {
          case "IN_PROGRESS":
            return "default";
          case "ENROLLED":
            return "secondary";
          case "COMPLETED":
            return "outline";
          case "DROPPED":
            return "destructive";
          default:
            return "secondary";
        }
      };
      return (
        <Badge variant={getVariant(status)}>{status.replace("_", " ")}</Badge>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number;
      const course = row.original;
      return (
        <div className="w-full max-w-[120px]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>{progress}%</span>
            {course.grade && (
              <Badge variant="outline" className="text-xs py-0 px-1">
                {course.grade}
              </Badge>
            )}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      const schedule = row.getValue("schedule") as StudentCourse["schedule"];
      return (
        <div className="text-xs">
          <div className="font-medium">{schedule.days.join(", ")}</div>
          <div className="text-muted-foreground">{schedule.time}</div>
          <div className="text-muted-foreground">{schedule.location}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "nextAssignment",
    header: "Next Assignment",
    cell: ({ row }) => {
      const assignment = row.getValue(
        "nextAssignment"
      ) as StudentCourse["nextAssignment"];
      if (!assignment) {
        return <div className="text-xs text-muted-foreground">None</div>;
      }
      return (
        <div className="text-xs">
          <div className="font-medium truncate max-w-[150px]">
            {assignment.title}
          </div>
          <div className="text-muted-foreground">Due: {assignment.dueDate}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "semester",
    header: "Term",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="text-xs">
          <div>{course.semester}</div>
          <div className="text-muted-foreground">{course.year}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <TooltipProvider>
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Navigate to course details
                    window.location.href = `/courses/${course.id}`;
                  }}
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Course Details</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Navigate to course schedule
                    window.location.href = `/courses/${course.id}/schedule`;
                  }}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Schedule</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Open course portal/LMS
                    window.open(`/courses/${course.id}/portal`, "_blank");
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Course Portal</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    },
  },
];
