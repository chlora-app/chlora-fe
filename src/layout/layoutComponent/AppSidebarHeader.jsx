"use client";
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import SmallIcon from "@/assets/images/SmallIcon.png";
import { Sprout } from "lucide-react";

const AppSidebarHeader = () => {
    const { state: sidebarState } = useSidebar();

    return (
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
    );
};

export default AppSidebarHeader;