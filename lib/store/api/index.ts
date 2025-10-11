// Export base API configuration
export * from "./base";

// Export feature-specific API slices
export * from "./auth";
export * from "./students";
export * from "./courses";
export * from "./programs";
export * from "./departments";
export * from "./assignments";
export * from "./materials";
export * from "./discussions";
export * from "./grades";
export * from "./registration";

// Re-export the base API for store configuration
export { baseApi } from "./base";
