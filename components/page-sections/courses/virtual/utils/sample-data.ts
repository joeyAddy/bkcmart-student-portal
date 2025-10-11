import { VirtualClass, OngoingClass } from "../types";

export const SAMPLE_VIRTUAL_CLASSES: VirtualClass[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    course: "CS 4350 - Software Engineering",
    instructor: "Dr. Sarah Johnson",
    scheduledTime: "2025-10-11T14:00:00Z",
    duration: 90,
    type: "lecture",
    status: "scheduled",
    participants: 28,
    maxParticipants: 30,
    description:
      "Deep dive into advanced React patterns including render props, higher-order components, and hooks patterns.",
  },
  {
    id: "2",
    title: "Database Design Workshop",
    course: "CS 3380 - Database Systems",
    instructor: "Prof. Michael Chen",
    scheduledTime: "2025-10-12T10:00:00Z",
    duration: 120,
    type: "workshop",
    status: "scheduled",
    participants: 22,
    maxParticipants: 25,
    description:
      "Hands-on workshop for designing efficient database schemas and optimization techniques.",
  },
  {
    id: "3",
    title: "Machine Learning Lab Session",
    course: "CS 4385 - Machine Learning",
    instructor: "Dr. Emily Rodriguez",
    scheduledTime: "2025-10-13T16:00:00Z",
    duration: 180,
    type: "lab",
    status: "scheduled",
    participants: 15,
    maxParticipants: 20,
    description:
      "Practical implementation of ML algorithms using Python and TensorFlow.",
  },
];

export const ONGOING_CLASS: OngoingClass = {
  id: "ongoing-1",
  title: "Web Development Fundamentals",
  course: "CS 3340 - Web Development",
  instructor: "Prof. Alex Thompson",
  startedAt: "2025-10-11T13:00:00Z",
  duration: 90,
  type: "lecture",
  participants: 25,
  maxParticipants: 30,
  description:
    "Introduction to modern web development frameworks and best practices.",
};