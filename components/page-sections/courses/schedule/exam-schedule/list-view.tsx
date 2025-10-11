import { ExamCard } from "./exam-card";
import { ExamEvent, getUpcomingExams } from "./exam-utils";

interface ListViewProps {
  currentDate: Date;
  exams: ExamEvent[];
}

export function ListView({ currentDate, exams }: ListViewProps) {
  // Get exams for the current month only
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startDate = new Date(year, month, 1); // First day of the month
  const endDate = new Date(year, month + 1, 0); // Last day of the month

  const monthExams = getUpcomingExams(startDate, endDate, exams);

  if (monthExams.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <div className="text-lg font-medium">No exams this month</div>
        <div className="text-sm mt-1">
          You have no scheduled exams for this month
        </div>
      </div>
    );
  }

  // Group exams by date
  const examsByDate = monthExams.reduce((acc, exam) => {
    const date = exam.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(exam);
    return acc;
  }, {} as Record<string, ExamEvent[]>);

  return (
    <div className="space-y-6 p-6">
      {Object.entries(examsByDate).map(([date, dateExams]) => {
        const examDate = new Date(date);
        const isToday = examDate.toDateString() === new Date().toDateString();
        const isThisWeek = () => {
          const now = new Date();
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return examDate >= weekStart && examDate <= weekEnd;
        };

        return (
          <div key={date} className="space-y-3">
            <div className="sticky top-0 bg-card py-2">
              <h3
                className={`text-lg font-semibold ${
                  isToday ? "text-primary" : "text-foreground"
                }`}
              >
                {examDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {isToday && (
                  <span className="ml-2 text-sm font-normal text-primary">
                    (Today)
                  </span>
                )}
                {!isToday && isThisWeek() && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    (This week)
                  </span>
                )}
              </h3>
            </div>
            <div className="space-y-3">
              {dateExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} variant="list" />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
