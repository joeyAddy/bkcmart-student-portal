"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface MessageProps {
  id: string;
  author: string;
  content: string;
  isHighlighted?: boolean; // For instructors in discussions, or important messages in inbox
  timestamp?: string;
  hasReplies?: boolean;
  replyCount?: number;
  children?: React.ReactNode; // For nested replies
  highlightColor?: "blue" | "green" | "purple"; // Different colors for different contexts
}

export function Message({
  author,
  content,
  isHighlighted = false,
  timestamp,
  hasReplies = false,
  replyCount = 0,
  children,
  highlightColor = "blue",
}: MessageProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  const getHighlightStyles = () => {
    if (!isHighlighted) return "";

    switch (highlightColor) {
      case "blue":
        return "bg-blue-100 text-blue-700";
      case "green":
        return "bg-green-100 text-green-700";
      case "purple":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getMessageStyles = () => {
    if (!isHighlighted)
      return "bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700";

    switch (highlightColor) {
      case "blue":
        return "bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800";
      case "green":
        return "bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800";
      case "purple":
        return "bg-purple-50 border border-purple-200 dark:bg-purple-950 dark:border-purple-800";
      default:
        return "bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800";
    }
  };

  const getAuthorStyles = () => {
    if (!isHighlighted) return "text-gray-900";

    switch (highlightColor) {
      case "blue":
        return "text-blue-700";
      case "green":
        return "text-green-700";
      case "purple":
        return "text-purple-700";
      default:
        return "text-blue-700";
    }
  };

  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className={`text-xs ${getHighlightStyles()}`}>
          {getInitials(author)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-medium text-sm ${getAuthorStyles()}`}>
            {author}
          </span>
          {timestamp && (
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          )}
        </div>

        <div className={`rounded-lg p-3 ${getMessageStyles()}`}>
          <p className="text-sm text-gray-900 dark:text-gray-100">{content}</p>
        </div>

        {hasReplies && (
          <Button
            variant="link"
            className="text-blue-600 p-0 h-auto mt-2 text-sm font-normal"
          >
            🗨️ {replyCount} Replies ↗️
          </Button>
        )}

        {children && <div className="mt-3 space-y-3">{children}</div>}
      </div>
    </div>
  );
}
