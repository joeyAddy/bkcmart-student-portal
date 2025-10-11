import { AllAssignmentsSection } from "@/components/page-sections/assignments/all-assignments-section";
import { Page } from "@/components/shared/page-template";

export default function AssignmentsPage() {
  return (
    <Page
      title="Assignments"
      description="View, submit, and track your course assignments"
    >
      <AllAssignmentsSection />
    </Page>
  );
}
