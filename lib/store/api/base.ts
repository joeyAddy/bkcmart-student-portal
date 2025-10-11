import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";

// Define common API response types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

export interface ApiError {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

// Base API slice with common configuration
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      // Get auth token from state
      const accessToken = (getState() as RootState).auth.accessToken;

      // Set common headers
      headers.set("Content-Type", "application/json");

      // Add auth token if available
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    // Authentication & Users
    "Auth",
    "User",
    "Profile",

    // Academic Management
    "Student",
    "Course",
    "Department",
    "Program",
    "Curriculum",
    "Registration",

    // Admissions
    "Application",
    "Requirement",
    "AdmissionReport",

    // Staff & HR
    "Staff",
    "Role",
    "Department",

    // Campus Management
    "Building",
    "Facility",
    "Resource",
    "Service",

    // Communications
    "Announcement",
    "Notification",
    "BulkMessage",

    // Financial
    "Payment",
    "Transaction",
    "Report",

    // System
    "Setting",
    "Backup",
    "Integration",
  ],
  endpoints: () => ({}),
});

// Export hooks and utilities
export const {
  util: { getRunningQueriesThunk },
} = baseApi;

// Common query options for consistent behavior
export const defaultQueryOptions = {
  // Cache data for 5 minutes by default
  keepUnusedDataFor: 300,
  // Refetch on mount if data is older than 1 minute
  refetchOnMountOrArgChange: 60,
  // Refetch on window focus
  refetchOnFocus: true,
  // Don't refetch on reconnect by default (can be overridden)
  refetchOnReconnect: false,
};
