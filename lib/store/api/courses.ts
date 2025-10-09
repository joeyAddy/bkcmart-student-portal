import { baseApi, ApiResponse, PaginatedResponse } from "./base";

// Course-related types
export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  duration: number; // in weeks
  level: "beginner" | "intermediate" | "advanced";
  status: "active" | "inactive" | "archived";
  departmentId: string;
  department: {
    id: string;
    name: string;
  };
  instructor?: {
    id: string;
    name: string;
    email: string;
  };
  prerequisites: string[]; // course IDs
  schedule?: {
    startDate: string;
    endDate: string;
    timeSlots: {
      day: string;
      startTime: string;
      endTime: string;
      room?: string;
    }[];
  };
  maxStudents?: number;
  currentEnrollment: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseRequest {
  code: string;
  name: string;
  description: string;
  credits: number;
  duration: number;
  level: Course["level"];
  departmentId: string;
  instructorId?: string;
  prerequisites?: string[];
  maxStudents?: number;
  schedule?: Course["schedule"];
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  status?: Course["status"];
}

export interface CoursesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
  instructorId?: string;
  level?: Course["level"];
  status?: Course["status"];
  sortBy?: "name" | "code" | "credits" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface CourseSchedule {
  id: string;
  courseId: string;
  startDate: string;
  endDate: string;
  timeSlots: {
    day: string;
    startTime: string;
    endTime: string;
    room?: string;
  }[];
  room?: string;
  maxStudents?: number;
  currentEnrollment: number;
}

// Courses API slice
export const coursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all courses with pagination and filters
    getCourses: builder.query<PaginatedResponse<Course>, CoursesQueryParams>({
      query: (params) => ({
        url: "/courses",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...params,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Course" as const, id })),
              { type: "Course", id: "LIST" },
            ]
          : [{ type: "Course", id: "LIST" }],
    }),

    // Get single course by ID
    getCourse: builder.query<ApiResponse<Course>, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    // Create new course
    createCourse: builder.mutation<ApiResponse<Course>, CreateCourseRequest>({
      query: (courseData) => ({
        url: "/courses",
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),

    // Update course
    updateCourse: builder.mutation<
      ApiResponse<Course>,
      { id: string; data: UpdateCourseRequest }
    >({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Course", id },
        { type: "Course", id: "LIST" },
      ],
    }),

    // Delete course
    deleteCourse: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Course", id },
        { type: "Course", id: "LIST" },
      ],
    }),

    // Get course schedules
    getCourseSchedules: builder.query<ApiResponse<CourseSchedule[]>, string>({
      query: (courseId) => `/courses/${courseId}/schedules`,
      providesTags: (result, error, courseId) => [
        { type: "Course", id: `${courseId}-schedules` },
      ],
    }),

    // Create course schedule
    createCourseSchedule: builder.mutation<
      ApiResponse<CourseSchedule>,
      {
        courseId: string;
        schedule: Omit<CourseSchedule, "id" | "courseId" | "currentEnrollment">;
      }
    >({
      query: ({ courseId, schedule }) => ({
        url: `/courses/${courseId}/schedules`,
        method: "POST",
        body: schedule,
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Course", id: `${courseId}-schedules` },
        { type: "Course", id: courseId },
      ],
    }),

    // Get course enrollment stats
    getCourseStats: builder.query<
      ApiResponse<{
        totalEnrollments: number;
        completionRate: number;
        averageGrade: number;
        enrollmentTrend: { month: string; count: number }[];
      }>,
      string
    >({
      query: (courseId) => `/courses/${courseId}/stats`,
      providesTags: (result, error, courseId) => [
        { type: "Course", id: `${courseId}-stats` },
      ],
    }),

    // Duplicate course
    duplicateCourse: builder.mutation<
      ApiResponse<Course>,
      { courseId: string; updates?: Partial<CreateCourseRequest> }
    >({
      query: ({ courseId, updates }) => ({
        url: `/courses/${courseId}/duplicate`,
        method: "POST",
        body: updates || {},
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),

    // Archive course
    archiveCourse: builder.mutation<ApiResponse<Course>, string>({
      query: (id) => ({
        url: `/courses/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Course", id },
        { type: "Course", id: "LIST" },
      ],
    }),

    // Get courses by department
    getCoursesByDepartment: builder.query<ApiResponse<Course[]>, string>({
      query: (departmentId) => `/departments/${departmentId}/courses`,
      providesTags: (result, error, departmentId) => [
        { type: "Course", id: `department-${departmentId}` },
      ],
    }),
  }),
});

// Export generated hooks
export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetCourseSchedulesQuery,
  useCreateCourseScheduleMutation,
  useGetCourseStatsQuery,
  useDuplicateCourseMutation,
  useArchiveCourseMutation,
  useGetCoursesByDepartmentQuery,
} = coursesApi;

// Additional types for student course enrollment
export interface StudentCourse {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  status: "ENROLLED" | "IN_PROGRESS" | "COMPLETED" | "DROPPED";
  grade?: string;
  progress: number;
  schedule: {
    days: string[];
    time: string;
    location: string;
  };
  semester: string;
  year: number;
  category: string;
  enrollmentDate: string;
  nextAssignment?: {
    title: string;
    dueDate: string;
  };
}

// Mock student courses data
const mockStudentCoursesData: StudentCourse[] = [
  {
    id: "1",
    code: "CS101",
    name: "Introduction to Computer Science",
    instructor: "Dr. Sarah Johnson",
    credits: 3,
    status: "IN_PROGRESS",
    grade: "A-",
    progress: 75,
    schedule: {
      days: ["Mon", "Wed", "Fri"],
      time: "9:00 AM - 10:30 AM",
      location: "Zoom Meeting ID: 123-456-789",
    },
    semester: "Fall",
    year: 2025,
    category: "Computer Science",
    enrollmentDate: "2025-08-15",
    nextAssignment: {
      title: "Binary Search Algorithm Implementation",
      dueDate: "Oct 15, 2025",
    },
  },
  {
    id: "2",
    code: "MATH201",
    name: "Calculus II",
    instructor: "Prof. Michael Chen",
    credits: 4,
    status: "IN_PROGRESS",
    progress: 60,
    schedule: {
      days: ["Tue", "Thu"],
      time: "2:00 PM - 3:30 PM",
      location: "Google Meet: meet.google.com/abc-defg-hij",
    },
    semester: "Fall",
    year: 2025,
    category: "Mathematics",
    enrollmentDate: "2025-08-15",
    nextAssignment: {
      title: "Integration by Parts Problem Set",
      dueDate: "Oct 12, 2025",
    },
  },
  {
    id: "3",
    code: "ENG102",
    name: "Academic Writing",
    instructor: "Dr. Emily Rodriguez",
    credits: 3,
    status: "IN_PROGRESS",
    grade: "B+",
    progress: 85,
    schedule: {
      days: ["Mon", "Wed"],
      time: "11:00 AM - 12:30 PM",
      location: "Microsoft Teams: teams.microsoft.com/l/meetup-join/...",
    },
    semester: "Fall",
    year: 2025,
    category: "English",
    enrollmentDate: "2025-08-15",
    nextAssignment: {
      title: "Research Paper Draft",
      dueDate: "Oct 20, 2025",
    },
  },
  {
    id: "4",
    code: "HIST105",
    name: "World History I",
    instructor: "Prof. David Thompson",
    credits: 3,
    status: "ENROLLED",
    progress: 45,
    schedule: {
      days: ["Tue", "Thu"],
      time: "10:00 AM - 11:30 AM",
      location: "Virtual Classroom: campus.edu/virtual-room-150",
    },
    semester: "Fall",
    year: 2025,
    category: "History",
    enrollmentDate: "2025-09-01",
    nextAssignment: {
      title: "Ancient Civilizations Essay",
      dueDate: "Oct 18, 2025",
    },
  },
  {
    id: "5",
    code: "BIO110",
    name: "General Biology",
    instructor: "Dr. Lisa Park",
    credits: 4,
    status: "COMPLETED",
    grade: "A",
    progress: 100,
    schedule: {
      days: ["Mon", "Wed", "Fri"],
      time: "1:00 PM - 2:30 PM",
      location: "Zoom Meeting ID: 987-654-321",
    },
    semester: "Spring",
    year: 2025,
    category: "Biology",
    enrollmentDate: "2025-01-15",
  },
  {
    id: "6",
    code: "PHYS201",
    name: "Physics I",
    instructor: "Prof. Robert Kim",
    credits: 4,
    status: "DROPPED",
    progress: 30,
    schedule: {
      days: ["Tue", "Thu"],
      time: "8:00 AM - 9:30 AM",
      location: "Discord Server: discord.gg/physics-class",
    },
    semester: "Fall",
    year: 2025,
    category: "Physics",
    enrollmentDate: "2025-08-15",
  },
];

// Mock API hook for student courses
export function useGetStudentCoursesQuery(params: {
  page: number;
  limit: number;
}) {
  const isLoading = false;
  const isError = false;
  const error = null;

  const { page, limit } = params;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCourses = mockStudentCoursesData.slice(startIndex, endIndex);

  const data = {
    data: {
      courses: paginatedCourses,
      pagination: {
        page,
        limit,
        total: mockStudentCoursesData.length,
        totalPages: Math.ceil(mockStudentCoursesData.length / limit),
      },
    },
  };

  return {
    data,
    isLoading,
    isError,
    error,
  };
}
