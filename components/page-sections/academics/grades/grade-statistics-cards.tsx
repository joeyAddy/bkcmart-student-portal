"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BookOpen, GraduationCap, Calendar } from "lucide-react";

interface GradeStatisticsData {
  currentGPA?: number;
  creditHours: number;
  courseCount: number;
  academicPeriod: string;
  isLoading: boolean;
}

interface GradeStatisticsCardsProps {
  data: GradeStatisticsData;
}

export function GradeStatisticsCards({ data }: GradeStatisticsCardsProps) {
  const { currentGPA, creditHours, courseCount, academicPeriod, isLoading } =
    data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : currentGPA?.toFixed(2) || "N/A"}
          </div>
          <p className="text-xs text-muted-foreground">Out of 4.0 scale</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : creditHours}
          </div>
          <p className="text-xs text-muted-foreground">
            Total enrolled credits
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Courses</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : courseCount}
          </div>
          <p className="text-xs text-muted-foreground">Current enrollment</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Academic Period</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{academicPeriod}</div>
          <p className="text-xs text-muted-foreground">Current term</p>
        </CardContent>
      </Card>
    </div>
  );
}
