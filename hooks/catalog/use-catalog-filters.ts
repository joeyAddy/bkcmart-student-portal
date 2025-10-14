import { useState, useCallback, useMemo } from "react";
import {
  useGetCatalogCoursesQuery,
  CatalogCourse,
  CatalogFilters,
} from "@/lib/store/api/catalog";

interface UseCatalogFiltersActions {
  setSearch: (search: string) => void;
  setDepartment: (department: string) => void;
  setLevel: (level: "all" | "undergraduate" | "graduate") => void;
  setCourseLevel: (courseLevel: string) => void;
  setCredits: (credits: string) => void;
  setStatus: (status: "all" | "active" | "inactive") => void;
  setHasPrerequisites: (hasPrerequisites: boolean | null) => void;
  resetFilters: () => void;
}

interface UseCatalogFiltersReturn
  extends CatalogFilters,
    UseCatalogFiltersActions {
  courses: CatalogCourse[];
  filteredCourses: CatalogCourse[];
  isLoading: boolean;
  error: unknown;
  departments: string[];
  coursesCount: {
    total: number;
    active: number;
    inactive: number;
    filtered: number;
  };
}

const initialFilters: CatalogFilters = {
  search: "",
  department: "all",
  level: "all",
  courseLevel: "all",
  credits: "all",
  status: "all",
  hasPrerequisites: null,
};

export function useCatalogFilters(): UseCatalogFiltersReturn {
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);

  const {
    data: courses = [],
    isLoading,
    error,
  } = useGetCatalogCoursesQuery({
    search: filters.search || undefined,
    department: filters.department === "all" ? undefined : filters.department,
    level: filters.level,
    courseLevel: filters.courseLevel,
    credits: filters.credits,
    status: filters.status,
  });

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setDepartment = useCallback((department: string) => {
    setFilters((prev) => ({ ...prev, department }));
  }, []);

  const setLevel = useCallback(
    (level: "all" | "undergraduate" | "graduate") => {
      setFilters((prev) => ({ ...prev, level }));
    },
    []
  );

  const setCourseLevel = useCallback((courseLevel: string) => {
    setFilters((prev) => ({ ...prev, courseLevel }));
  }, []);

  const setCredits = useCallback((credits: string) => {
    setFilters((prev) => ({ ...prev, credits }));
  }, []);

  const setStatus = useCallback((status: "all" | "active" | "inactive") => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const setHasPrerequisites = useCallback(
    (hasPrerequisites: boolean | null) => {
      setFilters((prev) => ({ ...prev, hasPrerequisites }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const departments = useMemo(() => {
    const deptSet = new Set(courses.map((course) => course.department));
    return Array.from(deptSet).sort();
  }, [courses]);

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    // Additional client-side filtering for prerequisites
    if (filters.hasPrerequisites !== null) {
      filtered = filtered.filter((course) => {
        const hasPrereqs = course.prerequisites.length > 0;
        return filters.hasPrerequisites ? hasPrereqs : !hasPrereqs;
      });
    }

    return filtered;
  }, [courses, filters.hasPrerequisites]);

  const coursesCount = useMemo(() => {
    const total = courses.length;
    const active = courses.filter(
      (course) => course.status === "active"
    ).length;
    const inactive = courses.filter(
      (course) => course.status === "inactive"
    ).length;
    const filtered = filteredCourses.length;

    return { total, active, inactive, filtered };
  }, [courses, filteredCourses]);

  return {
    ...filters,
    courses,
    filteredCourses,
    isLoading,
    error,
    departments,
    coursesCount,
    setSearch,
    setDepartment,
    setLevel,
    setCourseLevel,
    setCredits,
    setStatus,
    setHasPrerequisites,
    resetFilters,
  };
}
