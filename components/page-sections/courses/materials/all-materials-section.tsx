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
import { materialsColumns } from "@/constants/table-columns/materials";
import {
  useGetCourseMaterialsQuery,
  useGetMaterialStatsQuery,
} from "@/lib/store/api/materials";

export function AllMaterialsSection() {
  const [activeTab, setActiveTab] = useState("all-materials");

  // Get materials data based on active tab
  const { data: materialsData } = useGetCourseMaterialsQuery({
    page: 1,
    limit: 100, // Get all materials for filtering
    type:
      activeTab === "all-materials"
        ? undefined
        : activeTab.replace("-materials", ""),
  });

  // Get material statistics for tab counts
  const { data: statsData } = useGetMaterialStatsQuery();

  const materials = materialsData?.data?.materials || [];
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
            <SelectItem value="all-materials">All Materials</SelectItem>
            <SelectItem value="pdf-materials">PDF Documents</SelectItem>
            <SelectItem value="video-materials">Video Materials</SelectItem>
            <SelectItem value="ebook-materials">E-Books</SelectItem>
            <SelectItem value="presentation-materials">
              Presentations
            </SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="all-materials">All Materials</TabsTrigger>
          <TabsTrigger value="pdf-materials">
            PDFs <Badge variant="secondary">{stats?.pdf || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="video-materials">
            Videos <Badge variant="secondary">{stats?.video || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="ebook-materials">
            E-Books <Badge variant="secondary">{stats?.ebook || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="presentation-materials">
            Presentations
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          {/* Space for future action buttons if needed */}
        </div>
      </div>

      <TabsContent
        value="all-materials"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <GenericDataTable
          columns={materialsColumns}
          data={materials}
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
        value="pdf-materials"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <GenericDataTable
          columns={materialsColumns}
          data={materials.filter((m) => m.type === "PDF")}
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
        value="video-materials"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <GenericDataTable
          columns={materialsColumns}
          data={materials.filter((m) => m.type === "VIDEO")}
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
        value="ebook-materials"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <GenericDataTable
          columns={materialsColumns}
          data={materials.filter((m) => m.type === "EBOOK")}
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
        value="presentation-materials"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <GenericDataTable
          columns={materialsColumns}
          data={materials.filter((m) => m.type === "PRESENTATION")}
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
