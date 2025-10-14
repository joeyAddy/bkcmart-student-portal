import { useState, useCallback } from "react";
import { useGetCourseByIdQuery, CatalogCourse } from "@/lib/store/api/catalog";

interface UseCourseDetailsReturn {
  selectedCourse: CatalogCourse | null;
  selectedCourseId: string | null;
  isModalOpen: boolean;
  isLoading: boolean;
  error: unknown;
  openCourseDetails: (courseId: string) => void;
  closeCourseDetails: () => void;
}

export function useCourseDetails(): UseCourseDetailsReturn {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: selectedCourse = null,
    isLoading,
    error,
  } = useGetCourseByIdQuery(selectedCourseId!, {
    skip: !selectedCourseId,
  });

  const openCourseDetails = useCallback((courseId: string) => {
    setSelectedCourseId(courseId);
    setIsModalOpen(true);
  }, []);

  const closeCourseDetails = useCallback(() => {
    setIsModalOpen(false);
    // Delay clearing the course ID to allow modal close animation
    setTimeout(() => setSelectedCourseId(null), 200);
  }, []);

  return {
    selectedCourse,
    selectedCourseId,
    isModalOpen,
    isLoading,
    error,
    openCourseDetails,
    closeCourseDetails,
  };
}
