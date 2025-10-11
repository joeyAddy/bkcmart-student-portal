import { AllMaterialsSection } from "@/components/page-sections/courses/materials/all-materials-section";
import { Page } from "@/components/shared/page-template";

export default function CourseMaterialsPage() {
  return (
    <Page
      title="Course Materials"
      description="Access textbooks, readings, and course resources"
    >
      <AllMaterialsSection />
    </Page>
  );
}
