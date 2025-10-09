"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare,
  Users,
  Eye,
  Pin,
  Lock,
  CheckCircle,
  AlertTriangle,
  Clock,
  MoreVertical,
  MessageCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { DiscussionThread } from "@/lib/store/api/discussions";

// Priority colors mapping
const priorityColors = {
  LOW: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  NORMAL: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  HIGH: "bg-orange-100 text-orange-700 hover:bg-orange-200",
  URGENT: "bg-red-100 text-red-700 hover:bg-red-200",
};

// Priority icons mapping
const priorityIcons = {
  LOW: Clock,
  NORMAL: MessageSquare,
  HIGH: AlertTriangle,
  URGENT: AlertTriangle,
};

export const discussionColumns: ColumnDef<DiscussionThread>[] = [
  {
    accessorKey: "title",
    header: "Discussion",
    cell: ({ row }) => {
      const thread = row.original;
      const PriorityIcon = priorityIcons[thread.priority];

      return (
        <TooltipProvider>
          <div className="flex items-start gap-3 min-w-0">
            {/* Thread Status Icons */}
            <div className="flex flex-col gap-1 mt-1">
              {thread.isPinned && (
                <Tooltip>
                  <TooltipTrigger>
                    <Pin className="h-3 w-3 text-blue-600 fill-current" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pinned thread</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {thread.isLocked && (
                <Tooltip>
                  <TooltipTrigger>
                    <Lock className="h-3 w-3 text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Locked thread</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {thread.isResolved && (
                <Tooltip>
                  <TooltipTrigger>
                    <CheckCircle className="h-3 w-3 text-green-600 fill-current" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Resolved thread</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Thread Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className={`font-medium text-sm ${
                    thread.hasUnreadPosts ? "font-semibold" : ""
                  } truncate`}
                >
                  {thread.title}
                </h3>
                {thread.hasUnreadPosts && (
                  <div className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0" />
                )}
              </div>

              {thread.description && (
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {thread.description}
                </p>
              )}

              {/* Tags */}
              {thread.tags.length > 0 && (
                <div className="flex items-center gap-1 mb-2">
                  {thread.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs px-1.5 py-0 h-5"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {thread.tags.length > 2 && (
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant="outline"
                          className="text-xs px-1.5 py-0 h-5"
                        >
                          +{thread.tags.length - 2}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex flex-col gap-1">
                          {thread.tags.slice(2).map((tag) => (
                            <span key={tag} className="text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              )}

              {/* Author and Course Info */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>by {thread.authorName}</span>
                <span>•</span>
                <Badge variant="secondary" className="text-xs px-1.5 py-0 h-4">
                  {thread.courseCode}
                </Badge>
              </div>
            </div>

            {/* Priority Indicator */}
            <div className="flex-shrink-0">
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    className={`text-xs px-2 py-1 ${
                      priorityColors[thread.priority]
                    }`}
                  >
                    <PriorityIcon className="h-3 w-3 mr-1" />
                    {thread.priority}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Priority: {thread.priority}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "activity",
    header: "Activity",
    cell: ({ row }) => {
      const thread = row.original;

      return (
        <TooltipProvider>
          <div className="flex items-center gap-4 text-xs">
            {/* Post Count */}
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium">{thread.postCount}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{thread.postCount} posts</p>
              </TooltipContent>
            </Tooltip>

            {/* Participants */}
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium">{thread.participantCount}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{thread.participantCount} participants</p>
              </TooltipContent>
            </Tooltip>

            {/* View Count */}
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium">{thread.viewCount}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{thread.viewCount} views</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => {
      const thread = row.original;

      return (
        <TooltipProvider>
          <div className="text-xs">
            {thread.lastPost && (
              <div className="space-y-1">
                {/* Last Post Info */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs">
                      {thread.lastPost.authorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate max-w-24">
                    {thread.lastPost.authorName}
                  </span>
                </div>

                {/* Last Post Preview */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-muted-foreground line-clamp-2 max-w-48">
                      {thread.lastPost.content}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>{thread.lastPost.content}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Time Ago */}
                <p className="text-muted-foreground">
                  {formatDistanceToNow(new Date(thread.lastActivity), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            )}
          </div>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: () => {
      return (
        <TooltipProvider>
          <div className="flex items-center gap-1">
            {/* Quick Reply */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <MessageCircle className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick reply</p>
              </TooltipContent>
            </Tooltip>

            {/* More Options */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More options</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    },
  },
];
