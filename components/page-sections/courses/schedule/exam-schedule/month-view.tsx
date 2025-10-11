import { ExamCard } from "./exam-card";
import {
  ExamEvent,
  createCalendarGrid,
  getExamsForDate,
  isToday,
  DAY_NAMES,
} from "./exam-utils";

interface MonthViewProps {
  currentDate: Date;
  exams: ExamEvent[];
}

export function MonthView({ currentDate, exams }: MonthViewProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = createCalendarGrid(year, month);

  return (
    <div className="flex flex-col">
      {/* Day Headers */}
      <div className="grid grid-cols-7 border-b bg-muted/30">
        {DAY_NAMES.map((day) => (
          <div key={day} className="p-4 text-center border-l first:border-l-0">
            <div className="text-sm font-medium text-muted-foreground">
              {day}
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 auto-rows-min">
        {calendarDays.map((calDay, index) => {
          const dayExams = getExamsForDate(calDay.date, exams);
          const hasExams = dayExams.length > 0;
          const isLastRow = index >= 35; // Last row (week 6)
          const isLastCol = index % 7 === 6; // Last column (Sunday)

          return (
            <div
              key={index}
              className={`relative bg-card p-3${
                index % 7 !== 0 ? " border-l" : ""
              }${!isLastRow ? " border-b" : ""}${
                isLastRow && isLastCol ? " rounded-br-lg" : ""
              }${!calDay.isCurrentMonth ? " bg-muted/20" : ""}`}
              style={{
                minHeight: hasExams ? "140px" : "80px",
              }}
            >
              {/* Day number and indicator */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-medium ${
                    isToday(calDay.date)
                      ? "text-primary"
                      : !calDay.isCurrentMonth
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {calDay.day}
                </span>
                {hasExams && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>

              {/* Today indicator */}
              {isToday(calDay.date) && (
                <div className="absolute top-2 right-2 w-6 h-1 bg-primary rounded-full"></div>
              )}

              {/* Exams for this day */}
              <div className="space-y-1">
                {dayExams.slice(0, 2).map((exam) => (
                  <ExamCard key={exam.id} exam={exam} variant="grid" />
                ))}

                {dayExams.length > 2 && (
                  <div className="text-xs text-muted-foreground pl-2">
                    +{dayExams.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
