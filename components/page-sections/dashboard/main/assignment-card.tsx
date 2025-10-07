import Link from "next/link";
import {
  ChevronRight,
  Search,
  Code,
  Palette,
  Calculator,
  Microscope,
  BookOpen,
  Briefcase,
  Wrench,
  GraduationCap,
} from "lucide-react";

// Department to icon and color mapping
const departmentConfig = {
  research: { icon: Search, color: "#14b8a6" }, // teal-500
  "computer-science": { icon: Code, color: "#f97316" }, // orange-500
  design: { icon: Palette, color: "#8b5cf6" }, // purple-500
  mathematics: { icon: Calculator, color: "#3b82f6" }, // blue-500
  science: { icon: Microscope, color: "#10b981" }, // emerald-500
  literature: { icon: BookOpen, color: "#f59e0b" }, // amber-500
  business: { icon: Briefcase, color: "#6b7280" }, // gray-500
  engineering: { icon: Wrench, color: "#dc2626" }, // red-500
  general: { icon: GraduationCap, color: "#6366f1" }, // indigo-500
} as const;

type Department = keyof typeof departmentConfig;

interface AssignmentCardProps {
  id: string;
  title: string;
  dueText: string;
  department: Department;
}

export function AssignmentCard({
  id,
  title,
  dueText,
  department,
}: AssignmentCardProps) {
  const config = departmentConfig[department] || departmentConfig.general;
  const Icon = config.icon;

  return (
    <Link href={`/courses/assignments/${id}`}>
      <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: config.color }}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{dueText}</div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </Link>
  );
}
