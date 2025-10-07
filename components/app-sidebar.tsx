"use client";

import * as React from "react";

import { NavSecondary } from "@/components/nav-secondary";
import { NavSections } from "@/components/nav-sections";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navigationData } from "@/constants/navigation";
import Image from "next/image";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-fit"
            >
              <a href="/dashboard">
                <Image
                  src="/assets/images/logo.jpeg"
                  alt="Logo"
                  width={45}
                  height={45}
                />
                <div className="flex flex-col max-w-3xs">
                  <span className="text-xs font-bold text-gray-900 leading-tight">
                    BK COLLEGE OF MODERN ART AND TECHNOLOGY
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSections sections={navigationData.navSections} />
        <NavSecondary items={navigationData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
