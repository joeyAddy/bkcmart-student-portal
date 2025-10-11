import { useState, useCallback, useMemo } from "react";
import {
  useGetAvailableCoursesQuery,
  RegistrationCourse,
} from "@/lib/store/api/registration";

interface UseCourseSelectionFilters {
  semester: "fall" | "spring" | "all";
  department: string;
  searchTerm: string;
  showAvailableOnly: boolean;
}

interface UseCourseSelectionActions {
  setSemester: (semester: "fall" | "spring" | "all") => void;
  setDepartment: (department: string) => void;
  setSearchTerm: (term: string) => void;
  setShowAvailableOnly: (show: boolean) => void;
  resetFilters: () => void;
}

interface UseCourseSelectionReturn
  extends UseCourseSelectionFilters,
    UseCourseSelectionActions {
  courses: RegistrationCourse[];
  filteredCourses: RegistrationCourse[];
  isLoading: boolean;
  error: unknown;
  departments: string[];
  coursesCount: {
    total: number;
    available: number;
    full: number;
  };
}

const initialFilters: UseCourseSelectionFilters = {
  semester: "all",
  department: "all",
  searchTerm: "",
  showAvailableOnly: false,
};

export function useCourseSelection(): UseCourseSelectionReturn {
  const [filters, setFilters] =
    useState<UseCourseSelectionFilters>(initialFilters);

  const {
    data: courses = [],
    isLoading,
    error,
  } = useGetAvailableCoursesQuery({
    semester: filters.semester,
    department:
      filters.department === "all"
        ? undefined
        : filters.department || undefined,
  });

  const setSemester = useCallback((semester: "fall" | "spring" | "all") => {
    setFilters((prev) => ({ ...prev, semester }));
  }, []);

  const setDepartment = useCallback((department: string) => {
    setFilters((prev) => ({ ...prev, department }));
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: term }));
  }, []);

  const setShowAvailableOnly = useCallback((show: boolean) => {
    setFilters((prev) => ({ ...prev, showAvailableOnly: show }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const departments = useMemo((): string[] => {
    const deptSet = new Set<string>(
      courses.map((course: RegistrationCourse) => course.department)
    );
    return Array.from(deptSet).sort();
  }, [courses]);

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.courseName.toLowerCase().includes(searchLower) ||
          course.courseCode.toLowerCase().includes(searchLower) ||
          course.instructor.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by availability
    if (filters.showAvailableOnly) {
      filtered = filtered.filter((course) => course.status === "available");
    }

    return filtered;
  }, [courses, filters.searchTerm, filters.showAvailableOnly]);

  const coursesCount = useMemo(() => {
    const total = filteredCourses.length;
    const available = filteredCourses.filter(
      (course) => course.status === "available"
    ).length;
    const full = filteredCourses.filter(
      (course) => course.status === "full"
    ).length;

    return { total, available, full };
  }, [filteredCourses]);

  return {
    ...filters,
    courses,
    filteredCourses,
    isLoading,
    error,
    departments,
    coursesCount,
    setSemester,
    setDepartment,
    setSearchTerm,
    setShowAvailableOnly,
    resetFilters,
  };
}
