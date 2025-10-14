"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export type CatalogCourse = {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  credits: number;
  level: "undergraduate" | "graduate";
  status: "active" | "inactive";
  currentEnrollment: number;
  maxCapacity: number;
  department: string;
};

export const catalogCoursesColumns: ColumnDef<CatalogCourse>[] = [
  {
    accessorKey: "courseCode",
    header: "Course Code",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("courseCode")}</div>
    ),
  },
  {
    accessorKey: "courseName",
    header: "Course Name",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("courseName")}
      </div>
    ),
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
  },
  {
    accessorKey: "credits",
    header: "Credits",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("credits")}</div>
    ),
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = row.getValue("level") as string;
      return (
        <Badge variant={level === "graduate" ? "default" : "secondary"}>
          {level === "undergraduate" ? "Undergrad" : "Graduate"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "currentEnrollment",
    header: "Enrollment",
    cell: ({ row }) => {
      const current = row.getValue("currentEnrollment") as number;
      const max = row.original.maxCapacity;
      return (
        <div className="text-center">
          {current}/{max}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      );
    },
  },
];
