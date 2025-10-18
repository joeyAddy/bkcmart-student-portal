"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import Image from "next/image";

interface AnnouncementCardProps {
  id: string;
  title: string;
  author: string;
  authorRole?: string;
  date: string;
  viewCount: number;
  content: string;
  image?: string;
  onClick?: () => void;
}

export function AnnouncementCard({
  title,
  author,
  date,
  viewCount,
  content,
  image,
  onClick,
}: AnnouncementCardProps) {
  const formatViewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={onClick}
    >
      <CardContent>
        <div className="flex items-start gap-4">
          {/* Announcement Image */}
          <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header with title and metadata */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-accent-foreground text-xl leading-tight mb-1">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm mb-3">By {author}</p>
              </div>

              {/* Right side metadata */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0 text-gray-400">
                <span className="text-sm">{date}</span>
                <div className="flex items-center gap-1 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>{formatViewCount(viewCount)}</span>
                </div>
              </div>
            </div>

            {/* Content Preview */}
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
              {content}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
