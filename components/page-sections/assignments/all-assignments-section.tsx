"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable as GenericDataTable } from "@/components/shared/tables/data-table";
import { assignmentColumns } from "@/constants/table-columns/assignments";
import {
  useGetStudentAssignmentsQuery,
  useGetAssignmentStatsQuery,
} from "@/lib/store/api/assignments";

export function AllAssignmentsSection() {
  const [activeTab, setActiveTab] = useState("all-assignments");

  // Get assignments data based on active tab
  const { data: assignmentsData } = useGetStudentAssignmentsQuery({
    page: 1,
    limit: 100, // Get all assignments for filtering
    status:
      activeTab === "all-assignments"
        ? undefined
        : activeTab.replace("-assignments", ""),
  });

  // Get assignment statistics for tab counts
  const { data: statsData } = useGetAssignmentStatsQuery();

  const assignments = assignmentsData?.data?.assignments || [];
  const stats = statsData?.data;

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-assignments">All Assignments</SelectItem>
            <SelectItem value="pending-assignments">
              Pending Assignments
            </SelectItem>
            <SelectItem value="submitted-assignments">
              Submitted Assignments
            </SelectItem>
            <SelectItem value="graded-assignments">
              Graded Assignments
            </SelectItem>
            <SelectItem value="overdue-assignments">
              Overdue Assignments
            </SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="all-assignments">All Assignments</TabsTrigger>
          <TabsTrigger value="pending-assignments">
            Pending <Badge variant="secondary">{stats?.pending || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="submitted-assignments">
            Submitted <Badge variant="secondary">{stats?.submitted || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="graded-assignments">
            Graded <Badge variant="secondary">{stats?.graded || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="overdue-assignments">Overdue</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          {/* Space for future action buttons if needed */}
        </div>
      </div>

      <TabsContent
        value="all-assignments"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <GenericDataTable
          columns={assignmentColumns}
          data={assignments}
          enableRowSelection={true}
          enableDragAndDrop={false}
          enableColumnFilters={true}
          enablePagination={true}
          enableColumnVisibility={true}
          getRowId={(row) => row.id}
          pageSize={10}
        />
      </TabsContent>

      <TabsContent
        value="pending-assignments"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <GenericDataTable
          columns={assignmentColumns}
          data={assignments.filter((a) => a.status === "PENDING")}
          enableRowSelection={true}
          enableDragAndDrop={false}
          enableColumnFilters={true}
          enablePagination={true}
          enableColumnVisibility={true}
          getRowId={(row) => row.id}
          pageSize={10}
        />
      </TabsContent>

      <TabsContent
        value="submitted-assignments"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <GenericDataTable
          columns={assignmentColumns}
          data={assignments.filter((a) => a.status === "SUBMITTED")}
          enableRowSelection={true}
          enableDragAndDrop={false}
          enableColumnFilters={true}
          enablePagination={true}
          enableColumnVisibility={true}
          getRowId={(row) => row.id}
          pageSize={10}
        />
      </TabsContent>

      <TabsContent
        value="graded-assignments"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <GenericDataTable
          columns={assignmentColumns}
          data={assignments.filter((a) => a.status === "GRADED")}
          enableRowSelection={true}
          enableDragAndDrop={false}
          enableColumnFilters={true}
          enablePagination={true}
          enableColumnVisibility={true}
          getRowId={(row) => row.id}
          pageSize={10}
        />
      </TabsContent>

      <TabsContent
        value="overdue-assignments"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <GenericDataTable
          columns={assignmentColumns}
          data={assignments.filter((a) => a.status === "OVERDUE")}
          enableRowSelection={true}
          enableDragAndDrop={false}
          enableColumnFilters={true}
          enablePagination={true}
          enableColumnVisibility={true}
          getRowId={(row) => row.id}
          pageSize={10}
        />
      </TabsContent>
    </Tabs>
  );
}
