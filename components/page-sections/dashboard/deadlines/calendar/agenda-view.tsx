import {
  DeadlineEventCard,
  DeadlineEvent,
} from "../shared/deadline-event-card";
import { isToday } from "../shared/deadlines-utils";

interface AgendaViewProps {
  currentDate: Date;
  deadlines: DeadlineEvent[];
}

export function AgendaView({ currentDate, deadlines }: AgendaViewProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get all events for the current month
  const monthEvents = deadlines
    .filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-4 p-4">
      {monthEvents.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No events scheduled for this month
        </div>
      ) : (
        monthEvents.map((event) => {
          const eventDate = new Date(event.date);
          const isEventToday = isToday(eventDate);

          return (
            <DeadlineEventCard
              key={event.id}
              event={event}
              variant="list"
              isToday={isEventToday}
            />
          );
        })
      )}
    </div>
  );
}
