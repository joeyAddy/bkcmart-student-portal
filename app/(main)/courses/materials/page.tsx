import { AllMaterialsSection } from "@/components/page-sections/materials/all-materials-section";
import { Page } from "@/components/page-template";

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
