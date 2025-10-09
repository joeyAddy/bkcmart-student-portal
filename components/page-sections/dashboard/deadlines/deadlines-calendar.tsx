"use client";
import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample calendar events data
const calendarEvents = [
  {
    id: 1,
    date: "2025-10-10",
    title: "React Assignment Due",
    category: "academic",
    priority: "high",
    time: "11:59 PM",
  },
  {
    id: 2,
    date: "2025-10-12",
    title: "Tuition Payment Due",
    category: "financial",
    priority: "high",
    time: "5:00 PM",
  },
  {
    id: 3,
    date: "2025-10-15",
    title: "Add/Drop Deadline",
    category: "enrollment",
    priority: "medium",
    time: "11:59 PM",
  },
  {
    id: 4,
    date: "2025-10-18",
    title: "Midterm Exam",
    category: "academic",
    priority: "high",
    time: "10:00 AM",
  },
  {
    id: 5,
    date: "2025-10-20",
    title: "Transcript Request Deadline",
    category: "document",
    priority: "medium",
    time: "5:00 PM",
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DeadlinesCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9)); // October 2025

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Create calendar grid
  const calendarDays = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, daysInPrevMonth - i),
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(year, month, day),
    });
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(year, month + 1, day),
    });
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return calendarEvents.filter((event) => event.date === dateStr);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800";
      case "financial":
        return "bg-red-100 text-red-800";
      case "enrollment":
        return "bg-green-100 text-green-800";
      case "document":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === "high") {
      return <AlertCircle className="w-3 h-3 text-red-500" />;
    }
    return null;
  };

  const today = new Date();
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Deadlines Calendar
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-lg font-semibold px-4">
              {monthNames[month]} {year}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Calendar Grid */}
        <div className="space-y-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-2 text-center font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((calDay, index) => {
              const events = getEventsForDate(calDay.date);
              const hasEvents = events.length > 0;

              return (
                <div
                  key={index}
                  className={`
                    min-h-[120px] p-2 border rounded-lg hover:bg-muted/50 transition-colors
                    ${
                      !calDay.isCurrentMonth
                        ? "text-muted-foreground bg-muted/20"
                        : ""
                    }
                    ${
                      isToday(calDay.date)
                        ? "ring-2 ring-primary bg-primary/5"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        isToday(calDay.date) ? "text-primary" : ""
                      }`}
                    >
                      {calDay.day}
                    </span>
                    {hasEvents && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>

                  {/* Events for this day */}
                  <div className="space-y-1">
                    {events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="p-1 rounded text-xs border-l-2 border-primary bg-background/80"
                      >
                        <div className="flex items-center gap-1 mb-1">
                          {getPriorityIcon(event.priority)}
                          <span className="font-medium truncate">
                            {event.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {event.time}
                          </span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs mt-1 ${getCategoryColor(
                            event.category
                          )}`}
                        >
                          {event.category}
                        </Badge>
                      </div>
                    ))}

                    {events.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{events.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Academic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Financial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Enrollment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>Documents</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3 h-3 text-red-500" />
            <span>High Priority</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
