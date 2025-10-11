export interface VirtualClass {
  id: string;
  title: string;
  course: string;
  instructor: string;
  scheduledTime: string;
  duration: number;
  type: "lecture" | "workshop" | "lab";
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  participants: number;
  maxParticipants: number;
  description: string;
}

export interface OngoingClass {
  id: string;
  title: string;
  course: string;
  instructor: string;
  startedAt: string;
  duration: number;
  type: string;
  participants: number;
  maxParticipants: number;
  description: string;
}