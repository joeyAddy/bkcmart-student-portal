import { Page } from "@/components/shared/page-template";
import { DeadlinesMain } from "@/components/page-sections/dashboard/deadlines";

export default function DashboardDeadlinesPage() {
  return (
    <Page
      title="Upcoming Deadlines"
      description="Stay on top of your assignment due dates and important deadlines"
    >
      <DeadlinesMain />
    </Page>
  );
}
