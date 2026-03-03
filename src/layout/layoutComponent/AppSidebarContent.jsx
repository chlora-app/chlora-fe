"use client"
import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import MenuRoutes from "@/routes/MenuRoutes"
import { ChevronRight } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const AppSidebarContent = () => {
    const mainMenu = MenuRoutes.filter(menu => menu.section == "main")
    const otherMenu = MenuRoutes.filter(menu => menu.section == "others")
    const location = useLocation()
    const [openMenu, setOpenMenu] = useState(null)

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarMenu>
                {mainMenu.map((item) => {
                    const hasChild = item?.sub?.length > 0
                    return hasChild ? (
                        <Collapsible
                            key={item.title}
                            open={openMenu === item.title}
                            onOpenChange={(open) => setOpenMenu(open ? item.title : null)}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.sub?.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.path}>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={location.pathname === subItem.path}
                                                >
                                                    <Link to={subItem.path}>
                                                        {subItem.title}
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                isActive={location.pathname === item.path}
                            >
                                <Link to={item.path}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>

            <SidebarGroupLabel>Others</SidebarGroupLabel>
            {otherMenu.map((item) => {
                return (
                    <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                            asChild
                            tooltip={item.title}
                            isActive={location.pathname === item.path}
                        >
                            <Link to={item.path}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            })}
        </SidebarGroup>
    )
}
export default AppSidebarContent