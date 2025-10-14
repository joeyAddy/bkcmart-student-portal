import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SemesterTabsProps {
  activeSemester: "fall" | "spring" | "all";
  onSemesterChange: (semester: "fall" | "spring" | "all") => void;
  fallCourseCount?: number;
  springCourseCount?: number;
  className?: string;
}

const semesterTabs = [
  { id: "all" as const, label: "All Semesters", shortLabel: "All" },
  { id: "fall" as const, label: "Fall Semester", shortLabel: "Fall" },
  { id: "spring" as const, label: "Spring Semester", shortLabel: "Spring" },
];

export function SemesterTabs({
  activeSemester,
  onSemesterChange,
  fallCourseCount = 0,
  springCourseCount = 0,
  className,
}: SemesterTabsProps) {
  const getCourseCount = (semesterId: "fall" | "spring" | "all") => {
    switch (semesterId) {
      case "fall":
        return fallCourseCount;
      case "spring":
        return springCourseCount;
      case "all":
        return fallCourseCount + springCourseCount;
      default:
        return 0;
    }
  };

  return (
    <Tabs
      value={activeSemester}
      onValueChange={(value) =>
        onSemesterChange(value as "fall" | "spring" | "all")
      }
      className={className}
    >
      <TabsList className="grid w-full grid-cols-3">
        {semesterTabs.map((tab) => {
          const courseCount = getCourseCount(tab.id);

          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center space-x-2"
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
              {courseCount > 0 && (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ml-1",
                    "bg-primary/10 text-primary data-[state=active]:bg-background data-[state=active]:text-foreground"
                  )}
                >
                  {courseCount}
                </span>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
