import { EventCard, ScheduleEvent } from "./event-card";
import {
  DaySchedule,
  getWeekDates,
  getEventForTimeSlot,
  getEventHeight,
  TIME_SLOTS,
  DAY_NAMES,
  DAY_FULL_NAMES,
} from "./schedule-utils";

interface WeekViewProps {
  currentDate: Date;
  scheduleData: DaySchedule;
}

export function WeekView({ currentDate, scheduleData }: WeekViewProps) {
  const weekDates = getWeekDates(currentDate);

  return (
    <div className="flex flex-col">
      {/* Day Headers */}
      <div className="grid grid-cols-8 border-b bg-muted/30">
        <div className="p-4"></div>
        {DAY_NAMES.map((day, index) => {
          const date = weekDates[index];
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <div key={day} className="p-4 text-center border-l">
              <div className="text-sm font-medium text-muted-foreground">
                {day}
              </div>
              <div
                className={`text-2xl font-semibold mt-1 ${
                  isToday ? "text-primary" : "text-foreground"
                }`}
              >
                {date.getDate()}
              </div>
              {isToday && (
                <div className="w-8 h-1 bg-primary rounded-full mx-auto mt-1"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Time Grid */}
      <div className="grid grid-cols-8 auto-rows-min">
        {TIME_SLOTS.map((timeSlot) => (
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

            {/* Day Columns */}
            {DAY_FULL_NAMES.map((dayName) => {
              const event = getEventForTimeSlot(
                scheduleData,
                dayName,
                timeSlot
              );
              const eventHeight = event ? getEventHeight(event) : 1;

              return (
                <div
                  key={`${timeSlot}-${dayName}`}
                  className={`relative border-l bg-card${
                    timeSlot === TIME_SLOTS[TIME_SLOTS.length - 1]
                      ? ""
                      : " border-b"
                  }${
                    timeSlot === TIME_SLOTS[TIME_SLOTS.length - 1] &&
                    dayName === DAY_FULL_NAMES[DAY_FULL_NAMES.length - 1]
                      ? " rounded-br-lg"
                      : ""
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
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
