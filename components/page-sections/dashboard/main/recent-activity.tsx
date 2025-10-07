import { CourseActivityCard } from "./course-activity-card";

const recentActivityData = [
  {
    title: "Full Stack Development",
    category: "Computer Science",
    instructor: "Dr. Jamie Wilson",
    lastActivity: "2 hours ago",
    progress: 75,
    lessons: 24,
    hours: 40,
    rating: 4.9,
    reviews: "12k",
    status: "in-progress" as const,
  },
  {
    title: "Data Structures & Algorithms",
    category: "Computer Science",
    instructor: "Prof. Sarah Chen",
    lastActivity: "1 day ago",
    progress: 100,
    lessons: 18,
    hours: 32,
    rating: 4.8,
    reviews: "8.5k",
    status: "completed" as const,
  },
];

export function RecentActivity() {
  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Course Taken</h3>
        <button className="text-sm text-primary hover:underline">
          View All Courses
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {recentActivityData.map((course, index) => (
          <CourseActivityCard
            key={index}
            title={course.title}
            category={course.category}
            instructor={course.instructor}
            lastActivity={course.lastActivity}
            progress={course.progress}
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
