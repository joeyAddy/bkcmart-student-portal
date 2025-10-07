import { baseApi, ApiResponse } from "./base";

export interface Department {
  id: string;
  name: string;
  slug?: string;
  code?: string;
  description?: string | null;
  dean?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  programs?: Array<{
    id: string;
    slug: string;
    name: string;
    shortDescription?: string | null;
    fullDescription?: string | null;
    degreeType?: string | null;
    degreeLevel?: string | null;
    creditHours?: number | null;
    durationMonths?: number | null;
    durationYears?: number | null;
    durationText?: string | null;
    departmentId?: string | null;
    categoryId?: string | null;
    tuitionPerCredit?: number | null;
    tuitionTotal?: number | null;
    currency?: string | null;
    isOnline?: boolean | null;
    isAccredited?: boolean | null;
    deliveryMethod?: string | null;
    status?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
  }>;
  staff?: Array<Record<string, unknown>>;
  _count?: {
    programs: number;
    staff: number;
  };
  createdAt: string;
  updatedAt: string;
}

// A compact type for table rows: only the fields we display in the table
export type DepartmentTableRow = Pick<
  Department,
  "id" | "name" | "dean" | "email" | "phone" | "status" | "_count"
>;

// Backend returns { success, message, data: Department[] , pagination }
export interface GetAllDepartmentsResponse {
  success: boolean;
  data: Department[]; // array of departments
  message: string;
  pagination?: {
    current: number;
    total: number;
    count: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreateDepartmentRequest {
  name: string;
  code?: string;
  description?: string;
}

export const departmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<
      GetAllDepartmentsResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: "/departments",
        params: { page: params?.page ?? 1, limit: params?.limit ?? 50 },
      }),
      // Normalize legacy responses where `data` is an array
      transformResponse: (response: unknown) => {
        try {
          const res = response as Record<string, unknown> | undefined;
          if (res && Array.isArray(res.data)) {
            const deps = res.data as unknown[];
            return {
              success: true,
              data: deps as Department[],
              message: (res.message as string) || "",
            } as GetAllDepartmentsResponse;
          }
        } catch {
          // ignore
        }
        return response as GetAllDepartmentsResponse;
      },
      providesTags: (result) => {
        const deps = Array.isArray(result?.data) ? result.data : [];
        return [
          ...deps.map((d) => ({ type: "Department" as const, id: d.id })),
          { type: "Department", id: "LIST" },
        ];
      },
    }),

    getDepartment: builder.query<ApiResponse<Department>, string>({
      query: (id) => `/departments/${id}`,
      providesTags: (result, error, id) => [{ type: "Department", id }],
    }),

    createDepartment: builder.mutation<
      ApiResponse<Department>,
      CreateDepartmentRequest
    >({
      query: (data) => ({ url: "/departments", method: "POST", body: data }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),

    updateDepartment: builder.mutation<
      ApiResponse<Department>,
      { id: string; data: Partial<CreateDepartmentRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/departments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Department", id },
        { type: "Department", id: "LIST" },
      ],
    }),

    deleteDepartment: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/departments/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, id) => [
        { type: "Department", id },
        { type: "Department", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApi;
