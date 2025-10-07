import { baseApi, ApiResponse } from "./base";

// Program-related types based on your actual API response
export interface Program {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  degreeType: "BACHELOR" | "CERTIFICATE" | "DIPLOMA";
  degreeLevel: "UNDERGRADUATE" | "GRADUATE";
  creditHours: number;
  durationMonths: number;
  durationYears: number;
  durationText: string;
  departmentId: string;
  categoryId: string;
  tuitionPerCredit: number;
  tuitionTotal: number;
  currency: string;
  isOnline: boolean;
  isAccredited: boolean;
  deliveryMethod: "HYBRID" | "ASYNCHRONOUS" | "SYNCHRONOUS";
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  media: unknown[]; // Array of media objects
}

// Custom response type for programs (based on your actual API structure)
export interface GetAllProgramsResponse {
  success: boolean;
  data: {
    programs: Program[];
    total: number;
  };
  message: string;
}

export interface CreateProgramRequest {
  name: string;
  shortDescription: string;
  fullDescription?: string;
  degreeType: Program["degreeType"];
  degreeLevel: Program["degreeLevel"];
  creditHours: number;
  durationMonths: number;
  durationYears: number;
  durationText: string;
  departmentId?: string;
  categoryId: string;
  tuitionPerCredit: number;
  tuitionTotal: number;
  currency: string;
  isOnline?: boolean;
  isAccredited?: boolean;
  deliveryMethod: Program["deliveryMethod"];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  status?: Program["status"];
}

export interface UpdateProgramRequest extends Partial<CreateProgramRequest> {
  slug?: string;
}

export interface ProgramsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  degreeType?: Program["degreeType"];
  status?: Program["status"];
  categoryId?: string;
  departmentId?: string;
  sortBy?: "name" | "createdAt" | "creditHours" | "tuition";
  sortOrder?: "asc" | "desc";
}

// Programs API slice
export const programsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all programs with pagination and filters
    getPrograms: builder.query<GetAllProgramsResponse, ProgramsQueryParams>({
      query: (params) => ({
        url: "/programs",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...params,
        },
      }),
      transformResponse: (response: unknown) => {
        try {
          const res = response as Record<string, unknown> | undefined;
          // If backend returns { success: true, data: [] }
          if (res && Array.isArray(res.data)) {
            const programs = res.data as unknown[];
            return {
              success: true,
              data: {
                programs: programs as Program[],
                total: programs.length,
              },
              message: (res.message as string) || "",
            } as GetAllProgramsResponse;
          }
        } catch {
          // ignore and fall through
        }
        return response as GetAllProgramsResponse;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.programs.map(({ id }) => ({
                type: "Program" as const,
                id,
              })),
              { type: "Program", id: "LIST" },
            ]
          : [{ type: "Program", id: "LIST" }],
    }),

    // Get single program by ID
    getProgram: builder.query<ApiResponse<Program>, string>({
      query: (id) => `/programs/${id}`,
      providesTags: (result, error, id) => [{ type: "Program", id }],
    }),

    // Get single program by slug
    getProgramBySlug: builder.query<ApiResponse<Program>, string>({
      query: (slug) => `/programs/slug/${slug}`,
      providesTags: (result) =>
        result ? [{ type: "Program", id: result.data.id }] : [],
    }),

    // Create new program
    createProgram: builder.mutation<ApiResponse<Program>, CreateProgramRequest>(
      {
        query: (programData) => ({
          url: "/programs",
          method: "POST",
          body: programData,
        }),
        invalidatesTags: [{ type: "Program", id: "LIST" }],
      }
    ),

    // Update program
    updateProgram: builder.mutation<
      ApiResponse<Program>,
      { id: string; data: UpdateProgramRequest }
    >({
      query: ({ id, data }) => ({
        url: `/programs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Program", id },
        { type: "Program", id: "LIST" },
      ],
    }),

    // Delete program
    deleteProgram: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/programs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Program", id },
        { type: "Program", id: "LIST" },
      ],
    }),

    // Get programs by category
    getProgramsByCategory: builder.query<ApiResponse<Program[]>, string>({
      query: (categoryId) => `/categories/${categoryId}/programs`,
      providesTags: (result, error, categoryId) => [
        { type: "Program", id: `category-${categoryId}` },
      ],
    }),

    // Get programs by department
    getProgramsByDepartment: builder.query<ApiResponse<Program[]>, string>({
      query: (departmentId) => `/departments/${departmentId}/programs`,
      providesTags: (result, error, departmentId) => [
        { type: "Program", id: `department-${departmentId}` },
      ],
    }),

    // Get program statistics
    getProgramStats: builder.query<
      ApiResponse<{
        totalPrograms: number;
        programsByType: { type: Program["degreeType"]; count: number }[];
        programsByStatus: { status: Program["status"]; count: number }[];
        averageCreditHours: number;
        totalEnrollments: number;
      }>,
      void
    >({
      query: () => "/programs/stats",
      providesTags: [{ type: "Program", id: "STATS" }],
    }),

    // Duplicate program
    duplicateProgram: builder.mutation<
      ApiResponse<Program>,
      { programId: string; updates?: Partial<CreateProgramRequest> }
    >({
      query: ({ programId, updates }) => ({
        url: `/programs/${programId}/duplicate`,
        method: "POST",
        body: updates || {},
      }),
      invalidatesTags: [{ type: "Program", id: "LIST" }],
    }),

    // Archive program (soft delete)
    archiveProgram: builder.mutation<ApiResponse<Program>, string>({
      query: (id) => ({
        url: `/programs/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Program", id },
        { type: "Program", id: "LIST" },
      ],
    }),

    // Bulk update programs
    bulkUpdatePrograms: builder.mutation<
      ApiResponse<{ updated: number; failed: string[] }>,
      { programIds: string[]; updates: UpdateProgramRequest }
    >({
      query: (data) => ({
        url: "/programs/bulk-update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Program", id: "LIST" }],
    }),

    // Get featured programs
    getFeaturedPrograms: builder.query<
      ApiResponse<Program[]>,
      { limit?: number }
    >({
      query: (params) => ({
        url: "/programs/featured",
        params,
      }),
      providesTags: [{ type: "Program", id: "FEATURED" }],
    }),

    // Search programs with advanced filters
    searchPrograms: builder.query<
      GetAllProgramsResponse,
      {
        query: string;
        filters?: {
          degreeTypes?: Program["degreeType"][];
          categories?: string[];
          departments?: string[];
          creditHoursRange?: { min: number; max: number };
          tuitionRange?: { min: number; max: number };
        };
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => ({
        url: "/programs/search",
        method: "POST",
        body: params,
      }),
      providesTags: [{ type: "Program", id: "SEARCH" }],
    }),
  }),
});

// Export generated hooks
export const {
  useGetProgramsQuery,
  useGetProgramQuery,
  useGetProgramBySlugQuery,
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
  useGetProgramsByCategoryQuery,
  useGetProgramsByDepartmentQuery,
  useGetProgramStatsQuery,
  useDuplicateProgramMutation,
  useArchiveProgramMutation,
  useBulkUpdateProgramsMutation,
  useGetFeaturedProgramsQuery,
  useSearchProgramsQuery,
} = programsApi;
