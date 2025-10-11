import { Page } from "@/components/shared/page-template";
import { CourseRegistrationSection } from "@/components/page-sections/enrollment/registration";

export default function CourseRegistrationPage() {
  return (
    <Page
      title="Course Registration"
      description="Register for courses for the upcoming semester"
    >
      <CourseRegistrationSection />
    </Page>
  );
}
