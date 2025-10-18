import { Page } from "@/components/shared/page-template";
import { DropAddSection } from "@/components/page-sections/enrollment/drop-add";

export default function DropAddCoursesPage() {
  return (
    <Page
      title="Drop/Add Courses"
      description="Drop or add courses during the registration period"
    >
      <DropAddSection />
    </Page>
  );
}
