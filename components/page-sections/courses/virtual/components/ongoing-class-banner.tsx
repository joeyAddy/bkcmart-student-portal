"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Video,
  Users,
  ExternalLink,
  Mic,
  Camera,
} from "lucide-react";
import { OngoingClass } from "../types";
import { getElapsedTime, getTypeIcon, getTypeColor } from "../utils/virtual-class-utils";

interface OngoingClassBannerProps {
  ongoingClass: OngoingClass | null;
}

export function OngoingClassBanner({ ongoingClass }: OngoingClassBannerProps) {
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
}