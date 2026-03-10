"use client";
import React from "react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

import AppSidebarHeader from "./AppSidebarHeader";
import AppSidebarContent from "./AppSidebarContent";
import AppSidebarFooter from "./AppSidebarFooter";

const AppSidebar = (props) => {
    return (
        <Sidebar collapsible="icon" side="left" variant="sidebar">
            <SidebarHeader>
                <AppSidebarHeader />
            </SidebarHeader>

            <SidebarContent>
                <AppSidebarContent />
            </SidebarContent>

            <SidebarFooter>
                <AppSidebarFooter userData={props.userData} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};

export default AppSidebar;