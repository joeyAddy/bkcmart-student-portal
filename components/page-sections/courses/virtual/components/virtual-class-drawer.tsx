"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Video,
  Users,
  Clock,
  Calendar,
  ExternalLink,
  Monitor,
  X,
} from "lucide-react";
import { VirtualClass } from "../types";
import {
  getStatusColor,
  canJoinClass,
  formatDisplayDate,
  formatDisplayTime,
} from "../utils/virtual-class-utils";

interface VirtualClassDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClass: VirtualClass | null;
}

export function VirtualClassDrawer({
  isOpen,
  onOpenChange,
  selectedClass,
}: VirtualClassDrawerProps) {
  return (
    <Drawer direction="right" open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full max-w-md">
        <DrawerHeader className="border-b">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DrawerTitle className="text-lg font-semibold">
                {selectedClass?.title}
              </DrawerTitle>
              <DrawerDescription className="text-sm">
                {selectedClass?.course}
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {selectedClass && (
            <div className="space-y-6">
              {/* Class Status */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Status
                </h3>
                <div className="flex items-center gap-2">
                  <Badge
                    className={getStatusColor(selectedClass.status)}
                    variant="outline"
                  >
                    {selectedClass.status === "ongoing" && (
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                    )}
                    <span className="capitalize">{selectedClass.status}</span>
                  </Badge>
                  <Badge
                    className={
                      selectedClass.type === "lecture"
                        ? "bg-purple-100 text-purple-800 border-purple-200"
                        : selectedClass.type === "workshop"
                        ? "bg-orange-100 text-orange-800 border-orange-200"
                        : "bg-cyan-100 text-cyan-800 border-cyan-200"
                    }
                    variant="outline"
                  >
                    {selectedClass.type === "lecture" && (
                      <Monitor className="w-3 h-3 mr-1" />
                    )}
                    {selectedClass.type === "workshop" && (
                      <Users className="w-3 h-3 mr-1" />
                    )}
                    {selectedClass.type === "lab" && (
                      <Video className="w-3 h-3 mr-1" />
                    )}
                    <span className="capitalize">{selectedClass.type}</span>
                  </Badge>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Instructor
                </h3>
                <p className="text-sm">{selectedClass.instructor}</p>
              </div>

              {/* Schedule Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Schedule
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{formatDisplayDate(selectedClass.scheduledTime)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {formatDisplayTime(selectedClass.scheduledTime)} (
                      {selectedClass.duration} minutes)
                    </span>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Participants
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {selectedClass.participants} /{" "}
                    {selectedClass.maxParticipants} enrolled
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        (selectedClass.participants /
                          selectedClass.maxParticipants) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Description
                </h3>
                <p className="text-sm leading-relaxed">
                  {selectedClass.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t">
                {selectedClass.status === "ongoing" && (
                  <Button className="w-full gap-2" size="lg">
                    <Video className="w-4 h-4" />
                    Join Live Session
                  </Button>
                )}

                {selectedClass.status === "scheduled" && (
                  <>
                    {canJoinClass(
                      selectedClass.scheduledTime,
                      selectedClass.status
                    ) ? (
                      <Button className="w-full gap-2" size="lg">
                        <Video className="w-4 h-4" />
                        Join Early (Session Starting Soon)
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        size="lg"
                        disabled
                      >
                        <Clock className="w-4 h-4" />
                        Session Not Started
                      </Button>
                    )}
                  </>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Add to Calendar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Course Page
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}