"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Video,
  Users,
  Clock,
  Calendar,
  ExternalLink,
  Mic,
  Camera,
  Monitor,
} from "lucide-react";
import { DataTable as GenericDataTable } from "@/components/shared/tables/data-table";
import {
  virtualClassColumns,
  type VirtualClass,
} from "@/constants/table-columns/virtual-classes";

// Sample data for virtual classes
const SAMPLE_VIRTUAL_CLASSES: VirtualClass[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    course: "CS 4350 - Software Engineering",
    instructor: "Dr. Sarah Johnson",
    scheduledTime: "2025-10-11T14:00:00Z",
    duration: 90,
    type: "lecture",
    status: "scheduled",
    participants: 28,
    maxParticipants: 30,
    description:
      "Deep dive into advanced React patterns including render props, higher-order components, and hooks patterns.",
  },
  {
    id: "2",
    title: "Database Design Workshop",
    course: "CS 3380 - Database Systems",
    instructor: "Prof. Michael Chen",
    scheduledTime: "2025-10-12T10:00:00Z",
    duration: 120,
    type: "workshop",
    status: "scheduled",
    participants: 22,
    maxParticipants: 25,
    description:
      "Hands-on workshop for designing efficient database schemas and optimization techniques.",
  },
  {
    id: "3",
    title: "Machine Learning Lab Session",
    course: "CS 4385 - Machine Learning",
    instructor: "Dr. Emily Rodriguez",
    scheduledTime: "2025-10-13T16:00:00Z",
    duration: 180,
    type: "lab",
    status: "scheduled",
    participants: 15,
    maxParticipants: 20,
    description:
      "Practical implementation of ML algorithms using Python and TensorFlow.",
  },
];

// Sample ongoing class
const ONGOING_CLASS = {
  id: "ongoing-1",
  title: "Web Development Fundamentals",
  course: "CS 3340 - Web Development",
  instructor: "Prof. Alex Thompson",
  startedAt: "2025-10-11T13:00:00Z",
  duration: 90,
  type: "lecture",
  participants: 25,
  maxParticipants: 30,
  description:
    "Introduction to modern web development frameworks and best practices.",
};

export function AllVirtualClassesSection() {
  const [classes] = useState<VirtualClass[]>(SAMPLE_VIRTUAL_CLASSES);
  const [ongoingClass] = useState(ONGOING_CLASS);

  const getElapsedTime = (startTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = now.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} elapsed`;
    }

    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m elapsed`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lecture":
        return <Monitor className="w-4 h-4" />;
      case "workshop":
        return <Users className="w-4 h-4" />;
      case "lab":
        return <Video className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "workshop":
        return "bg-green-100 text-green-800 border-green-200";
      case "lab":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Ongoing Class Banner Component
  const OngoingClassBanner = () => {
    if (!ongoingClass) return null;

    return (
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Video className="w-6 h-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-primary">
                  Class in Progress
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {getElapsedTime(ongoingClass.startedAt)} •{" "}
                  {ongoingClass.duration} min total
                </p>
              </div>
            </div>
            <Button size="lg" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Join Now
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-foreground mb-1">
                {ongoingClass.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {ongoingClass.course}
              </p>
              <p className="text-sm text-muted-foreground">
                {ongoingClass.description}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>
                  {ongoingClass.participants}/{ongoingClass.maxParticipants}{" "}
                  participants
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Instructor:</span>
                <span>{ongoingClass.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getTypeColor(ongoingClass.type)}>
                  {getTypeIcon(ongoingClass.type)}
                  <span className="ml-1 capitalize">{ongoingClass.type}</span>
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick action buttons */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
            <Button variant="outline" size="sm" className="gap-2">
              <Mic className="w-4 h-4" />
              Mute
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Camera className="w-4 h-4" />
              Video
            </Button>
            <div className="ml-auto text-xs text-muted-foreground">
              Live Session Active
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Ongoing Class Banner */}
      <OngoingClassBanner />

      {/* Upcoming Classes Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Virtual Classes
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Your scheduled virtual class sessions
              </p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Clock className="w-3 h-3" />
              {classes.length} scheduled
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <GenericDataTable
            columns={virtualClassColumns}
            data={classes}
            enableRowSelection={false}
            enableDragAndDrop={false}
            enableColumnFilters={true}
            enablePagination={true}
            enableColumnVisibility={true}
            getRowId={(row) => row.id}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
