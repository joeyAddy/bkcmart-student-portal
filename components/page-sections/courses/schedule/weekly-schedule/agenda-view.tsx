import { EventCard, ScheduleEvent } from "./event-card";
import { DaySchedule, getWeekDates } from "./schedule-utils";

interface AgendaViewProps {
  currentDate: Date;
  scheduleData: DaySchedule;
}

export function AgendaView({ currentDate, scheduleData }: AgendaViewProps) {
  const weekDates = getWeekDates(currentDate);
  const weekEvents: { date: Date; events: ScheduleEvent[] }[] = [];

  weekDates.forEach((date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const events = scheduleData[dayName] || [];
    if (events.length > 0) {
      weekEvents.push({ date, events });
    }
  });

  return (
    <div className="space-y-4 p-4">
      {weekEvents.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No classes scheduled for this week
        </div>
      ) : (
        weekEvents.map(({ date, events }, index) => (
          <div key={index}>
            <h3 className="font-medium text-foreground mb-2">
              {date.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h3>
            <div className="space-y-2">
              {events.map((event) => (
                <EventCard key={event.id} event={event} variant="list" />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
