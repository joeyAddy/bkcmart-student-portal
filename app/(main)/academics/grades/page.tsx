import { AllGradesSection } from "@/components/page-sections/academics/grades/all-grades-section";
import { Page } from "@/components/shared/page-template";

export default function GradesPage() {
  return (
    <Page
      title="Current Grades"
      description="View your current course grades and academic performance"
    >
      <AllGradesSection />
    </Page>
  );
}
