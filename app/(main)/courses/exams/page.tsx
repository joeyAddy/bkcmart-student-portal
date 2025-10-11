import { Page } from "@/components/shared/page-template";
import { ExamSchedule } from "@/components/page-sections/courses/schedule/exam-schedule/exam-schedule";

export default function ExamSchedulePage() {
  return (
    <Page
      title="Exam Schedule"
      description="View upcoming exams, quiz dates, and testing information"
    >
      <div className="space-y-6">
        <ExamSchedule />
      </div>
    </Page>
  );
}
