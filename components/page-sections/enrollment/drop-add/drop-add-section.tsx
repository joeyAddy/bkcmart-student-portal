"use client";

import { useState, useMemo } from "react";
import { useRegistrationCart, useCourseSelection } from "@/hooks/registration";
import { toast } from "sonner";

import {
  SemesterTabs,
  AvailableCourses,
  RegistrationCart,
  RegistrationSummary,
} from "../shared";
import { EnrolledCourses } from "./enrolled-courses";
import { DropCart } from "./drop-cart";
import { RegistrationCourse } from "@/lib/store/api/registration";

// Mock enrolled courses data - This should come from an API/store in real implementation
const mockEnrolledCourses: RegistrationCourse[] = [
  {
    id: "ENR001",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    instructor: "Dr. Sarah Johnson",
    department: "Computer Science",
    credits: 3,
    semester: "fall" as const,
    status: "available" as const,
    description:
      "An introduction to the fundamental concepts of computer science.",
    schedule: {
      days: ["Mon", "Wed", "Fri"],
      time: "10:00 AM - 11:00 AM",
      location: "Building A, Room 101",
    },
    currentEnrollment: 25,
    maxCapacity: 30,
    prerequisites: [],
  },
  {
    id: "ENR002",
    courseCode: "MATH201",
    courseName: "Calculus II",
    instructor: "Prof. Michael Chen",
    department: "Mathematics",
    credits: 4,
    semester: "fall" as const,
    status: "available" as const,
    description: "Continuation of Calculus I covering integration techniques.",
    schedule: {
      days: ["Tue", "Thu"],
      time: "2:00 PM - 3:30 PM",
      location: "Building B, Room 205",
    },
    currentEnrollment: 28,
    maxCapacity: 35,
    prerequisites: ["MATH101"],
  },
  {
    id: "ENR003",
    courseCode: "ENG301",
    courseName: "Advanced Writing",
    instructor: "Dr. Emily Rodriguez",
    department: "English",
    credits: 3,
    semester: "spring" as const,
    status: "available" as const,
    description: "Advanced techniques in academic and professional writing.",
    schedule: {
      days: ["Mon", "Wed"],
      time: "1:00 PM - 2:30 PM",
      location: "Building C, Room 310",
    },
    currentEnrollment: 20,
    maxCapacity: 25,
    prerequisites: ["ENG101", "ENG201"],
  },
  {
    id: "ENR004",
    courseCode: "PHY101",
    courseName: "Physics I",
    instructor: "Dr. Robert Anderson",
    department: "Physics",
    credits: 4,
    semester: "spring" as const,
    status: "available" as const,
    description: "Introduction to mechanics, thermodynamics, and waves.",
    schedule: {
      days: ["Mon", "Wed", "Fri"],
      time: "9:00 AM - 10:30 AM",
      location: "Building D, Room 150",
    },
    currentEnrollment: 30,
    maxCapacity: 32,
    prerequisites: ["MATH101"],
  },
];

export function DropAddSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropCourses, setDropCourses] = useState<RegistrationCourse[]>([]);
  const [enrolledCourses] = useState(mockEnrolledCourses);

  // Enrolled courses filters
  const [enrolledSearchTerm, setEnrolledSearchTerm] = useState("");
  const [enrolledDepartment, setEnrolledDepartment] = useState("all");
  const [enrolledSemester, setEnrolledSemester] = useState<
    "all" | "fall" | "spring"
  >("all");

  // Custom hooks for cart and course selection (for adding new courses)
  const {
    fallCourses,
    springCourses,
    addCourse,
    removeCourse,
    clearSemester,
    clearAll,
    isCourseInCart,
    summary,
  } = useRegistrationCart();

  const {
    filteredCourses,
    isLoading,
    error,
    departments,
    coursesCount,
    semester,
    searchTerm,
    department,
    showAvailableOnly,
    setSemester,
    setSearchTerm,
    setDepartment,
    setShowAvailableOnly,
  } = useCourseSelection();

  // Filter enrolled courses
  const filteredEnrolledCourses = useMemo(() => {
    return enrolledCourses.filter((course) => {
      const matchesSearch =
        enrolledSearchTerm === "" ||
        course.courseName
          .toLowerCase()
          .includes(enrolledSearchTerm.toLowerCase()) ||
        course.courseCode
          .toLowerCase()
          .includes(enrolledSearchTerm.toLowerCase()) ||
        course.instructor
          .toLowerCase()
          .includes(enrolledSearchTerm.toLowerCase());

      const matchesDepartment =
        enrolledDepartment === "all" ||
        course.department === enrolledDepartment;

      const matchesSemester =
        enrolledSemester === "all" || course.semester === enrolledSemester;

      return matchesSearch && matchesDepartment && matchesSemester;
    });
  }, [
    enrolledCourses,
    enrolledSearchTerm,
    enrolledDepartment,
    enrolledSemester,
  ]);

  // Get unique departments from enrolled courses
  const enrolledDepartments = useMemo(() => {
    return Array.from(new Set(enrolledCourses.map((c) => c.department))).sort();
  }, [enrolledCourses]);

  // Get enrolled courses count
  const enrolledCoursesCount = useMemo(() => {
    return {
      total: enrolledCourses.length,
      fall: enrolledCourses.filter((c) => c.semester === "fall").length,
      spring: enrolledCourses.filter((c) => c.semester === "spring").length,
    };
  }, [enrolledCourses]);

  const handleDropCourse = (course: RegistrationCourse) => {
    const isAlreadyInDropCart = dropCourses.some((c) => c.id === course.id);

    if (isAlreadyInDropCart) {
      // Remove from drop cart
      setDropCourses(dropCourses.filter((c) => c.id !== course.id));
      toast.success(`${course.courseCode} removed from drop list`);
    } else {
      // Add to drop cart
      setDropCourses([...dropCourses, course]);
      toast.success(`${course.courseCode} marked for dropping`);
    }
  };

  const handleRemoveFromDropCart = (courseId: string) => {
    const course = dropCourses.find((c) => c.id === courseId);
    if (course) {
      setDropCourses(dropCourses.filter((c) => c.id !== courseId));
      toast.success(`${course.courseCode} removed from drop list`);
    }
  };

  const handleClearDropSemester = (semester: "fall" | "spring") => {
    setDropCourses(dropCourses.filter((c) => c.semester !== semester));
    toast.success(
      `${
        semester.charAt(0).toUpperCase() + semester.slice(1)
      } drop list cleared`
    );
  };

  const handleClearAllDrops = () => {
    setDropCourses([]);
    toast.success("Drop list cleared");
  };

  const isInDropCart = (courseId: string) => {
    return dropCourses.some((c) => c.id === courseId);
  };

  const handleSubmitChanges = async () => {
    const hasDrops = dropCourses.length > 0;
    const hasAdds = summary.totalCredits.year > 0;

    if (!hasDrops && !hasAdds) {
      toast.error("No changes to submit");
      return;
    }

    if (summary.hasConflicts) {
      toast.error("Please resolve schedule conflicts before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit drop requests
      if (hasDrops) {
        console.log("Dropping courses:", dropCourses);
        // API call to drop courses would go here
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      }

      // Submit add requests
      if (hasAdds) {
        console.log("Adding fall courses:", fallCourses);
        console.log("Adding spring courses:", springCourses);
        // API call to add courses would go here
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      }

      // Success
      toast.success(
        `Successfully ${hasDrops ? "dropped " + dropCourses.length : ""}${
          hasDrops && hasAdds ? " and " : ""
        }${hasAdds ? "added " + summary.courseCount.year : ""} course${
          dropCourses.length + summary.courseCount.year !== 1 ? "s" : ""
        }!`
      );
      setDropCourses([]);
      clearAll();
    } catch (error) {
      console.error("Drop/Add error:", error);
      toast.error("Failed to process changes. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate drop summary
  const dropSummary = useMemo(() => {
    const fallDrops = dropCourses.filter((c) => c.semester === "fall");
    const springDrops = dropCourses.filter((c) => c.semester === "spring");

    return {
      totalCredits: {
        fall: fallDrops.reduce((sum, c) => sum + c.credits, 0),
        spring: springDrops.reduce((sum, c) => sum + c.credits, 0),
        year: dropCourses.reduce((sum, c) => sum + c.credits, 0),
      },
      courseCount: {
        fall: fallDrops.length,
        spring: springDrops.length,
        year: dropCourses.length,
      },
    };
  }, [dropCourses]);

  // Calculate current enrolled summary
  const enrolledSummary = useMemo(() => {
    const fallEnrolled = enrolledCourses.filter((c) => c.semester === "fall");
    const springEnrolled = enrolledCourses.filter(
      (c) => c.semester === "spring"
    );

    return {
      totalCredits: {
        fall: fallEnrolled.reduce((sum, c) => sum + c.credits, 0),
        spring: springEnrolled.reduce((sum, c) => sum + c.credits, 0),
        year: enrolledCourses.reduce((sum, c) => sum + c.credits, 0),
      },
      courseCount: {
        fall: fallEnrolled.length,
        spring: springEnrolled.length,
        year: enrolledCourses.length,
      },
    };
  }, [enrolledCourses]);

  // Combined summary for registration summary component
  // Formula: Current Enrolled + Courses to Add - Courses to Drop
  const combinedSummary = useMemo(() => {
    return {
      totalCredits: {
        fall:
          enrolledSummary.totalCredits.fall +
          summary.totalCredits.fall -
          dropSummary.totalCredits.fall,
        spring:
          enrolledSummary.totalCredits.spring +
          summary.totalCredits.spring -
          dropSummary.totalCredits.spring,
        year:
          enrolledSummary.totalCredits.year +
          summary.totalCredits.year -
          dropSummary.totalCredits.year,
      },
      courseCount: {
        fall:
          enrolledSummary.courseCount.fall +
          summary.courseCount.fall -
          dropSummary.courseCount.fall,
        spring:
          enrolledSummary.courseCount.spring +
          summary.courseCount.spring -
          dropSummary.courseCount.spring,
        year:
          enrolledSummary.courseCount.year +
          summary.courseCount.year -
          dropSummary.courseCount.year,
      },
      hasConflicts: summary.hasConflicts,
      conflicts: summary.conflicts,
    };
  }, [summary, dropSummary, enrolledSummary]);

  return (
    <div className="space-y-6">
      {/* Header with Semester Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Review your enrolled courses and make changes as needed
          </h2>
        </div>

        <SemesterTabs
          activeSemester={semester}
          onSemesterChange={setSemester}
          fallCourseCount={summary.courseCount.fall}
          springCourseCount={summary.courseCount.spring}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Enrolled and Available Courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enrolled Courses */}
          <EnrolledCourses
            courses={filteredEnrolledCourses}
            isLoading={false}
            error={null}
            departments={enrolledDepartments}
            coursesCount={enrolledCoursesCount}
            searchTerm={enrolledSearchTerm}
            selectedDepartment={enrolledDepartment}
            selectedSemester={enrolledSemester}
            onSearchChange={setEnrolledSearchTerm}
            onDepartmentChange={setEnrolledDepartment}
            onSemesterChange={setEnrolledSemester}
            onDropCourse={handleDropCourse}
            isInDropCart={isInDropCart}
          />

          {/* Available Courses to Add */}
          <AvailableCourses
            courses={filteredCourses}
            isLoading={isLoading}
            error={error}
            departments={departments}
            coursesCount={coursesCount}
            searchTerm={searchTerm}
            selectedDepartment={department}
            showAvailableOnly={showAvailableOnly}
            onSearchChange={setSearchTerm}
            onDepartmentChange={setDepartment}
            onShowAvailableOnlyChange={setShowAvailableOnly}
            onAddCourse={addCourse}
            isCourseInCart={isCourseInCart}
          />
        </div>

        {/* Right Sidebar - Drop Cart, Add Cart, and Summary */}
        <div className="space-y-6">
          {/* Drop List */}
          <DropCart
            fallCourses={dropCourses.filter((c) => c.semester === "fall")}
            springCourses={dropCourses.filter((c) => c.semester === "spring")}
            onRemoveCourse={handleRemoveFromDropCart}
            onClearSemester={handleClearDropSemester}
            onClearAll={handleClearAllDrops}
          />

          {/* Course Selection (Courses to Add) */}
          <RegistrationCart
            fallCourses={fallCourses}
            springCourses={springCourses}
            onRemoveCourse={removeCourse}
            onClearSemester={clearSemester}
            onClearAll={clearAll}
            conflicts={summary.conflicts}
          />

          {/* Combined Summary */}
          <RegistrationSummary
            totalCredits={combinedSummary.totalCredits}
            courseCount={combinedSummary.courseCount}
            hasConflicts={combinedSummary.hasConflicts}
            conflicts={combinedSummary.conflicts}
            onSubmitRegistration={handleSubmitChanges}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
