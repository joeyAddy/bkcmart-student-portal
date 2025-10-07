import { GraduationCap, Award, BookOpen, Users } from "lucide-react";
import { StatCard } from "./stat-card";

const statsData = [
  {
    value: "155+",
    label: "Completed Courses",
    icon: GraduationCap,
    iconColor: "#ffffff",
    iconBgColor: "#14B8A6", // teal-500
    chartColor: "#14B8A6",
    growth: "+12%",
  },
  {
    value: "39+",
    label: "Earned Certificate",
    icon: Award,
    iconColor: "#ffffff",
    iconBgColor: "#F97316", // orange-500
    chartColor: "#F97316",
    growth: "+8%",
  },
  {
    value: "25+",
    label: "Course in Progress",
    icon: BookOpen,
    iconColor: "#ffffff",
    iconBgColor: "#3B82F6", // blue-500
    chartColor: "#3B82F6",
    growth: "+15%",
  },
  {
    value: "18k+",
    label: "Community Support",
    icon: Users,
    iconColor: "#ffffff",
    iconBgColor: "#8B5CF6", // purple-500
    chartColor: "#8B5CF6",
    growth: "+23%",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
