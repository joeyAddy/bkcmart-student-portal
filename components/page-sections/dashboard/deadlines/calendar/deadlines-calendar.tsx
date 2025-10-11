"use client";

import { useState } from "react";
import { DeadlinesHeader } from "./deadlines-header";
import { MonthView } from "./month-view";
import { WeekView } from "./week-view";
import { AgendaView } from "./agenda-view";
import {
  getWeekDates,
  createCalendarGrid,
  SAMPLE_DEADLINE_DATA,
  MONTH_NAMES,
} from "../shared/deadlines-utils";

type ViewType = "month" | "week" | "agenda";

export function DeadlinesCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9)); // October 2025
  const [viewType, setViewType] = useState<ViewType>("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthYear = `${MONTH_NAMES[month]} ${year}`;
  const weekStart =
    viewType === "week"
      ? getWeekDates(currentDate)[0].toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : createCalendarGrid(year, month)[0].date.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
        });

  const handleNavigate = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        if (viewType === "week") {
          newDate.setDate(newDate.getDate() - 7);
        } else {
          newDate.setMonth(newDate.getMonth() - 1);
        }
      } else {
        if (viewType === "week") {
          newDate.setDate(newDate.getDate() + 7);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
      }
      return newDate;
    });
  };

  const handleViewTypeChange = (newViewType: ViewType) => {
    setViewType(newViewType);
  };

  const renderCurrentView = () => {
    switch (viewType) {
      case "month":
        return (
          <MonthView
            currentDate={currentDate}
            deadlines={SAMPLE_DEADLINE_DATA}
          />
        );
      case "week":
        return (
          <WeekView
            currentDate={currentDate}
            deadlines={SAMPLE_DEADLINE_DATA}
          />
        );
      case "agenda":
        return (
          <AgendaView
            currentDate={currentDate}
            deadlines={SAMPLE_DEADLINE_DATA}
          />
        );
      default:
        return (
          <MonthView
            currentDate={currentDate}
            deadlines={SAMPLE_DEADLINE_DATA}
          />
        );
    }
  };

  return (
    <div className="w-full h-full bg-card rounded-lg border">
      <DeadlinesHeader
        monthYear={monthYear}
        weekStart={weekStart}
        viewType={viewType}
        onNavigate={handleNavigate}
        onViewTypeChange={handleViewTypeChange}
      />
      {renderCurrentView()}
    </div>
  );
}
