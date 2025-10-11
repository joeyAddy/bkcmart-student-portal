"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GradeDistributionData {
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
}

interface GradeDistributionProps {
  distribution: GradeDistributionData;
}

const gradeColorClasses: Record<string, string> = {
  A: "border-green-200 text-green-700 bg-green-50",
  B: "border-blue-200 text-blue-700 bg-blue-50",
  C: "border-yellow-200 text-yellow-700 bg-yellow-50",
  D: "border-orange-200 text-orange-700 bg-orange-50",
  F: "border-red-200 text-red-700 bg-red-50",
};

export function GradeDistribution({ distribution }: GradeDistributionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Distribution</CardTitle>
        <CardDescription>
          Your grade distribution for the selected period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 flex-wrap">
          {Object.entries(distribution).map(([grade, count]) => (
            <div key={grade} className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={gradeColorClasses[grade] || ""}
              >
                {grade}: {count}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
