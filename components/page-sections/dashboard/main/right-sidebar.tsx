"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { AssignmentCard } from "./assignment-card";
import { ProgressChart } from "./progress-chart";

const assignmentsData = [
  {
    id: "research-project-1",
    title: "Do The Research",
    dueText: "Due in 3 days",
    department: "research" as const,
  },
  {
    id: "php-dev-assignment",
    title: "PHP Development",
    dueText: "Due in 2 days",
    department: "computer-science" as const,
  },
  {
    id: "graphic-design-task",
    title: "Graphic Design",
    dueText: "Due in 5 days",
    department: "design" as const,
  },
];

export function RightSidebar() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 9, 7) // October 7, 2025 (month is 0-indexed)
  );

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-card rounded-xl border p-4">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          className="rounded-lg w-full"
        />
      </div>

      {/* Assignments */}
      <div className="bg-card rounded-xl border p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Assignments</h4>
          <Button
            variant="link"
            size="sm"
            asChild
            className="h-auto font-semibold p-0"
          >
            <Link href="/assignments">See All</Link>
          </Button>
        </div>

        <div className="space-y-3">
          {assignmentsData.map((assignment) => (
            <AssignmentCard key={assignment.id} {...assignment} />
          ))}
        </div>
      </div>

      {/* My Progress */}
      <ProgressChart />
    </div>
  );
}
