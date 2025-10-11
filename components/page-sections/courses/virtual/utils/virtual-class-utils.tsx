import { Monitor, Users, Video } from "lucide-react";
import { ReactElement } from "react";

/**
 * Get elapsed time since a start time in a human-readable format
 */
export const getElapsedTime = (startTime: string): string => {
  const now = new Date();
  const start = new Date(startTime);
  const diffMs = now.getTime() - start.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 60) {
    return `${diffMins} min${diffMins !== 1 ? "s" : ""} elapsed`;
  }

  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  return `${hours}h ${mins}m elapsed`;
};

/**
 * Get the icon component for a class type
 */
export const getTypeIcon = (type: string): ReactElement => {
  switch (type) {
    case "lecture":
      return <Monitor className="w-4 h-4" />;
    case "workshop":
      return <Users className="w-4 h-4" />;
    case "lab":
      return <Video className="w-4 h-4" />;
    default:
      return <Video className="w-4 h-4" />;
  }
};

/**
 * Get the color classes for a class type badge
 */
export const getTypeColor = (type: string): string => {
  switch (type) {
    case "lecture":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "workshop":
      return "bg-green-100 text-green-800 border-green-200";
    case "lab":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

/**
 * Get the color classes for a status badge
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "ongoing":
      return "bg-green-100 text-green-800 border-green-200";
    case "scheduled":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "completed":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

/**
 * Check if a scheduled class can be joined (within 15 minutes of start time)
 */
export const canJoinClass = (scheduledTime: string, status: string): boolean => {
  if (status === "ongoing") return true;
  if (status !== "scheduled") return false;
  
  const now = new Date();
  const scheduled = new Date(scheduledTime);
  const diffMins = (scheduled.getTime() - now.getTime()) / (1000 * 60);
  return diffMins <= 15 && diffMins >= 0;
};

/**
 * Format date for display
 */
export const formatDisplayDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format time for display
 */
export const formatDisplayTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};