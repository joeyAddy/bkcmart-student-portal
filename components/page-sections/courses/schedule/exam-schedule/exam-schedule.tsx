"use client";

import { useState, useEffect } from "react";
import { ExamScheduleHeader } from "./exam-schedule-header";
import { MonthView } from "./month-view";
import { WeekView } from "./week-view";
import { ListView } from "./list-view";
import { getWeekDates, SAMPLE_EXAM_DATA, MONTH_NAMES } from "./exam-utils";
import { useIsMobile } from "@/hooks/use-mobile";

type ViewType = "month" | "week" | "list";

export function ExamSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>("month");
  const [userSelectedView, setUserSelectedView] = useState<ViewType>("month");
  const isMobile = useIsMobile();

  // Automatically switch to list view on mobile, but remember user preference
  useEffect(() => {
    if (isMobile) {
      setViewType("list");
    } else {
      setViewType(userSelectedView);
    }
  }, [isMobile, userSelectedView]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthYear = `${MONTH_NAMES[month]} ${year}`;
  const weekStart = getWeekDates(currentDate)[0].toLocaleDateString("en-US", {
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
    setUserSelectedView(newViewType);
    if (!isMobile) {
      setViewType(newViewType);
    }
  };

  const renderCurrentView = () => {
    switch (viewType) {
      case "month":
        return <MonthView currentDate={currentDate} exams={SAMPLE_EXAM_DATA} />;
      case "week":
        return <WeekView currentDate={currentDate} exams={SAMPLE_EXAM_DATA} />;
      case "list":
        return <ListView currentDate={currentDate} exams={SAMPLE_EXAM_DATA} />;
      default:
        return <MonthView currentDate={currentDate} exams={SAMPLE_EXAM_DATA} />;
    }
  };

  return (
    <div className="w-full h-full bg-card rounded-lg border">
      <ExamScheduleHeader
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
