"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable as GenericDataTable } from "@/components/shared/tables/data-table";
import { createRecordedClassColumns } from "@/constants/table-columns/recorded-classes";
import { RecordedClass } from "../types";

interface RecordedClassTableProps {
  classes: RecordedClass[];
}

export function RecordedClassTable({ classes }: RecordedClassTableProps) {
  const router = useRouter();

  const handleNavigateToRecording = (recordingId: string) => {
    router.push(`/courses/virtual/recorded/${recordingId}`);
  };

  const columns = createRecordedClassColumns(handleNavigateToRecording);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Recorded Classes
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Watch recorded class sessions and download lecture materials
            </p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Clock className="w-3 h-3" />
            {classes.length} recordings
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <GenericDataTable
          columns={columns}
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
