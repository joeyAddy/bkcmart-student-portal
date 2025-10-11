"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GradeFiltersProps {
  semester: string;
  year: number;
  status: string;
  onSemesterChange: (value: string) => void;
  onYearChange: (value: number) => void;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
}

export function GradeFilters({
  semester,
  year,
  status,
  onSemesterChange,
  onYearChange,
  onStatusChange,
  onClearFilters,
}: GradeFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <Label className="text-sm font-medium">Filter by:</Label>
        <div className="flex gap-2 flex-wrap">
          <Select value={semester} onValueChange={onSemesterChange}>
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
            onValueChange={(value) => onYearChange(parseInt(value))}
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

          <Select value={status} onValueChange={onStatusChange}>
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

      <Button variant="outline" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
}
