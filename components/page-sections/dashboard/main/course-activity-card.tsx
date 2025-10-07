import { BookOpen, Clock, Star, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface CourseActivityCardProps {
  title: string;
  category: string;
  instructor: string;
  lastActivity: string;
  progress: number;
  lessons: number;
  hours: number;
  rating: number;
  reviews: string;
  status: "completed" | "in-progress" | "not-started";
}

export function CourseActivityCard({
  title,
  category,
  instructor,
  lastActivity,
  progress,
  lessons,
  hours,
  rating,
  reviews,
  status,
}: CourseActivityCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20";
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20";
      case "not-started":
        return "bg-muted hover:bg-muted/80";
      default:
        return "bg-muted hover:bg-muted/80";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "Continue";
      case "not-started":
        return "Start Course";
      default:
        return "View Details";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow py-0">
      <CardContent className="p-3 space-y-2">
        {/* Course Image/Illustration */}
        <div className="h-44 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center relative overflow-hidden">
          <div className="text-center z-10">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-3">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Course Preview
            </div>
          </div>
        </div>

        <div className="pt-2 space-y-4">
          {/* Category Badge */}
          <Badge
            variant="outline"
            className="text-muted-foreground border-muted-foreground/30"
          >
            {category}
          </Badge>

          {/* Course Title */}
          <h4 className="font-semibold text-lg leading-tight">{title}</h4>

          {/* Instructor */}
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Instructor: {instructor}
            </span>
          </div>

          {/* Last Activity */}
          <div className="text-sm text-muted-foreground">
            Last activity: {lastActivity}
          </div>

          {/* Progress Bar (only for in-progress courses) */}
          {status === "in-progress" ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-primary">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          ) : (
            <Separator className="mt-3 mb-4" />
          )}

          {/* Course Details */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>{lessons} Lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              <span>{hours} Hours</span>
            </div>
          </div>

          {/* Rating and Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{rating}</span>
              <span className="text-sm text-muted-foreground">({reviews})</span>
            </div>
            <Button variant="outline" size="sm" className={getStatusColor()}>
              {getStatusText()}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
