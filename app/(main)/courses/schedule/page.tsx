import { Page } from "@/components/shared/page-template";
import { WeeklySchedule } from "@/components/page-sections/courses/schedule/weekly-schedule/weekly-schedule";

export default function CourseSchedulePage() {
  return (
    <Page
      title="Class Timetable"
      description="View your weekly class schedule and course times"
    >
      <div className="space-y-6">
        <WeeklySchedule />
      </div>
    </Page>
  );
}
