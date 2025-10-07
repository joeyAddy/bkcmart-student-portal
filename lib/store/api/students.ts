import { baseApi, ApiResponse, PaginatedResponse } from "./base";

// Student-related types
export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  enrollmentDate: string;
  status: "active" | "inactive" | "graduated" | "suspended";
  program?: {
    id: string;
    name: string;
    department: string;
  };
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: Student["address"];
  programId?: string;
}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {
  status?: Student["status"];
}

export interface StudentsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: Student["status"];
  programId?: string;
  departmentId?: string;
  sortBy?: "name" | "enrollmentDate" | "studentId";
  sortOrder?: "asc" | "desc";
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  enrollmentDate: string;
  status: "enrolled" | "completed" | "dropped" | "failed";
  grade?: string;
  credits: number;
}

// Students API slice
export const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all students with pagination and filters
    getStudents: builder.query<PaginatedResponse<Student>, StudentsQueryParams>(
      {
        query: (params) => ({
          url: "/students",
          params: {
            page: params.page || 1,
            limit: params.limit || 10,
            ...params,
          },
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({
                  type: "Student" as const,
                  id,
                })),
                { type: "Student", id: "LIST" },
              ]
            : [{ type: "Student", id: "LIST" }],
      }
    ),

    // Get single student by ID
    getStudent: builder.query<ApiResponse<Student>, string>({
      query: (id) => `/students/${id}`,
      providesTags: (result, error, id) => [{ type: "Student", id }],
    }),

    // Create new student
    createStudent: builder.mutation<ApiResponse<Student>, CreateStudentRequest>(
      {
        query: (studentData) => ({
          url: "/students",
          method: "POST",
          body: studentData,
        }),
        invalidatesTags: [{ type: "Student", id: "LIST" }],
      }
    ),

    // Update student
    updateStudent: builder.mutation<
      ApiResponse<Student>,
      { id: string; data: UpdateStudentRequest }
    >({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Student", id },
        { type: "Student", id: "LIST" },
      ],
    }),

    // Delete student
    deleteStudent: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Student", id },
        { type: "Student", id: "LIST" },
      ],
    }),

    // Get student enrollments
    getStudentEnrollments: builder.query<
      ApiResponse<StudentEnrollment[]>,
      string
    >({
      query: (studentId) => `/students/${studentId}/enrollments`,
      providesTags: (result, error, studentId) => [
        { type: "Student", id: `${studentId}-enrollments` },
      ],
    }),

    // Enroll student in course
    enrollStudentInCourse: builder.mutation<
      ApiResponse<StudentEnrollment>,
      { studentId: string; courseId: string }
    >({
      query: ({ studentId, courseId }) => ({
        url: `/students/${studentId}/enrollments`,
        method: "POST",
        body: { courseId },
      }),
      invalidatesTags: (result, error, { studentId }) => [
        { type: "Student", id: `${studentId}-enrollments` },
        { type: "Course", id: "LIST" },
      ],
    }),

    // Update enrollment status
    updateEnrollmentStatus: builder.mutation<
      ApiResponse<StudentEnrollment>,
      {
        enrollmentId: string;
        status: StudentEnrollment["status"];
        grade?: string;
      }
    >({
      query: ({ enrollmentId, ...data }) => ({
        url: `/enrollments/${enrollmentId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),

    // Bulk operations
    bulkUpdateStudents: builder.mutation<
      ApiResponse<{ updated: number; failed: string[] }>,
      { studentIds: string[]; updates: UpdateStudentRequest }
    >({
      query: (data) => ({
        url: "/students/bulk-update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Student", id: "LIST" }],
    }),

    // Import students from CSV
    importStudents: builder.mutation<
      ApiResponse<{ imported: number; failed: string[] }>,
      FormData
    >({
      query: (formData) => ({
        url: "/students/import",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: [{ type: "Student", id: "LIST" }],
    }),
  }),
});

// Export generated hooks
export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useGetStudentEnrollmentsQuery,
  useEnrollStudentInCourseMutation,
  useUpdateEnrollmentStatusMutation,
  useBulkUpdateStudentsMutation,
  useImportStudentsMutation,
} = studentsApi;
