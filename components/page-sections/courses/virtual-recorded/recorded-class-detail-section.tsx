"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Download,
  Share,
  BookmarkPlus,
  Clock,
  Calendar,
  Users,
  Eye,
  Video,
  ChevronLeft,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { RecordedClass } from "./types";
import { SAMPLE_RECORDED_CLASSES } from "./utils/sample-data";
import {
  formatRecordedDate,
  formatDuration,
  getTypeColor,
  getQualityColor,
  formatViews,
  getTimeAgo,
  getTypeIcon,
} from "./utils/recorded-class-utils";

interface RecordedClassDetailSectionProps {
  classId: string;
}

export function RecordedClassDetailSection({ classId }: RecordedClassDetailSectionProps) {
  const [recordedClass, setRecordedClass] = useState<RecordedClass | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate API call - replace with actual API call
    const foundClass = SAMPLE_RECORDED_CLASSES.find(cls => cls.id === classId);
    setRecordedClass(foundClass || null);
    setIsLoading(false);
  }, [classId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Loading recording...</p>
        </div>
      </div>
    );
  }

  if (!recordedClass) {
    return (
      <div className="text-center py-12">
        <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Recording Not Found</h3>
        <p className="text-muted-foreground mb-4">
          The requested recording could not be found.
        </p>
        <Button onClick={() => router.push('/courses/virtual/recorded')}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Recordings
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.push('/courses/virtual/recorded')}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Recordings
        </Button>
      </div>

      {/* Video Player Section */}
      <Card>
        <CardContent className="p-0">
          {/* Video Placeholder - Replace with actual video player */}
          <div className="relative aspect-video bg-black rounded-t-lg flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
              <p className="text-lg font-medium">Video Player</p>
              <p className="text-sm opacity-80">Click to play recording</p>
            </div>
            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center">
              <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                <Play className="w-6 h-6 mr-2" />
                Play Recording
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Class Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Description */}
          <Card>
            <CardHeader>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getTypeColor(recordedClass.type)} variant="outline">
                    {getTypeIcon(recordedClass.type)}
                    <span className="ml-1 capitalize">{recordedClass.type}</span>
                  </Badge>
                  <Badge className={getQualityColor(recordedClass.quality)} variant="outline">
                    {recordedClass.quality}
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{recordedClass.title}</CardTitle>
                <p className="text-lg text-muted-foreground">{recordedClass.course}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {recordedClass.description}
              </p>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {recordedClass.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2">
                  <Play className="w-4 h-4" />
                  Watch Recording
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download ({recordedClass.fileSize})
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" className="gap-2">
                  <BookmarkPlus className="w-4 h-4" />
                  Bookmark
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recording Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Recording Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Instructor:</span>
                <span>{recordedClass.instructor}</span>
              </div>

              <Separator />

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Recorded:</span>
                <span>{getTimeAgo(recordedClass.recordedDate)}</span>
              </div>

              <div className="text-xs text-muted-foreground">
                {formatRecordedDate(recordedClass.recordedDate)}
              </div>

              <Separator />

              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Duration:</span>
                <span>{formatDuration(recordedClass.duration)}</span>
              </div>

              <Separator />

              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Attendance:</span>
                <span>{recordedClass.participants} students</span>
              </div>

              <Separator />

              <div className="flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Views:</span>
                <span>{formatViews(recordedClass.views)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Related Content - Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Related Recordings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Other recordings from this course will appear here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}