"use client";

import { Page } from "@/components/shared/page-template";
import { AllCoursesSection } from "@/components/page-sections/courses/all-courses-section";

export default function CurrentCoursesPage() {
  return (
    <Page
      title="Current Courses"
      description="View and access all your currently enrolled courses"
    >
      <AllCoursesSection />
    </Page>
  );
}
