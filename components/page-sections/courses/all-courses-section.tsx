"use client";

import { useRouter } from "next/navigation";
import { useGetStudentCoursesQuery } from "@/lib/store/api/courses";
import { DataTable as GenericDataTable } from "@/components/shared/tables/data-table";
import { coursesColumns } from "@/constants/table-columns/courses";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AllCoursesSection() {
  const router = useRouter();

  const {
    data: coursesData,
    isLoading,
    isError,
    error,
  } = useGetStudentCoursesQuery({
    page: 1,
    limit: 10,
  });

  const handleAddCourse = () => {
    router.push("/enrollment/registration");
  };

  if (isError) {
    return (
      <div className="text-center text-red-600">
        <p>
          Error loading courses:{" "}
          {(error as unknown as { data?: { message?: string } })?.data
            ?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  const courses = coursesData?.data.courses || [];

  return (
    <Tabs
      defaultValue="all-courses"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="all-courses">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-courses">All Courses</SelectItem>
            <SelectItem value="current-courses">Current Courses</SelectItem>
            <SelectItem value="completed-courses">Completed Courses</SelectItem>
            <SelectItem value="dropped-courses">Dropped Courses</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="all-courses">All Courses</TabsTrigger>
          <TabsTrigger value="current-courses">
            Current{" "}
            <Badge variant="secondary">
              {
                courses.filter(
                  (c) => c.status === "IN_PROGRESS" || c.status === "ENROLLED"
                ).length
              }
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed-courses">
            Completed{" "}
            <Badge variant="secondary">
              {courses.filter((c) => c.status === "COMPLETED").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="dropped-courses">Dropped</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleAddCourse}>
            <Plus />
            <span className="hidden lg:inline">Enroll in Course</span>
          </Button>
        </div>
      </div>

      <TabsContent
        value="all-courses"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        {isLoading ? (
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        ) : (
          <GenericDataTable
            columns={coursesColumns}
            data={courses}
            enableRowSelection={true}
            enableDragAndDrop={false}
            enableColumnFilters={true}
            enablePagination={true}
            enableColumnVisibility={true}
            getRowId={(row) => row.id}
            pageSize={10}
          />
        )}
      </TabsContent>

      <TabsContent
        value="current-courses"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        {isLoading ? (
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        ) : (
          <GenericDataTable
            columns={coursesColumns}
            data={courses.filter(
              (c) => c.status === "IN_PROGRESS" || c.status === "ENROLLED"
            )}
            enableRowSelection={true}
            enableDragAndDrop={false}
            enableColumnFilters={true}
            enablePagination={true}
            enableColumnVisibility={true}
            getRowId={(row) => row.id}
            pageSize={10}
          />
        )}
      </TabsContent>

      <TabsContent
        value="completed-courses"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        {isLoading ? (
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        ) : (
          <GenericDataTable
            columns={coursesColumns}
            data={courses.filter((c) => c.status === "COMPLETED")}
            enableRowSelection={true}
            enableDragAndDrop={false}
            enableColumnFilters={true}
            enablePagination={true}
            enableColumnVisibility={true}
            getRowId={(row) => row.id}
            pageSize={10}
          />
        )}
      </TabsContent>

      <TabsContent value="dropped-courses" className="flex flex-col">
        {isLoading ? (
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        ) : (
          <GenericDataTable
            columns={coursesColumns}
            data={courses.filter((c) => c.status === "DROPPED")}
            enableRowSelection={true}
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
  );
}
