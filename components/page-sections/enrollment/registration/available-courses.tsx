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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { RegistrationCourse } from "@/lib/store/api/registration";
import { cn } from "@/lib/utils";
import {
  Plus,
  Users,
  Clock,
  MapPin,
  BookOpen,
  AlertCircle,
  Check,
} from "lucide-react";

interface AvailableCoursesProps {
  courses: RegistrationCourse[];
  isLoading: boolean;
  error: unknown;
  departments: string[];
  coursesCount: {
    total: number;
    available: number;
    full: number;
  };
  searchTerm: string;
  selectedDepartment: string;
  showAvailableOnly: boolean;
  onSearchChange: (term: string) => void;
  onDepartmentChange: (department: string) => void;
  onShowAvailableOnlyChange: (show: boolean) => void;
  onAddCourse: (course: RegistrationCourse) => void;
  isCourseInCart: (courseId: string) => boolean;
  className?: string;
}

export function AvailableCourses({
  courses,
  isLoading,
  error,
  departments,
  coursesCount,
  searchTerm,
  selectedDepartment,
  showAvailableOnly,
  onSearchChange,
  onDepartmentChange,
  onShowAvailableOnlyChange,
  onAddCourse,
  isCourseInCart,
  className,
}: AvailableCoursesProps) {
  const getStatusBadge = (status: RegistrationCourse["status"]) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="secondary" className="text-green-700 bg-green-100">
            Available
          </Badge>
        );
      case "full":
        return <Badge variant="destructive">Full</Badge>;
      case "waitlist":
        return (
          <Badge
            variant="outline"
            className="text-yellow-700 border-yellow-200"
          >
            Waitlist
          </Badge>
        );
      default:
        return null;
    }
  };

  const getEnrollmentDisplay = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    const isNearFull = percentage >= 80;

    return (
      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
        <Users className="h-3 w-3" />
        <span className={cn(isNearFull && "text-orange-600 font-medium")}>
          {current}/{max}
        </span>
        {isNearFull && <AlertCircle className="h-3 w-3 text-orange-600" />}
      </div>
    );
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-destructive">Failed to load courses</p>
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
            <h3 className="text-lg font-semibold">Available Courses</h3>
            <p className="text-sm text-muted-foreground">
              {coursesCount.total} courses • {coursesCount.available} available
              • {coursesCount.full} full
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search courses, codes, or instructors..."
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

            <div className="flex items-center space-x-2">
              <Switch
                id="available-only"
                checked={showAvailableOnly}
                onCheckedChange={onShowAvailableOnlyChange}
              />
              <Label htmlFor="available-only" className="text-sm">
                Available only
              </Label>
            </div>
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
            <p className="text-muted-foreground">No courses found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => {
              const inCart = isCourseInCart(course.id);
              const canAdd = course.status === "available" && !inCart;

              return (
                <div
                  key={course.id}
                  className={cn(
                    "border rounded-lg p-4 transition-all duration-200",
                    course.status === "full" ? "opacity-75" : "hover:shadow-md"
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{course.courseName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {course.courseCode}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {course.credits} credits
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {course.instructor} • {course.department}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-2 ml-4">
                      {getStatusBadge(course.status)}
                      <Button
                        size="sm"
                        onClick={() => onAddCourse(course)}
                        disabled={!canAdd}
                        className={cn(
                          "min-w-[80px]",
                          inCart && "bg-green-600 hover:bg-green-700 text-white"
                        )}
                      >
                        {inCart ? (
                          <>
                            <Check className="h-3 w-3 mr-1" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="h-3 w-3 mr-1" />
                            Add
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
                    {getEnrollmentDisplay(
                      course.currentEnrollment,
                      course.maxCapacity
                    )}
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
