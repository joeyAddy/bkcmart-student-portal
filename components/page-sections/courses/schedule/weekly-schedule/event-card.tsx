interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  endTime: string;
  color: string;
  course?: string;
  location?: string;
  instructor?: string;
}

interface EventCardProps {
  event: ScheduleEvent;
  height?: string;
  variant?: "grid" | "list";
}

export function EventCard({ event, height, variant = "grid" }: EventCardProps) {
  if (variant === "list") {
    return (
      <div
        className="p-3 bg-card border shadow-sm"
        style={{
          borderLeft: `4px solid ${event.color}`,
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{event.title}</h4>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span>
                {event.time} - {event.endTime}
              </span>
              {event.location && <span>{event.location}</span>}
              {event.instructor && <span>{event.instructor}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-x-1 top-1 p-3 bg-card border shadow-sm text-foreground text-xs"
      style={{
        height: height || "56px",
        minHeight: "56px",
        borderLeft: `4px solid ${event.color}`,
      }}
    >
      <div className="font-medium truncate text-sm">{event.title}</div>
      <div className="text-muted-foreground truncate mt-1">
        {event.time} - {event.endTime}
      </div>
      {event.location && (
        <div className="text-muted-foreground text-xs truncate mt-1">
          {event.location}
        </div>
      )}
    </div>
  );
}

export type { ScheduleEvent };
