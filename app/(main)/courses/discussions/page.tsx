import { Metadata } from "next";
import { Page } from "@/components/page-template";
import { AllDiscussionsSection } from "@/components/page-sections/discussions/all-discussions-section";

export const metadata: Metadata = {
  title: "Discussions | Student Portal",
  description:
    "Participate in course discussions and collaborate with classmates",
};

export default function DiscussionsPage() {
  return (
    <Page
      title="Discussions"
      description="Participate in course discussions and collaborate with classmates"
    >
      <AllDiscussionsSection />
    </Page>
  );
}
