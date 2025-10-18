import { Page } from "@/components/shared/page-template";
import { AnnouncementsSection } from "@/components/page-sections/communications/announcements/announcements-section";

export default function AnnouncementsPage() {
  return (
    <Page
      title="Announcements"
      description="View important campus and academic announcements"
    >
      <AnnouncementsSection />
    </Page>
  );
}
