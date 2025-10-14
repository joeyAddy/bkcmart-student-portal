import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { RegistrationCourse } from "@/lib/store/api/registration";
import { cn } from "@/lib/utils";
import {
  Trash2,
  Users,
  Clock,
  MapPin,
  BookOpen,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface EnrolledCoursesProps {
  courses: RegistrationCourse[];
  isLoading: boolean;
  error: unknown;
  departments: string[];
  coursesCount: {
    total: number;
    fall: number;
    spring: number;
  };
  searchTerm: string;
  selectedDepartment: string;
  selectedSemester: "all" | "fall" | "spring";
  onSearchChange: (term: string) => void;
  onDepartmentChange: (department: string) => void;
  onSemesterChange: (semester: "all" | "fall" | "spring") => void;
  onDropCourse: (course: RegistrationCourse) => void;
  isInDropCart: (courseId: string) => boolean;
  className?: string;
}

export function EnrolledCourses({
  courses,
  isLoading,
  error,
  departments,
  coursesCount,
  searchTerm,
  selectedDepartment,
  selectedSemester,
  onSearchChange,
  onDepartmentChange,
  onSemesterChange,
  onDropCourse,
  isInDropCart,
  className,
}: EnrolledCoursesProps) {
  const getCreditsBadge = (credits: number) => {
    return (
      <Badge variant="outline" className="text-xs">
        {credits} credit{credits !== 1 ? "s" : ""}
      </Badge>
    );
  };

  const getSemesterBadge = (semester: string) => {
    const colors = {
      fall: "bg-orange-100 text-orange-700",
      spring: "bg-green-100 text-green-700",
    };

    return (
      <Badge
        variant="secondary"
        className={cn(
          "text-xs capitalize",
          colors[semester as keyof typeof colors]
        )}
      >
        {semester}
      </Badge>
    );
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-destructive">Failed to load enrolled courses</p>
            <p className="text-sm text-muted-foreground">
              Please try again later
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold">Enrolled Courses</h3>
            <p className="text-sm text-muted-foreground">
              {coursesCount.total} course{coursesCount.total !== 1 ? "s" : ""} •{" "}
              {coursesCount.fall} fall • {coursesCount.spring} spring
            </p>
          </div>
          <Badge variant="secondary" className="w-fit">
            <CheckCircle className="h-3 w-3 mr-1" />
            Enrolled
          </Badge>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search enrolled courses, codes, or instructors..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={selectedDepartment}
              onValueChange={onDepartmentChange}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSemester} onValueChange={onSemesterChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Semesters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="fall">Fall Semester</SelectItem>
                <SelectItem value="spring">Spring Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-9 w-20" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <div className="flex space-x-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No enrolled courses found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => {
              const inDropCart = isInDropCart(course.id);

              return (
                <div
                  key={course.id}
                  className={cn(
                    "border rounded-lg p-4 transition-all duration-200",
                    inDropCart && "border-red-300 bg-red-50/50",
                    !inDropCart && "hover:shadow-md"
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1 flex-wrap">
                        <h4 className="font-medium">{course.courseName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {course.courseCode}
                        </Badge>
                        {getCreditsBadge(course.credits)}
                        {getSemesterBadge(course.semester)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {course.instructor} • {course.department}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <Button
                        size="sm"
                        variant={inDropCart ? "default" : "destructive"}
                        onClick={() => onDropCourse(course)}
                        className={cn(
                          "min-w-[100px]",
                          inDropCart && "bg-red-600 hover:bg-red-700 text-white"
                        )}
                      >
                        {inDropCart ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" /> Marked
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-3 w-3 mr-1" />
                            Drop
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {course.schedule.days.join(", ")} •{" "}
                        {course.schedule.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{course.schedule.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>
                        {course.currentEnrollment}/{course.maxCapacity}
                      </span>
                    </div>
                  </div>

                  {course.prerequisites && course.prerequisites.length > 0 && (
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        <strong>Prerequisites:</strong>{" "}
                        {course.prerequisites.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
