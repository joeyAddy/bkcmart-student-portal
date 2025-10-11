"use client";

import { useGradeFilters, useGradeData } from "@/hooks/grades";
import {
  GradeStatisticsCards,
  GradeFilters,
  GradesTabs,
  GradeDistribution,
} from "./index";

export function AllGradesSection() {
  const { semester, year, status, setSemester, setYear, setStatus, clearFilters } =
    useGradeFilters();

  const { grades, stats, statisticsData, isLoading, isError, error } = useGradeData({
    semester,
    year,
    status,
  });

  if (isError) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>
          Error loading grades:{" "}
          {(error as unknown as { data?: { message?: string } })?.data
            ?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grade Statistics Cards */}
      <GradeStatisticsCards data={statisticsData} />

      {/* Filters */}
      <GradeFilters
        semester={semester}
        year={year}
        status={status}
        onSemesterChange={setSemester}
        onYearChange={setYear}
        onStatusChange={setStatus}
        onClearFilters={clearFilters}
      />

      {/* Grades Table Tabs */}
      <GradesTabs
        grades={grades}
        isLoading={isLoading}
        semester={semester}
        year={year}
      />

      {/* Grade Distribution */}
      {stats && <GradeDistribution distribution={stats.gradeDistribution} />}
    </div>
  );
}