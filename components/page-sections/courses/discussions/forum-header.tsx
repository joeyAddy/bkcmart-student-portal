"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface ForumHeaderProps {
  forumTitle: string;
  courseTitle: string;
  startDate: string;
  endDate: string;
}

export function ForumHeader({
  forumTitle,
  courseTitle,
  startDate,
  endDate,
}: ForumHeaderProps) {
  return (
    <CardHeader className="p-3 border-b">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg">{forumTitle}</CardTitle>
          <p className="text-sm text-muted-foreground">{courseTitle}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{startDate}</span>
          <span>—</span>
          <Calendar className="h-4 w-4" />
          <span>{endDate}</span>
        </div>
      </div>
    </CardHeader>
  );
}
