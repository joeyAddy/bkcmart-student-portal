"use client";

import { useState, useCallback } from "react";

interface UseGradeFiltersReturn {
  semester: string;
  year: number;
  status: string;
  setSemester: (value: string) => void;
  setYear: (value: number) => void;
  setStatus: (value: string) => void;
  clearFilters: () => void;
}

export function useGradeFilters(): UseGradeFiltersReturn {
  const [semester, setSemester] = useState<string>("Fall");
  const [year, setYear] = useState<number>(2025);
  const [status, setStatus] = useState<string>("all");

  const clearFilters = useCallback(() => {
    setSemester("all");
    setYear(2025);
    setStatus("all");
  }, []);

  return {
    semester,
    year,
    status,
    setSemester,
    setYear,
    setStatus,
    clearFilters,
  };
}
