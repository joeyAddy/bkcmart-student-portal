import { Page } from "@/components/shared/page-template";
import { AllVirtualClassesSection } from "@/components/page-sections/courses/virtual/all-virtual-classes-section";

export default function LiveClassesPage() {
  return (
    <Page
      title="Live Classes"
      description="Join live virtual classes and interactive sessions"
    >
      <AllVirtualClassesSection />
    </Page>
  );
}
