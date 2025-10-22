"use client";

import { useState, useEffect } from "react";
import { ScheduleHeader } from "./schedule-header";
import { WeekView } from "./week-view";
import { DayView } from "./day-view";
import { AgendaView } from "./agenda-view";
import { getWeekDates, SAMPLE_SCHEDULE_DATA } from "./schedule-utils";
import { useIsMobile } from "@/hooks/use-mobile";

type ViewType = "week" | "day" | "agenda";

export function WeeklySchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>("week");
  const [userSelectedView, setUserSelectedView] = useState<ViewType>("week");
  const isMobile = useIsMobile();

  // Automatically switch to agenda view on mobile, but remember user preference
  useEffect(() => {
    if (isMobile) {
      setViewType("agenda");
    } else {
      setViewType(userSelectedView);
    }
  }, [isMobile, userSelectedView]);

  const weekDates = getWeekDates(currentDate);
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekStart = weekDates[0].toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleNavigate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewType === "day") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    } else {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const handleViewTypeChange = (newViewType: ViewType) => {
    setUserSelectedView(newViewType);
    if (!isMobile) {
      setViewType(newViewType);
    }
  };

  const renderCurrentView = () => {
    switch (viewType) {
      case "week":
        return (
          <WeekView
            currentDate={currentDate}
            scheduleData={SAMPLE_SCHEDULE_DATA}
          />
        );
      case "day":
        return (
          <DayView
            currentDate={currentDate}
            scheduleData={SAMPLE_SCHEDULE_DATA}
          />
        );
      case "agenda":
        return (
          <AgendaView
            currentDate={currentDate}
            scheduleData={SAMPLE_SCHEDULE_DATA}
          />
        );
      default:
        return (
          <WeekView
            currentDate={currentDate}
            scheduleData={SAMPLE_SCHEDULE_DATA}
          />
        );
    }
  };

  return (
    <div className="w-full h-full bg-card rounded-lg border">
      <ScheduleHeader
        monthYear={monthYear}
        weekStart={weekStart}
        viewType={viewType}
        onNavigate={handleNavigate}
        onViewTypeChange={handleViewTypeChange}
      />
      <div className={isMobile ? "mobile-schedule-view" : ""}>
        {renderCurrentView()}
      </div>
    </div>
  );
}
