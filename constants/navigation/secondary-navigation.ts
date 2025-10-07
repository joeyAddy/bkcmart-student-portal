import { Settings, Building2 } from "lucide-react";
import { NavItem } from "./types";

export const secondaryNavigation: NavItem[] = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "System Settings", url: "/settings/system" },
      { title: "General Settings", url: "/settings/general" },
      { title: "Email Configuration", url: "/settings/email" },
      { title: "Payment Configuration", url: "/settings/payment" },
    ],
  },
  {
    title: "Campus Information",
    url: "/campus",
    icon: Building2,
    items: [
      { title: "Campus Details", url: "/campus/details" },
      { title: "Contact Information", url: "/campus/contact" },
      { title: "Social Media Links", url: "/campus/social" },
    ],
  },
];
