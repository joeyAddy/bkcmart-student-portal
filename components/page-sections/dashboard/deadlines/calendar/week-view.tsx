import {
  DeadlineEventCard,
  DeadlineEvent,
} from "../shared/deadline-event-card";
import {
  getWeekDates,
  getEventsForDate,
  isToday,
} from "../shared/deadlines-utils";

interface WeekViewProps {
  currentDate: Date;
  deadlines: DeadlineEvent[];
}

export function WeekView({ currentDate, deadlines }: WeekViewProps) {
  const weekDates = getWeekDates(currentDate);
  const weekDayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="flex flex-col">
      {/* Day Headers */}
      <div className="grid grid-cols-7 border-b bg-muted/30">
        {weekDayNames.map((day, index) => {
          const date = weekDates[index];
          const isTodayDate = isToday(date);

          return (
            <div
              key={day}
              className="p-4 text-center border-l first:border-l-0"
            >
              <div className="text-sm font-medium text-muted-foreground">
                {day}
              </div>
              <div
                className={`text-2xl font-semibold mt-1 ${
                  isTodayDate ? "text-primary" : "text-foreground"
                }`}
              >
                {date.getDate()}
              </div>
              {isTodayDate && (
                <div className="w-8 h-1 bg-primary rounded-full mx-auto mt-1"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Week Calendar Grid */}
      <div className="grid grid-cols-7 auto-rows-min">
        {weekDates.map((date, index) => {
          const events = getEventsForDate(deadlines, date);
          const hasEvents = events.length > 0;
          const isLastCol = index === 6; // Last column (Sunday)

          return (
            <div
              key={index}
              className={`relative bg-card p-3${
                index !== 0 ? " border-l" : ""
              }${isLastCol ? " rounded-br-lg" : ""}`}
              style={{
                minHeight: hasEvents ? "200px" : "150px",
              }}
            >
              {/* Day number and indicator */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-medium ${
                    isToday(date) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {date.getDate()}
                </span>
                {hasEvents && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>

              {/* Today indicator */}
              {isToday(date) && (
                <div className="absolute top-2 right-2 w-6 h-1 bg-primary rounded-full"></div>
              )}

              {/* Events for this day */}
              <div className="space-y-1">
                {events.map((event) => (
                  <DeadlineEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
