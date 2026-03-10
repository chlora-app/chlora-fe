"use client";
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import SmallIcon from "@/assets/images/SmallIcon.png";
import Brand from "../../assets/images/Brand.png"

const AppSidebarHeader = () => {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    size="lg"
                    className="cursor-default hover:bg-transparent focus-visible:ring-0 active:bg-transparent"
                >
                    <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-start px-2"}`}>
                        {isCollapsed
                            ? <img src={SmallIcon} className="h-7 w-7" />
                            : <div className="flex items-center gap-3">
                                <img src={SmallIcon} className="h-7 w-7" />
                                <span
                                    className="text-xl font-semibold tracking-[0.2em]"
                                    style={{ color: "oklch(0.59 0.117 140.49)" }}
                                >
                                    Chlora
                                </span>
                            </div>
                        }
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default AppSidebarHeader;