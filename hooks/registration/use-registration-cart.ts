import { useState, useCallback, useMemo } from "react";
import { RegistrationCourse } from "@/lib/store/api/registration";

interface UseRegistrationCartState {
  fallCourses: RegistrationCourse[];
  springCourses: RegistrationCourse[];
}

interface UseRegistrationCartActions {
  addCourse: (course: RegistrationCourse) => void;
  removeCourse: (courseId: string, semester: "fall" | "spring") => void;
  clearSemester: (semester: "fall" | "spring") => void;
  clearAll: () => void;
  isCourseInCart: (courseId: string, semester?: "fall" | "spring") => boolean;
}

interface UseRegistrationCartSummary {
  totalCredits: {
    fall: number;
    spring: number;
    year: number;
  };
  courseCount: {
    fall: number;
    spring: number;
    year: number;
  };
  hasConflicts: boolean;
  conflicts: string[];
}

interface UseRegistrationCartReturn
  extends UseRegistrationCartState,
    UseRegistrationCartActions {
  summary: UseRegistrationCartSummary;
}

export function useRegistrationCart(): UseRegistrationCartReturn {
  const [cartState, setCartState] = useState<UseRegistrationCartState>({
    fallCourses: [],
    springCourses: [],
  });

  const addCourse = useCallback((course: RegistrationCourse) => {
    setCartState((prev) => {
      const targetArray =
        course.semester === "fall" ? "fallCourses" : "springCourses";

      // Check if course is already in cart
      if (prev[targetArray].some((c) => c.id === course.id)) {
        return prev;
      }

      return {
        ...prev,
        [targetArray]: [...prev[targetArray], course],
      };
    });
  }, []);

  const removeCourse = useCallback(
    (courseId: string, semester: "fall" | "spring") => {
      setCartState((prev) => {
        const targetArray =
          semester === "fall" ? "fallCourses" : "springCourses";

        return {
          ...prev,
          [targetArray]: prev[targetArray].filter(
            (course) => course.id !== courseId
          ),
        };
      });
    },
    []
  );

  const clearSemester = useCallback((semester: "fall" | "spring") => {
    setCartState((prev) => ({
      ...prev,
      [semester === "fall" ? "fallCourses" : "springCourses"]: [],
    }));
  }, []);

  const clearAll = useCallback(() => {
    setCartState({
      fallCourses: [],
      springCourses: [],
    });
  }, []);

  const isCourseInCart = useCallback(
    (courseId: string, semester?: "fall" | "spring") => {
      if (semester) {
        const targetArray =
          semester === "fall" ? cartState.fallCourses : cartState.springCourses;
        return targetArray.some((course) => course.id === courseId);
      }

      return (
        cartState.fallCourses.some((course) => course.id === courseId) ||
        cartState.springCourses.some((course) => course.id === courseId)
      );
    },
    [cartState.fallCourses, cartState.springCourses]
  );

  const summary = useMemo((): UseRegistrationCartSummary => {
    const fallCredits = cartState.fallCourses.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    const springCredits = cartState.springCourses.reduce(
      (sum, course) => sum + course.credits,
      0
    );

    // Check for schedule conflicts within each semester
    const checkSemesterConflicts = (
      courses: RegistrationCourse[]
    ): string[] => {
      const conflicts: string[] = [];
      const timeSlots = new Map<string, RegistrationCourse>();

      courses.forEach((course) => {
        course.schedule.days.forEach((day) => {
          const timeKey = `${day}-${course.schedule.time}`;
          const existingCourse = timeSlots.get(timeKey);

          if (existingCourse) {
            conflicts.push(
              `Schedule conflict: ${course.courseName} conflicts with ${existingCourse.courseName} on ${day} at ${course.schedule.time}`
            );
          } else {
            timeSlots.set(timeKey, course);
          }
        });
      });

      return conflicts;
    };

    const fallConflicts = checkSemesterConflicts(cartState.fallCourses);
    const springConflicts = checkSemesterConflicts(cartState.springCourses);
    const allConflicts = [...fallConflicts, ...springConflicts];

    return {
      totalCredits: {
        fall: fallCredits,
        spring: springCredits,
        year: fallCredits + springCredits,
      },
      courseCount: {
        fall: cartState.fallCourses.length,
        spring: cartState.springCourses.length,
        year: cartState.fallCourses.length + cartState.springCourses.length,
      },
      hasConflicts: allConflicts.length > 0,
      conflicts: allConflicts,
    };
  }, [cartState.fallCourses, cartState.springCourses]);

  return {
    ...cartState,
    addCourse,
    removeCourse,
    clearSemester,
    clearAll,
    isCourseInCart,
    summary,
  };
}
