"use client";

import { useState } from "react";
import {
  useGetStudentGradesQuery,
  useGetGradeStatsQuery,
} from "@/lib/store/api/grades";
import { DataTable as GenericDataTable } from "@/components/shared/tables/data-table";
import { gradesColumns } from "@/constants/table-columns/grades";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BookOpen, GraduationCap, Calendar } from "lucide-react";

export function AllGradesSection() {
  const [semester, setSemester] = useState<string>("Fall");
  const [year, setYear] = useState<number>(2025);
  const [status, setStatus] = useState<string>("all");

  const {
    data: gradesData,
    isLoading: gradesLoading,
    isError: gradesError,
    error,
  } = useGetStudentGradesQuery({
    page: 1,
    limit: 20,
    semester: semester === "all" ? undefined : semester,
    year: year || undefined,
    status: status === "all" ? undefined : status,
  });

  const { data: statsData, isLoading: statsLoading } = useGetGradeStatsQuery();

  if (gradesError) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>
          Error loading grades:{" "}
          {(error as unknown as { data?: { message?: string } })?.data
            ?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  const grades = gradesData?.data.grades || [];
  const stats = statsData?.data || null;

  return (
    <div className="space-y-6">
      {/* Grade Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? "..." : stats?.currentGPA?.toFixed(2) || "N/A"}
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
              {gradesLoading ? "..." : gradesData?.data.totalCredits || 0}
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
              {gradesLoading ? "..." : grades.length}
            </div>
            <p className="text-xs text-muted-foreground">Current enrollment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Academic Period
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {semester} {year}
            </div>
            <p className="text-xs text-muted-foreground">Current term</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <Label className="text-sm font-medium">Filter by:</Label>
          <div className="flex gap-2 flex-wrap">
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="Spring">Spring</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
                <SelectItem value="Fall">Fall</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={year.toString()}
              onValueChange={(value) => setYear(parseInt(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="NOT_GRADED">Not Graded</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setSemester("all");
            setYear(2025);
            setStatus("all");
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Grades Table Tabs */}
      <Tabs defaultValue="all-grades" className="w-full">
        <TabsList className="grid w-fit grid-cols-4 mb-4">
          <TabsTrigger value="all-grades">All Grades</TabsTrigger>
          <TabsTrigger value="current-semester">Current Term</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="all-grades" className="space-y-4">
          {gradesLoading ? (
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Loading grades...</p>
            </div>
          ) : (
            <GenericDataTable
              columns={gradesColumns}
              data={grades}
              enableRowSelection={false}
              enableDragAndDrop={false}
              enableColumnFilters={true}
              enablePagination={true}
              enableColumnVisibility={true}
              getRowId={(row) => row.id}
              pageSize={10}
            />
          )}
        </TabsContent>

        <TabsContent value="current-semester" className="space-y-4">
          {gradesLoading ? (
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Loading grades...</p>
            </div>
          ) : (
            <GenericDataTable
              columns={gradesColumns}
              data={grades.filter((grade) =>
                semester === "all"
                  ? true
                  : grade.gradingPeriod === `${semester} ${year}`
              )}
              enableRowSelection={false}
              enableDragAndDrop={false}
              enableColumnFilters={true}
              enablePagination={true}
              enableColumnVisibility={true}
              getRowId={(row) => row.id}
              pageSize={10}
            />
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {gradesLoading ? (
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Loading grades...</p>
            </div>
          ) : (
            <GenericDataTable
              columns={gradesColumns}
              data={grades.filter((grade) => grade.status === "COMPLETED")}
              enableRowSelection={false}
              enableDragAndDrop={false}
              enableColumnFilters={true}
              enablePagination={true}
              enableColumnVisibility={true}
              getRowId={(row) => row.id}
              pageSize={10}
            />
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {gradesLoading ? (
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Loading grades...</p>
            </div>
          ) : (
            <GenericDataTable
              columns={gradesColumns}
              data={grades.filter((grade) => grade.status === "IN_PROGRESS")}
              enableRowSelection={false}
              enableDragAndDrop={false}
              enableColumnFilters={true}
              enablePagination={true}
              enableColumnVisibility={true}
              getRowId={(row) => row.id}
              pageSize={10}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Grade Distribution */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>
              Your grade distribution for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              {Object.entries(stats.gradeDistribution).map(([grade, count]) => (
                <div key={grade} className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`
                      ${
                        grade === "A"
                          ? "border-green-200 text-green-700 bg-green-50"
                          : ""
                      }
                      ${
                        grade === "B"
                          ? "border-blue-200 text-blue-700 bg-blue-50"
                          : ""
                      }
                      ${
                        grade === "C"
                          ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                          : ""
                      }
                      ${
                        grade === "D"
                          ? "border-orange-200 text-orange-700 bg-orange-50"
                          : ""
                      }
                      ${
                        grade === "F"
                          ? "border-red-200 text-red-700 bg-red-50"
                          : ""
                      }
                    `}
                  >
                    {grade}: {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
