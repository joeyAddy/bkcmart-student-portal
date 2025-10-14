"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Clock, Users, BookOpen } from "lucide-react";
import { CatalogCourse } from "@/lib/store/api/catalog";

export const catalogCoursesColumns: ColumnDef<CatalogCourse>[] = [
  {
    accessorKey: "courseCode",
    header: "Course Code",
    cell: ({ row }) => {
      return (
        <div className="font-mono font-medium text-sm">
          {row.getValue("courseCode")}
        </div>
      );
    },
  },
  {
    accessorKey: "courseName",
    header: "Course Name",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="max-w-xs">
          <div className="font-medium text-sm truncate">
            {row.getValue("courseName")}
          </div>
          <div className="text-xs text-muted-foreground">
            {course.department}
          </div>
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
        <Badge variant="outline" className="text-xs">
          {row.getValue("credits")} credits
        </Badge>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = row.getValue("level") as string;
      return (
        <Badge
          variant={level === "graduate" ? "default" : "secondary"}
          className="text-xs"
        >
          {level === "undergraduate" ? "Undergrad" : "Graduate"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "active" ? "default" : "destructive"}
          className="text-xs"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "currentEnrollment",
    header: "Enrollment",
    cell: ({ row }) => {
      const course = row.original;
      const percentage = (course.currentEnrollment / course.maxCapacity) * 100;
      return (
        <div className="flex items-center space-x-2">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs">
            {course.currentEnrollment}/{course.maxCapacity}
          </span>
          {percentage >= 90 && (
            <Badge variant="destructive" className="text-xs">
              Full
            </Badge>
          )}
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            // You can add view details functionality here
            console.log("View details for", course.courseCode);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
      );
    },
  },
];
