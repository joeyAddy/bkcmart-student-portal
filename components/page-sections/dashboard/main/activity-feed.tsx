import {
  Clock,
  BookOpen,
  FileText,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activityData = [
  {
    id: 1,
    type: "assignment_submitted",
    title: "Submitted JavaScript Fundamentals Assignment",
    course: "Web Development",
    time: "2 hours ago",
    icon: CheckCircle,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 2,
    type: "course_accessed",
    title: "Accessed Database Design Course",
    course: "Computer Science",
    time: "4 hours ago",
    icon: BookOpen,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 3,
    type: "discussion_posted",
    title: "Posted in Data Structures Discussion",
    course: "Computer Science",
    time: "6 hours ago",
    icon: MessageSquare,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 4,
    type: "material_downloaded",
    title: "Downloaded Lecture Notes",
    course: "Mathematics",
    time: "1 day ago",
    icon: FileText,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: 5,
    type: "quiz_completed",
    title: "Completed Midterm Quiz",
    course: "Physics",
    time: "2 days ago",
    icon: CheckCircle,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
];

export function ActivityFeed() {
  return (
    <Card className="h-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activityData.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {/* Activity Icon */}
                <div className={`p-2 rounded-full ${activity.bgColor}`}>
                  <IconComponent className={`w-4 h-4 ${activity.iconColor}`} />
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-sm leading-none">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="default"
                          className="text-xs bg-gray-100"
                        >
                          {activity.course}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
