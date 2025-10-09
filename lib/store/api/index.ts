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

// You can add more feature slices here as needed:
// export * from "./staff";
// export * from "./departments";
// export * from "./admissions";
// export * from "./payments";
// export * from "./reports";
// export * from "./settings";
// export * from "./communications";

// Re-export the base API for store configuration
export { baseApi } from "./base";
