"use client";

import { useState } from "react";
import { useRegistrationCart, useCourseSelection } from "@/hooks/registration";
import { useRegisterForCoursesMutation } from "@/lib/store/api/registration";
import { toast } from "sonner";

import {
  SemesterTabs,
  AvailableCourses,
  RegistrationCart,
  RegistrationSummary,
} from "../shared";

export function CourseRegistrationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom hooks for cart and course selection
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

  const [registerForCourses] = useRegisterForCoursesMutation();

  const handleSubmitRegistration = async () => {
    if (summary.hasConflicts) {
      toast.error("Please resolve schedule conflicts before submitting");
      return;
    }

    if (summary.totalCredits.year === 0) {
      toast.error("Please select at least one course");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit Fall courses
      if (fallCourses.length > 0) {
        const fallResult = await registerForCourses({
          studentId: "current-student", // This would come from auth context
          courseIds: fallCourses.map((course) => course.id),
          semester: "fall",
        }).unwrap();

        if (!fallResult.success) {
          toast.error(`Fall registration failed: ${fallResult.message}`);
          setIsSubmitting(false);
          return;
        }
      }

      // Submit Spring courses
      if (springCourses.length > 0) {
        const springResult = await registerForCourses({
          studentId: "current-student", // This would come from auth context
          courseIds: springCourses.map((course) => course.id),
          semester: "spring",
        }).unwrap();

        if (!springResult.success) {
          toast.error(`Spring registration failed: ${springResult.message}`);
          setIsSubmitting(false);
          return;
        }
      }

      // Success
      toast.success("Registration submitted successfully!");
      clearAll();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Semester Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Select courses for the upcoming academic year
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
        {/* Available Courses - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
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

        {/* Sidebar - Cart and Summary */}
        <div className="space-y-6">
          <RegistrationCart
            fallCourses={fallCourses}
            springCourses={springCourses}
            onRemoveCourse={removeCourse}
            onClearSemester={clearSemester}
            onClearAll={clearAll}
            conflicts={summary.conflicts}
          />

          <RegistrationSummary
            totalCredits={summary.totalCredits}
            courseCount={summary.courseCount}
            hasConflicts={summary.hasConflicts}
            conflicts={summary.conflicts}
            onSubmitRegistration={handleSubmitRegistration}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
