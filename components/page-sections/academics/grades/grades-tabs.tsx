"use client";

import { DataTable as GenericDataTable } from "@/components/shared/tables/data-table";
import { gradesColumns } from "@/constants/table-columns/grades";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseGrade } from "@/constants/table-columns/grades";

interface GradesTabsProps {
  grades: CourseGrade[];
  isLoading: boolean;
  semester: string;
  year: number;
}

function LoadingState() {
  return (
    <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
      <p className="text-muted-foreground">Loading grades...</p>
    </div>
  );
}

function GradesTable({ data }: { data: CourseGrade[] }) {
  return (
    <GenericDataTable
      columns={gradesColumns}
      data={data}
      enableRowSelection={false}
      enableDragAndDrop={false}
      enableColumnFilters={true}
      enablePagination={true}
      enableColumnVisibility={true}
      getRowId={(row) => row.id}
      pageSize={10}
    />
  );
}

export function GradesTabs({
  grades,
  isLoading,
  semester,
  year,
}: GradesTabsProps) {
  const filterByCurrentTerm = (grade: CourseGrade) => {
    return semester === "all"
      ? true
      : grade.gradingPeriod === `${semester} ${year}`;
  };

  const filterByStatus =
    (status: CourseGrade["status"]) => (grade: CourseGrade) => {
      return grade.status === status;
    };

  return (
    <Tabs defaultValue="all-grades" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all-grades">All Grades</TabsTrigger>
        <TabsTrigger value="current-semester">Current Term</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
      </TabsList>

      <TabsContent value="all-grades" className="space-y-4">
        {isLoading ? <LoadingState /> : <GradesTable data={grades} />}
      </TabsContent>

      <TabsContent value="current-semester" className="space-y-4">
        {isLoading ? (
          <LoadingState />
        ) : (
          <GradesTable data={grades.filter(filterByCurrentTerm)} />
        )}
      </TabsContent>

      <TabsContent value="completed" className="space-y-4">
        {isLoading ? (
          <LoadingState />
        ) : (
          <GradesTable data={grades.filter(filterByStatus("COMPLETED"))} />
        )}
      </TabsContent>

      <TabsContent value="in-progress" className="space-y-4">
        {isLoading ? (
          <LoadingState />
        ) : (
          <GradesTable data={grades.filter(filterByStatus("IN_PROGRESS"))} />
        )}
      </TabsContent>
    </Tabs>
  );
}
