import { baseApi, ApiResponse } from "./base";

// Auth-related types matching the API response
export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "STUDENT" | "STAFF" | "FACULTY" | "APPLICANT";
  status: "ACTIVE" | "PENDING" | "SUSPENDED" | "INACTIVE";
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  student?: {
    id: string;
    studentId: string;
    program?: string;
    year?: number;
    enrollmentStatus?: string;
  };
  staff?: {
    id: string;
    staffId: string;
    position: string;
    department: string;
  };
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "ADMIN" | "STUDENT" | "STAFF" | "FACULTY" | "APPLICANT";
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordUpdateRequest {
  currentPassword: string;
  newPassword: string;
}

// Auth API slice
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "Profile"],
    }),

    // Register
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Logout
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "Profile"],
    }),

    // Refresh token
    refreshToken: builder.mutation<ApiResponse<{ token: string }>, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    // Get current user profile
    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => "/auth/profile",
      providesTags: ["Profile"],
    }),

    // Update profile
    updateProfile: builder.mutation<ApiResponse<User>, Partial<User>>({
      query: (updates) => ({
        url: "/auth/profile",
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Password reset request
    requestPasswordReset: builder.mutation<
      ApiResponse<null>,
      PasswordResetRequest
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // Update password
    updatePassword: builder.mutation<ApiResponse<null>, PasswordUpdateRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),

    // Reset password using token (from reset email)
    resetPassword: builder.mutation<
      ApiResponse<null>,
      { token: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Verify email
    verifyEmail: builder.mutation<ApiResponse<null>, { token: string }>({
      query: ({ token }) => ({
        url: `/auth/verify-email/${token}`,
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

// Export generated hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useRequestPasswordResetMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} = authApi;
