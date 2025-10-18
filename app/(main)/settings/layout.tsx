"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Page } from "@/components/shared/page-template";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsLayoutProps {
  children: ReactNode;
}

const settingsNavigation = [
  {
    id: "general",
    name: "Profile Settings",
    href: "/settings/profile",
    description: "Manage your profile information",
    pageTitle: "Profile Settings",
    pageDescription: "Manage your profile information and personal details",
  },
  {
    id: "security",
    name: "Security",
    href: "/settings/security",
    description: "Password and security settings",
    pageTitle: "Security Settings",
    pageDescription: "Manage your password and security preferences",
  },
  {
    id: "notifications",
    name: "Notifications",
    href: "/settings/notifications",
    description: "Manage notification preferences",
    pageTitle: "Notification Settings",
    pageDescription: "Manage how and when you receive notifications",
  },
];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract the current tab from pathname
  const currentTab = pathname.split("/").pop() || "general";

  // Find the current page info
  const currentPage =
    settingsNavigation.find((item) => item.id === currentTab) ||
    settingsNavigation[0];

  const handleTabChange = (value: string) => {
    router.push(`/settings/${value}`);
  };

  return (
    <Page
      title={currentPage.pageTitle}
      description={currentPage.pageDescription}
    >
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        orientation="vertical"
        className="w-full flex flex-col xl:flex-row xl:gap-8"
      >
        {/* Tabs Navigation */}
        <TabsList className="grid dark:bg-card w-full grid-cols-3 mb-6 xl:mb-0 xl:w-64 xl:flex xl:flex-col xl:h-fit xl:p-2">
          {settingsNavigation.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="xl:w-full xl:justify-start xl:h-auto xl:p-3"
            >
              <div className="xl:text-left">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground mt-1 hidden xl:block">
                  {item.description}
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Content Area */}
        <div className="flex-1">
          {settingsNavigation.map((item) => (
            <TabsContent
              key={item.id}
              value={item.id}
              className="space-y-4 xl:mt-0"
            >
              {currentTab === item.id && children}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </Page>
  );
}
