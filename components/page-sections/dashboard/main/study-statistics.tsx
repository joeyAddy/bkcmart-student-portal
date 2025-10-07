"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Generate realistic study data for the past month
const generateStudyData = () => {
  const data = [];
  const currentDate = new Date("2025-10-07"); // Current date

  // Go back 30 days from current date
  for (let i = 30; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);

    // Generate realistic study patterns (higher on weekdays, lower on weekends)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseStudyHours = isWeekend ? 2 : 4;
    const baseAssignments = isWeekend ? 0 : 2;

    data.push({
      date: date.toISOString().split("T")[0],
      studyHours: Math.floor(Math.random() * 3) + baseStudyHours,
      assignments: Math.floor(Math.random() * 3) + baseAssignments,
    });
  }

  return data;
};

const chartData = generateStudyData();

const chartConfig = {
  activities: {
    label: "Learning Activities",
  },
  studyHours: {
    label: "Study Hours",
    color: "var(--primary)",
  },
  assignments: {
    label: "Assignments Completed",
    color: "var(--secondary)",
  },
} satisfies ChartConfig;

export function StudyStatistics() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("studyHours");

  const total = React.useMemo(
    () => ({
      studyHours: chartData.reduce((acc, curr) => acc + curr.studyHours, 0),
      assignments: chartData.reduce((acc, curr) => acc + curr.assignments, 0),
    }),
    []
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-4 pt-3 pb-2 sm:!py-0">
          <CardTitle className="text-base">Study Statistics</CardTitle>
          <CardDescription className="text-sm">
            Your learning activity over the past month
          </CardDescription>
        </div>
        <div className="flex">
          {["studyHours", "assignments"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-3 text-left even:border-l sm:border-t-0 sm:border-l sm:px-6 sm:py-4"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-base leading-none font-bold sm:text-2xl">
                  {total[key as keyof typeof total].toLocaleString()}
                  {key === "studyHours" ? "h" : ""}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px]"
                  nameKey="activities"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
