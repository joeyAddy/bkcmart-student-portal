import { Page } from "@/components/shared/page-template";
import { ActivityFeed } from "@/components/page-sections/dashboard/main";

export default function DashboardActivityPage() {
  return (
    <Page
      title="Recent Activity"
      description="View your recent academic activities and updates"
    >
      <ActivityFeed />
    </Page>
  );
}
