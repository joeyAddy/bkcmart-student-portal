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
import { 
  ExternalLink, 
  Calendar, 
  Clock, 
  Users, 
  Video,
  Monitor,
  Eye,
  Bell
} from "lucide-react";

export interface VirtualClass {
  id: string;
  title: string;
  course: string;
  instructor: string;
  scheduledTime: string;
  duration: number;
  type: "lecture" | "workshop" | "lab";
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  participants: number;
  maxParticipants: number;
  description: string;
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

// Helper function to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Helper function to format duration
const formatDuration = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Helper function to get time until class
const getTimeUntilClass = (scheduledTime: string, status: string) => {
  if (status === "completed" || status === "cancelled") return "-";
  if (status === "ongoing") return "In progress";

  const now = new Date();
  const scheduled = new Date(scheduledTime);
  const diffTime = scheduled.getTime() - now.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMins = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  if (diffTime < 0) return "Started";
  if (diffDays > 0) return `${diffDays}d ${diffHours}h`;
  if (diffHours > 0) return `${diffHours}h ${diffMins}m`;
  if (diffMins > 0) return `${diffMins} min`;
  return "Starting now";
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "ongoing":
      return "bg-green-100 text-green-800 border-green-200";
    case "completed":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Helper function to get type color
const getTypeColor = (type: string) => {
  switch (type) {
    case "lecture":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "workshop":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "lab":
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Helper function to get type icon
const getTypeIcon = (type: string) => {
  switch (type) {
    case "lecture":
      return <Monitor className="w-3 h-3" />;
    case "workshop":
      return <Users className="w-3 h-3" />;
    case "lab":
      return <Video className="w-3 h-3" />;
    default:
      return <Video className="w-3 h-3" />;
  }
};

export const virtualClassColumns: ColumnDef<VirtualClass>[] = [
  {
    accessorKey: "title",
    header: "Class Details",
    cell: ({ row }) => {
      const virtualClass = row.original;
      return (
        <div className="flex flex-col gap-1 min-w-[200px]">
          <div className="font-medium text-foreground line-clamp-1">
            {virtualClass.title}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {virtualClass.course}
          </div>
          <div className="text-xs text-muted-foreground">
            {virtualClass.instructor}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "scheduledTime",
    header: "Date & Time",
    cell: ({ row }) => {
      const virtualClass = row.original;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span>{formatDate(virtualClass.scheduledTime)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatTime(virtualClass.scheduledTime)}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as number;
      return (
        <div className="text-sm font-medium">
          {formatDuration(duration)}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge className={getTypeColor(type)} variant="outline">
          {getTypeIcon(type)}
          <span className="ml-1 capitalize">{type}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "participants",
    header: "Participants",
    cell: ({ row }) => {
      const virtualClass = row.original;
      const participationRate = (virtualClass.participants / virtualClass.maxParticipants) * 100;
      return (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">
            {virtualClass.participants}/{virtualClass.maxParticipants}
          </span>
          {participationRate >= 90 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary" className="text-xs">
                    Full
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Class is nearly full</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const virtualClass = row.original;
      const timeUntil = getTimeUntilClass(virtualClass.scheduledTime, virtualClass.status);
      
      return (
        <div className="flex flex-col gap-1">
          <Badge className={getStatusColor(virtualClass.status)} variant="outline">
            {virtualClass.status === "ongoing" && (
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
            )}
            <span className="capitalize">{virtualClass.status}</span>
          </Badge>
          {timeUntil !== "-" && (
            <div className="text-xs text-muted-foreground">
              {timeUntil}
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const virtualClass = row.original;
      const isJoinable = virtualClass.status === "scheduled" || virtualClass.status === "ongoing";
      const canJoin = () => {
        if (virtualClass.status === "ongoing") return true;
        const now = new Date();
        const scheduled = new Date(virtualClass.scheduledTime);
        const diffMins = (scheduled.getTime() - now.getTime()) / (1000 * 60);
        return diffMins <= 15 && diffMins >= 0; // Can join 15 minutes before
      };

      return (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View class details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {isJoinable && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={canJoin() ? "default" : "outline"}
                    size="sm"
                    disabled={!canJoin()}
                    className="gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {virtualClass.status === "ongoing" ? "Join" : "Join"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {canJoin() 
                      ? "Join virtual class" 
                      : "Available 15 minutes before start time"
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {virtualClass.status === "scheduled" && !canJoin() && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Set reminder</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set reminder for this class</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
];