"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";

interface FeaturedAnnouncementProps {
  title: string;
  author: string;
  authorRole?: string;
  date: string;
  viewCount: number;
  content: string;
  image?: string;
  tags: Array<{
    id: string;
    label: string;
    variant?: "default" | "secondary" | "outline";
    color?: string;
  }>;
  onReadFullPage?: () => void;
}

export function FeaturedAnnouncement({
  title,
  author,
  date,
  viewCount,
  content,
  image,
  tags,
  onReadFullPage,
}: FeaturedAnnouncementProps) {
  const formatViewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const getTagStyle = (color?: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "green":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "yellow":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="h-fit sticky top-4 p-0">
      <CardContent>
        {/* Featured Image */}
        {image && (
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 relative mt-6">
            <Image
              src={image}
              alt={title}
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="py-6 space-y-4">
          {/* Title */}
          <h3 className="font-semibold text-2xl text-gray-900 leading-tight">
            {title}
          </h3>

          {/* Author and metadata */}
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">By {author}</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{date}</span>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{formatViewCount(viewCount)}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{content}</p>

            {/* Additional content for featured announcement */}
            <p className="text-gray-700 leading-relaxed">
              Attention students! To support your exam preparation, the library
              will offer extended hours starting September 15th. Join us for
              additional study sessions and access thousands of resources.
              Please bring and collect over 2,000 pounds of food for local food
              banks.
            </p>
          </div>

          {/* Tags */}
          <div className="pt-4">
            <p className="text-sm mb-2 font-medium text-gray-900">Tag</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className={getTagStyle(tag.color)}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Read Full Page Button */}
          <div className="pt-4">
            <Button
              onClick={onReadFullPage}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Read Full Page 📖
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
