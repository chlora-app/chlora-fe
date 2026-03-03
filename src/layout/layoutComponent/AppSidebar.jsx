"use client";
import React from "react";
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"; // path Shadcn
import MenuRoutes from "@/routes/MenuRoutes";
import { Link } from "react-router-dom";
import SmallIcon from "../../assets/images/SmallIcon.png"
import { Sprout } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

import AppSidebarHeader from "./AppSidebarHeader";

const AppSidebar = () => {
    const { state: sidebarState } = useSidebar();

    return (
        <Sidebar collapsible="icon" side="left" variant="sidebar">
            <SidebarHeader>
                <div className="p-4 border-b border-gray-200">
                    {sidebarState === "collapsed" ? (
                        <img src={SmallIcon} alt="Logo" className="w-6 h-6 mx-auto" />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Sprout className="w-6 h-6 text-green-600" />
                            <span className="text-xl font-bold">Chlora</span>
                        </div>
                    )}
                </div>
            </SidebarHeader>

            {/* Main Menu */}
            {/* <SidebarContent>
                    <SidebarMenu>
                        {MenuRoutes.filter(item => item.section === "main").map((item) => (
                            <SidebarMenuItem key={item.path}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.text}
                                >
                                    <Link to={item.path}>{item.text}</Link>
                                </SidebarMenuButton>

                                {item.sub?.length > 0 && (
                                    <SidebarMenu>
                                        {item.sub.map((sub) => (
                                            <SidebarMenuItem key={sub.path}>
                                                <SidebarMenuButton asChild tooltip={sub.text}>
                                                    <Link to={sub.path}>{sub.text}</Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                )}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent> */}

            {/* Footer Menu */}
            {/* <SidebarContent>
                    <SidebarMenu>
                        {MenuRoutes.filter(item => item.section === "footer").map((item) => (
                            <SidebarMenuItem key={item.path}>
                                <SidebarMenuButton asChild tooltip={item.text}>
                                    <Link to={item.path}>{item.text}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent> */}
        </Sidebar>
    );
};

export default AppSidebar;