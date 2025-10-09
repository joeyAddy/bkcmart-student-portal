"use client";

import { PolarGrid, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";

export const description = "A radial chart showing course progress";

const chartData = [
  { type: "completed", count: 60, fill: "#3b82f6" }, // blue
  { type: "inProgress", count: 30, fill: "#f97316" }, // orange
  { type: "notStarted", count: 15, fill: "#6b7280" }, // gray
];

const chartConfig = {
  count: {
    label: "Courses",
  },
  completed: {
    label: "Completed",
    color: "#3b82f6",
  },
  inProgress: {
    label: "In Progress",
    color: "#f97316",
  },
  notStarted: {
    label: "Not Started",
    color: "#6b7280",
  },
} satisfies ChartConfig;

export function ProgressChart() {
  const totalCourses = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>My Course Progress</CardTitle>
        <CardDescription>Total hours: 6h 32 min</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="type" />}
            />
            <PolarGrid gridType="circle" />
            <RadialBar dataKey="count" />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* Total Hours */}
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">Total hours</p>
          <p className="text-xl font-semibold">6h 32 min</p>
        </div>

        {/* Progress Breakdown with Progress Bars */}
        <div className="flex justify-between items-center text-sm gap-4 w-full">
          <div className="text-center flex-1">
            <Progress
              value={(chartData[0].count / totalCourses) * 100}
              className="h-2 mb-2"
            />
            <div className="text-lg font-semibold">
              {chartData[0].count}/{totalCourses}
            </div>
            <div className="text-muted-foreground">Completed</div>
          </div>
          <div className="text-center flex-1">
            <Progress
              value={(chartData[1].count / totalCourses) * 100}
              className="h-2 mb-2"
            />
            <div className="text-lg font-semibold">
              {chartData[1].count}/{totalCourses}
            </div>
            <div className="text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center flex-1">
            <Progress
              value={(chartData[2].count / totalCourses) * 100}
              className="h-2 mb-2"
            />
            <div className="text-lg font-semibold">
              {chartData[2].count}/{totalCourses}
            </div>
            <div className="text-muted-foreground">Not Started</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
