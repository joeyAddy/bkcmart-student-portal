import Link from "next/link";
import { CourseActivityCard } from "./course-activity-card";

const upcomingClassesData = [
  {
    title: "Advanced JavaScript Concepts",
    category: "Computer Science",
    instructor: "Dr. Jamie Wilson",
    startTime: "10:00 AM",
    duration: "1.5 hours",
    date: "Today",
    lessons: 24,
    hours: 40,
    rating: 4.9,
    reviews: "12k",
    status: "upcoming" as const,
  },
  {
    title: "Database Design Workshop",
    category: "Computer Science",
    instructor: "Prof. Sarah Chen",
    startTime: "2:00 PM",
    duration: "2 hours",
    date: "Today",
    lessons: 18,
    hours: 32,
    rating: 4.8,
    reviews: "8.5k",
    status: "upcoming" as const,
  },
];

export function UpcomingClasses() {
  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Upcoming Classes</h3>
        <Link
          className="text-sm font-semibold text-primary hover:underline"
          href="/courses/schedule"
        >
          View All Classes
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {upcomingClassesData.map((course, index) => (
          <CourseActivityCard
            key={index}
            title={course.title}
            category={course.category}
            instructor={course.instructor}
            startTime={course.startTime}
            duration={course.duration}
            date={course.date}
            lessons={course.lessons}
            hours={course.hours}
            rating={course.rating}
            reviews={course.reviews}
            status={course.status}
          />
        ))}
      </div>
    </div>
  );
}
