"use client";

import { useMemo } from "react";
import {
  useGetStudentGradesQuery,
  useGetGradeStatsQuery,
} from "@/lib/store/api/grades";

interface UseGradeDataParams {
  semester: string;
  year: number;
  status: string;
}

export function useGradeData({ semester, year, status }: UseGradeDataParams) {
  const {
    data: gradesData,
    isLoading: gradesLoading,
    isError: gradesError,
    error,
  } = useGetStudentGradesQuery({
    page: 1,
    limit: 20,
    semester: semester === "all" ? undefined : semester,
    year: year || undefined,
    status: status === "all" ? undefined : status,
  });

  const { data: statsData, isLoading: statsLoading } = useGetGradeStatsQuery();

  const grades = useMemo(() => gradesData?.data.grades || [], [gradesData]);
  const stats = useMemo(() => statsData?.data || null, [statsData]);

  const statisticsData = useMemo(
    () => ({
      currentGPA: stats?.currentGPA,
      creditHours: gradesData?.data.totalCredits || 0,
      courseCount: grades.length,
      academicPeriod: `${
        semester === "all" ? "All Semesters" : semester
      } ${year}`,
      isLoading: gradesLoading || statsLoading,
    }),
    [
      stats,
      gradesData,
      grades.length,
      semester,
      year,
      gradesLoading,
      statsLoading,
    ]
  );

  return {
    grades,
    stats,
    statisticsData,
    isLoading: gradesLoading,
    isError: gradesError,
    error,
  };
}
