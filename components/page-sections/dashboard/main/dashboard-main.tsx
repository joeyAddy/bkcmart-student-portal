import { RightSidebar } from "./right-sidebar";
import { StatsCards } from "./stats-cards";
import { StudyStatistics } from "./study-statistics";
import { RecentActivity } from "./recent-activity";

export function DashboardMain() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-6">
      {/* Top Stats Cards */}
      <StatsCards />

      {/* Main Content Area */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <StudyStatistics />
          <RecentActivity />
        </div>

        {/* Right Sidebar - 1 column */}
        <div className="lg:col-span-1">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
