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
