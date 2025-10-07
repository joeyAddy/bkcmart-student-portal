import { baseApi } from "./base";

export interface ApplicationSummary {
  id: string;
  reference?: string;
  applicant: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  };
  program: { id: string; name: string; slug?: string } | null;
  appliedAt: string;
  status:
    | "PENDING"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REJECTED"
    | "WAITLISTED"
    | "WITHDRAWN"
    | "INCOMPLETE";
  stage?: string;
  paymentStatus?: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  feesPaid?: number;
  submittedDocuments?: string[];
  reviewer?: { id: string; name?: string } | null;
  lastUpdatedAt: string;
  createdAt: string;
}

export interface GetAllApplicationsResponse {
  success: boolean;
  data: {
    applications: ApplicationSummary[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message: string;
}

export interface ApplicationsQueryParams {
  page?: number;
  limit?: number;
  status?: ApplicationSummary["status"];
  search?: string;
}

export const applicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query<
      GetAllApplicationsResponse,
      ApplicationsQueryParams
    >({
      query: (params) => ({
        url: "/applications",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...params,
        },
      }),
      // Normalize server responses that sometimes return `data` as an array
      transformResponse: (response: unknown) => {
        // If backend returns { success: true, data: [] }
        try {
          const res = response as Record<string, unknown> | undefined;
          if (res && Array.isArray(res.data)) {
            const apps = res.data as unknown[];
            return {
              success: true,
              data: {
                applications: apps as ApplicationSummary[],
                pagination: {
                  page: 1,
                  limit: apps.length || 10,
                  total: apps.length,
                  totalPages: 1,
                  hasNext: false,
                  hasPrev: false,
                },
              },
              message: (res.message as string) || "",
            } as GetAllApplicationsResponse;
          }
        } catch {
          // ignore
        }
        return response as GetAllApplicationsResponse;
      },
      providesTags: (result) => {
        // result.data may be either an array (legacy) or an object with applications[]
        if (!result) {
          return [{ type: "Application", id: "LIST" }];
        }
        const appsArray: unknown[] = Array.isArray(result.data)
          ? (result.data as unknown[])
          : (() => {
              const d = result.data as unknown;
              if (d && typeof d === "object") {
                const r = d as Record<string, unknown>;
                if (Array.isArray(r.applications))
                  return r.applications as unknown[];
              }
              return [] as unknown[];
            })();

        const isApp = (x: unknown): x is { id: string } => {
          if (typeof x !== "object" || x === null) return false;
          const r = x as Record<string, unknown>;
          return typeof r["id"] === "string";
        };

        const tags = appsArray.filter(isApp).map((a) => ({
          type: "Application" as const,
          id: a.id,
        }));

        return [...tags, { type: "Application", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetApplicationsQuery } = applicationsApi;
