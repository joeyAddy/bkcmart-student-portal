"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/tables/data-table";
import { catalogCoursesColumns } from "./catalog-courses-columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutGrid, Table, Search } from "lucide-react";
import { CatalogCourse } from "./catalog-courses-columns";

// Mock course data
const mockCourses: CatalogCourse[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    instructor: "Dr. Sarah Johnson",
    credits: 3,
    level: "undergraduate",
    status: "active",
    currentEnrollment: 45,
    maxCapacity: 50,
    department: "Computer Science",
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Advanced Calculus",
    instructor: "Prof. Michael Chen",
    credits: 4,
    level: "undergraduate",
    status: "active",
    currentEnrollment: 32,
    maxCapacity: 35,
    department: "Mathematics",
  },
  {
    id: "3",
    courseCode: "ENG150",
    courseName: "Academic Writing",
    instructor: "Dr. Emily Rodriguez",
    credits: 3,
    level: "undergraduate",
    status: "active",
    currentEnrollment: 50,
    maxCapacity: 50,
    department: "English",
  },
  {
    id: "4",
    courseCode: "CS501",
    courseName: "Advanced Data Structures",
    instructor: "Dr. James Wilson",
    credits: 4,
    level: "graduate",
    status: "active",
    currentEnrollment: 18,
    maxCapacity: 25,
    department: "Computer Science",
  },
];

export function CourseCatalogSection() {
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses based on search term
  const filteredCourses = mockCourses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
       

        {/* View toggle */}
        <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg">
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            <Table className="h-4 w-4 mr-2" />
            Table
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Grid
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCourses.length} of {mockCourses.length} courses
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        <DataTable columns={catalogCoursesColumns} data={filteredCourses} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-6 border rounded-lg bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{course.courseCode}</h3>
                <span className="text-sm text-muted-foreground">
                  {course.credits} credits
                </span>
              </div>
              <h4 className="font-semibold mb-2 line-clamp-2">
                {course.courseName}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Instructor: {course.instructor}
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm">
                  Enrollment: {course.currentEnrollment}/{course.maxCapacity}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{
                      width: `${
                        (course.currentEnrollment / course.maxCapacity) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {course.level === "undergraduate" ? "Undergrad" : "Graduate"}
                </span>
                <Button size="sm" className="text-xs">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
