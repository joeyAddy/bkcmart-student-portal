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
  Download,
  Eye,
  FileText,
  Video,
  Link,
  Presentation,
  Music,
  Book,
} from "lucide-react";
import { CourseMaterial } from "@/lib/store/api/materials";

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Helper function to format file size
const formatFileSize = (bytes?: number) => {
  if (!bytes) return "-";

  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

// Helper function to get type icon
const getTypeIcon = (type: string) => {
  switch (type) {
    case "PDF":
    case "DOC":
      return FileText;
    case "VIDEO":
      return Video;
    case "LINK":
      return Link;
    case "PRESENTATION":
      return Presentation;
    case "AUDIO":
      return Music;
    case "EBOOK":
      return Book;
    default:
      return FileText;
  }
};

// Helper function to get type color
const getTypeColor = (type: string) => {
  switch (type) {
    case "PDF":
      return "bg-red-100 text-red-700 border-red-200";
    case "DOC":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "VIDEO":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "LINK":
      return "bg-green-100 text-green-700 border-green-200";
    case "PRESENTATION":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "AUDIO":
      return "bg-pink-100 text-pink-700 border-pink-200";
    case "EBOOK":
      return "bg-indigo-100 text-indigo-700 border-indigo-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

// Helper function to get category color
const getCategoryColor = (category: string) => {
  switch (category) {
    case "Textbook":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Lecture Notes":
      return "bg-green-100 text-green-800 border-green-200";
    case "Reading":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Video Lecture":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Supplementary":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "Assignment":
      return "bg-red-100 text-red-800 border-red-200";
    case "Reference":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const materialsColumns: ColumnDef<CourseMaterial>[] = [
  {
    accessorKey: "title",
    header: "Material",
    cell: ({ row }) => {
      const material = row.original;
      const TypeIcon = getTypeIcon(material.type);

      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TypeIcon className="h-4 w-4 text-muted-foreground" />
            <div className="font-medium text-sm">{material.title}</div>
          </div>
          <div className="text-xs text-muted-foreground">
            {material.courseCode} - {material.courseName}
          </div>
          <div className="flex items-center gap-1">
            <Badge
              variant="outline"
              className={`text-xs ${getTypeColor(material.type)}`}
            >
              {material.type}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs ${getCategoryColor(material.category)}`}
            >
              {material.category}
            </Badge>
            {material.isRequired && (
              <Badge variant="destructive" className="text-xs">
                Required
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "uploadDate",
    header: "Date Added",
    cell: ({ row }) => {
      const material = row.original;
      return (
        <div className="text-sm">
          <div>{formatDate(material.uploadDate)}</div>
          <div className="text-xs text-muted-foreground">
            {material.semester} {material.year}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "fileSize",
    header: "Size",
    cell: ({ row }) => {
      const material = row.original;
      return (
        <div className="text-sm">
          <div>{formatFileSize(material.fileSize)}</div>
          <div className="text-xs text-muted-foreground">
            {material.downloadCount} downloads
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "lastAccessed",
    header: "Last Accessed",
    cell: ({ row }) => {
      const material = row.original;
      return (
        <div className="text-sm">
          {material.lastAccessed ? (
            <>
              <div>{formatDate(material.lastAccessed)}</div>
              <div className="text-xs text-muted-foreground">
                Recently viewed
              </div>
            </>
          ) : (
            <div className="text-muted-foreground">Never accessed</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
    cell: ({ row }) => {
      const material = row.original;
      return (
        <div className="text-sm">
          <div>{material.instructor}</div>
          <div className="text-xs text-muted-foreground">
            {material.isPublic ? "Public" : "Private"}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const material = row.original;

      return (
        <TooltipProvider>
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // View material details
                    window.location.href = `/courses/materials/${material.id}`;
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Material Details</p>
              </TooltipContent>
            </Tooltip>

            {material.fileUrl ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Download file
                      window.open(material.fileUrl, "_blank");
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download File</p>
                </TooltipContent>
              </Tooltip>
            ) : material.externalUrl ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Open external link
                      window.open(material.externalUrl, "_blank");
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open External Link</p>
                </TooltipContent>
              </Tooltip>
            ) : null}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Go to course
                    window.location.href = `/courses/${material.courseId}`;
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Course</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    },
  },
];
