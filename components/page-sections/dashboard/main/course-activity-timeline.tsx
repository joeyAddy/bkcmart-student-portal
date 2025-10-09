"use client";

import { TrendingUp, Play, BookOpen, Award, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Timeline, TimelineItem } from "@/components/shared/timeline";

const timelineData = [
  {
    id: 1,
    course: "Advanced JavaScript",
    activity: "Completed Module 5: Async Programming",
    time: "2 hours ago",
    progress: 75,
    type: "progress",
    icon: TrendingUp,
    iconColor: "text-green-500",
  },
  {
    id: 2,
    course: "Database Design",
    activity: "Watched Lecture: Normalization",
    time: "5 hours ago",
    progress: 60,
    type: "video",
    icon: Play,
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    course: "Data Structures",
    activity: "Started Assignment: Binary Trees",
    time: "1 day ago",
    progress: 40,
    type: "assignment",
    icon: BookOpen,
    iconColor: "text-purple-500",
  },
  {
    id: 4,
    course: "Web Development",
    activity: "Earned Certificate: React Basics",
    time: "2 days ago",
    progress: 100,
    type: "achievement",
    icon: Award,
    iconColor: "text-yellow-500",
  },
];

export function CourseActivityTimeline() {
  const timelineItems: TimelineItem[] = timelineData.map((item) => ({
    id: item.id,
    icon: item.icon,
    iconColor: item.iconColor,
    content: (
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs bg-gray-100">
              {item.course}
            </Badge>
            <span className="text-xs text-muted-foreground">{item.time}</span>
          </div>
          <p className="font-medium text-sm">{item.activity}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              Course Progress
            </span>
            <span className="text-xs font-medium">{item.progress}%</span>
          </div>
          <Progress value={item.progress} className="h-2" />
        </div>
      </div>
    ),
  }));

  return (
    <Timeline
      title="Course Activity Timeline"
      titleIcon={Calendar}
      items={timelineItems}
      spacing="normal"
      showViewAll={true}
      viewAllText="View Full Timeline"
    />
  );
}
