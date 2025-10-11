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
  Play,
  Download,
  Eye,
  Calendar,
  Clock,
  Users,
  Monitor,
  Video,
  PlayCircle,
} from "lucide-react";
import { RecordedClass } from "@/components/page-sections/courses/virtual-recorded/types";
import {
  formatRecordedDate,
  formatDuration,
  getTypeColor,
  getQualityColor,
  formatViews,
  getTimeAgo,
} from "@/components/page-sections/courses/virtual-recorded/utils/recorded-class-utils";

// Function to create columns with navigation callback
export const createRecordedClassColumns = (
  onNavigateToRecording?: (recordingId: string) => void
): ColumnDef<RecordedClass>[] => [
  {
    accessorKey: "title",
    header: "Recording Details",
    cell: ({ row }) => {
      const recordedClass = row.original;
      return (
        <div className="flex flex-col gap-1 min-w-[200px]">
          <div className="font-medium text-foreground line-clamp-1">
            {recordedClass.title}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {recordedClass.course}
          </div>
          <div className="text-xs text-muted-foreground">
            {recordedClass.instructor}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "recordedDate",
    header: "Recorded",
    cell: ({ row }) => {
      const recordedClass = row.original;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{getTimeAgo(recordedClass.recordedDate)}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatRecordedDate(recordedClass.recordedDate)}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const recordedClass = row.original;
      return (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {formatDuration(recordedClass.duration)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const recordedClass = row.original;
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

      return (
        <Badge className={getTypeColor(recordedClass.type)} variant="outline">
          {getTypeIcon(recordedClass.type)}
          <span className="ml-1 capitalize">{recordedClass.type}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "participants",
    header: "Attendance",
    cell: ({ row }) => {
      const recordedClass = row.original;
      return (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{recordedClass.participants}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => {
      const recordedClass = row.original;
      return (
        <div className="flex items-center gap-2">
          <PlayCircle className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {formatViews(recordedClass.views)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "quality",
    header: "Quality",
    cell: ({ row }) => {
      const recordedClass = row.original;
      return (
        <div className="flex flex-col gap-1">
          <Badge
            className={getQualityColor(recordedClass.quality)}
            variant="outline"
          >
            {recordedClass.quality}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {recordedClass.fileSize}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const recordedClass = row.original;

      const handleView = () => {
        if (onNavigateToRecording) {
          onNavigateToRecording(recordedClass.id);
        }
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
                  onClick={handleView}
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View recording</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View recording details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => window.open(recordedClass.videoUrl, "_blank")}
                >
                  <Play className="h-4 w-4" />
                  <span className="sr-only">Play video</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Play recording</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {recordedClass.downloadUrl && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      window.open(recordedClass.downloadUrl, "_blank")
                    }
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download video</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download recording</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
];

// Export default columns (without navigation)
export const recordedClassColumns = createRecordedClassColumns();
