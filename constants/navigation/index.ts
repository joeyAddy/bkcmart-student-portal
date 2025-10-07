import { NavigationData } from "./types";
import { mainNavigation } from "./main-navigation";
import { sectionNavigation } from "./section-navigation";
import { secondaryNavigation } from "./secondary-navigation";
import { userData } from "./user-data";

export const navigationData: NavigationData = {
  user: userData,
  navMain: mainNavigation,
  navSections: sectionNavigation,
  navSecondary: secondaryNavigation,
};

// Export individual sections for flexibility
export { mainNavigation } from "./main-navigation";
export { sectionNavigation } from "./section-navigation";
export { secondaryNavigation } from "./secondary-navigation";
export { userData } from "./user-data";
export * from "./types";
