import { Monitor, Users, Video } from "lucide-react";
import { ReactElement } from "react";

/**
 * Format recorded date for display
 */
export const formatRecordedDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format duration in minutes to hours and minutes
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
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
 * Get the color classes for video quality badge
 */
export const getQualityColor = (quality: string): string => {
  switch (quality) {
    case "4K":
      return "bg-green-100 text-green-800 border-green-200";
    case "FHD":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "HD":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

/**
 * Format views count for display
 */
export const formatViews = (views: number): string => {
  if (views < 1000) {
    return views.toString();
  }

  if (views < 1000000) {
    return `${(views / 1000).toFixed(1)}K`;
  }

  return `${(views / 1000000).toFixed(1)}M`;
};

/**
 * Calculate time ago from recorded date
 */
export const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const recorded = new Date(dateString);
  const diffMs = now.getTime() - recorded.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};
