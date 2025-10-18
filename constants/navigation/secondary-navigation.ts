import { Settings, DollarSign } from "lucide-react";
import { NavItem } from "./types";

export const secondaryNavigation: NavItem[] = [
  {
    title: "Finances",
    url: "/finances/tuition",
    icon: DollarSign,
    items: [
      { title: "Tuition & Fees", url: "/finances/tuition" },
      { title: "Payment History", url: "/finances/payment-history" },
      { title: "Payment Requests", url: "/finances/payments/request" },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "Profile Settings", url: "/settings/general" },
      { title: "Security", url: "/settings/security" },
      { title: "Notifications", url: "/settings/notifications" },
    ],
  },
];
