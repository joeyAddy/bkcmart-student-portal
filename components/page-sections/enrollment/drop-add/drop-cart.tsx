import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RegistrationCourse } from "@/lib/store/api/registration";
import { X, Clock, MapPin, Trash2, AlertTriangle } from "lucide-react";

interface DropCartProps {
  fallCourses: RegistrationCourse[];
  springCourses: RegistrationCourse[];
  onRemoveCourse: (courseId: string, semester: "fall" | "spring") => void;
  onClearSemester: (semester: "fall" | "spring") => void;
  onClearAll: () => void;
  className?: string;
}

interface SemesterSectionProps {
  title: string;
  semester: "fall" | "spring";
  courses: RegistrationCourse[];
  onRemoveCourse: (courseId: string, semester: "fall" | "spring") => void;
  onClearSemester: (semester: "fall" | "spring") => void;
}

function SemesterSection({
  title,
  semester,
  courses,
  onRemoveCourse,
  onClearSemester,
}: SemesterSectionProps) {
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h4 className="font-medium">{title}</h4>
          <Badge variant="outline">
            {courses.length} course{courses.length !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="destructive" className="text-xs">
            -{totalCredits} credit{totalCredits !== 1 ? "s" : ""}
          </Badge>
        </div>
        {courses.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onClearSemester(semester)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear List
          </Button>
        )}
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          <Trash2 className="h-6 w-6 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No courses marked for {semester}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border border-red-200 bg-red-50/50 rounded-lg p-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-sm">{course.courseName}</h5>
                    <Badge variant="outline" className="text-xs">
                      {course.courseCode}
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                      -{course.credits} credits
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {course.instructor} • {course.department}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveCourse(course.id, semester)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DropCart({
  fallCourses,
  springCourses,
  onRemoveCourse,
  onClearSemester,
  onClearAll,
  className,
}: DropCartProps) {
  const totalCourses = fallCourses.length + springCourses.length;
  const totalCredits =
    fallCourses.reduce((sum, course) => sum + course.credits, 0) +
    springCourses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Drop List</h3>
            <p className="text-sm text-muted-foreground">
              {totalCourses} course{totalCourses !== 1 ? "s" : ""} •{" "}
              {totalCredits} credit{totalCredits !== 1 ? "s" : ""} to drop
            </p>
          </div>
          {totalCourses > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/30"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear List
            </Button>
          )}
        </div>

        {totalCourses > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-orange-800 text-sm mb-1">
                  Courses Marked for Drop
                </h4>
                <p className="text-xs text-orange-700">
                  These courses will be dropped when you submit your changes.
                  Make sure to review carefully.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <SemesterSection
          title="Fall Semester"
          semester="fall"
          courses={fallCourses}
          onRemoveCourse={onRemoveCourse}
          onClearSemester={onClearSemester}
        />

        <Separator />

        <SemesterSection
          title="Spring Semester"
          semester="spring"
          courses={springCourses}
          onRemoveCourse={onRemoveCourse}
          onClearSemester={onClearSemester}
        />
      </CardContent>
    </Card>
  );
}
