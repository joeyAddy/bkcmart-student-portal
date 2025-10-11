"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ReplyMessageProps {
  author: string;
  content: string;
  isInstructor?: boolean;
  timestamp?: string;
}

export function ReplyMessage({
  author,
  content,
  isInstructor = false,
  timestamp,
}: ReplyMessageProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  return (
    <div className="flex gap-3">
      <Avatar className="h-7 w-7 flex-shrink-0">
        <AvatarFallback
          className={`text-xs ${
            isInstructor ? "bg-blue-100 text-blue-700" : ""
          }`}
        >
          {getInitials(author)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`font-medium text-sm ${
              isInstructor ? "text-blue-700" : "text-gray-900"
            }`}
          >
            {author}
          </span>
          {timestamp && (
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          )}
        </div>

        <div
          className={`rounded-lg p-3 ${
            isInstructor
              ? "bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800"
              : "bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          }`}
        >
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
}
