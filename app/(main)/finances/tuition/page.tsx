import { Page } from "@/components/shared/page-template";
import { TuitionSection } from "@/components/page-sections/finances";

export default function TuitionPage() {
  return (
    <Page
      title="Tuition & Fees"
      description="View your current balance and tuition charges"
    >
      <TuitionSection />
    </Page>
  );
}
