"use client";
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import SmallIcon from "@/assets/images/SmallIcon.png";
import { Sprout } from "lucide-react";

const AppSidebarHeader = () => {
    const { state: sidebarState } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                    <div>
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <Sprout className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-lg leading-tight">
                            <span className="truncate font-xl">Chlora</span>
                        </div>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default AppSidebarHeader;