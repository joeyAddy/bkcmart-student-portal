import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SubNavItem[];
}

export interface SubNavItem {
  title: string;
  url: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export interface NavigationData {
  user: UserData;
  navMain: NavItem[];
  navSections: NavSection[];
  navSecondary: NavItem[];
}
