"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { DataTable as GenericDataTable } from "@/components/shared/tables/data-table";
import { createVirtualClassColumns, VirtualClass } from "@/constants/table-columns/virtual-classes";

interface VirtualClassTableProps {
  classes: VirtualClass[];
  onViewClass: (virtualClass: VirtualClass) => void;
}

export function VirtualClassTable({ classes, onViewClass }: VirtualClassTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Virtual Classes
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Your scheduled virtual class sessions
            </p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Clock className="w-3 h-3" />
            {classes.length} scheduled
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <GenericDataTable
          columns={createVirtualClassColumns(onViewClass)}
          data={classes}
          enableRowSelection={false}
          enableDragAndDrop={false}
          enableColumnFilters={true}
          enablePagination={true}
          enableColumnVisibility={true}
          getRowId={(row) => row.id}
          pageSize={10}
        />
      </CardContent>
    </Card>
  );
}