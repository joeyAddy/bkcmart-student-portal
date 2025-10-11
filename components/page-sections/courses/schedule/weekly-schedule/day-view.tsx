import { EventCard } from "./event-card";
import {
  DaySchedule,
  getEventForTimeSlot,
  getEventHeight,
  TIME_SLOTS,
} from "./schedule-utils";

interface DayViewProps {
  currentDate: Date;
  scheduleData: DaySchedule;
}

export function DayView({ currentDate, scheduleData }: DayViewProps) {
  const today = new Date(currentDate);
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="flex flex-col">
      {/* Day Header */}
      <div className="border-b bg-muted/30 p-4 text-center">
        <div className="text-sm font-medium text-muted-foreground">
          {today.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()}
        </div>
        <div className="text-2xl font-semibold mt-1 text-foreground">
          {today.getDate()}
        </div>
        <div className="w-8 h-1 bg-primary rounded-full mx-auto mt-1"></div>
      </div>

      {/* Time Grid for Single Day */}
      <div className="grid grid-cols-2 auto-rows-min">
        {TIME_SLOTS.map((timeSlot) => {
          const event = getEventForTimeSlot(scheduleData, dayName, timeSlot);
          const eventHeight = event ? getEventHeight(event) : 1;

          return (
            <div key={timeSlot} className="contents">
              {/* Time Label */}
              <div
                className={`p-4 text-sm text-muted-foreground bg-muted/10 min-h-16${
                  timeSlot === TIME_SLOTS[TIME_SLOTS.length - 1]
                    ? ""
                    : " border-b"
                }`}
              >
                {timeSlot}
              </div>

              {/* Event Column */}
              <div
                className={`relative border-l bg-card${
                  timeSlot === TIME_SLOTS[TIME_SLOTS.length - 1]
                    ? " rounded-br-lg"
                    : " border-b"
                }`}
                style={{
                  minHeight: event ? `${eventHeight * 64}px` : "64px",
                }}
              >
                {event && (
                  <EventCard
                    event={event}
                    height={`${getEventHeight(event) * 60 - 8}px`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
