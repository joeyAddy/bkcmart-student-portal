import { Page } from "@/components/shared/page-template";
import { AllRecordedClassesSection } from "@/components/page-sections/courses/virtual-recorded/all-recorded-classes-section";

export default function RecordedLecturesPage() {
  return (
    <Page
      title="Recorded Lectures"
      description="Watch recorded class sessions and download lecture materials"
    >
      <AllRecordedClassesSection />
    </Page>
  );
}
