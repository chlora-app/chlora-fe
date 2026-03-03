// import React from "react";
// import PropTypes from "prop-types";
// import { Box, Typography, IconButton } from "@mui/material";
// import Icon from "@mdi/react";
// import { mdiSprout } from "@mdi/js";
// import SmallIcon from "../../../assets/images/SmallIcon.png";

// const SidebarHeader = (props) => {

//     return (
//         <Box
//             className="sidebar-header-container"
//             justifyContent={props.isCollapsed ? "center" : "flex-start"}
//             height={props.heightHeader}
//             px={2}
//             gap={1.5}
//         >
//             {props.isCollapsed ?
//                 (
//                     <img
//                         src={SmallIcon}
//                         alt="Logo"
//                         className="sidebar-header-img"
//                     />) :
//                 (
//                     <>
//                         <Icon path={mdiSprout} size={1} className="sidebar-header-icon" />
//                         <Typography variant="h4" fontWeight={"bold"} lineHeight={1}>
//                             Chlora
//                         </Typography>
//                     </>
//                 )
//             }
//         </Box>
//     )
// }

// export default SidebarHeader

"use client"
import React from "react"
import { SidebarHeader } from "@/components/ui/Sidebar"
import SmallIcon from "@/assets/images/SmallIcon.png"
import { cn } from "@/lib/utils"

export default function AppSidebarHeader({ collapsed }) {
  return (
    <SidebarHeader
      className={cn(
        "flex items-center px-4 h-14 gap-2",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      {collapsed ? (
        <img src={SmallIcon} alt="Logo" className="h-8 w-8" />
      ) : (
        <>
          <img src={SmallIcon} alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-lg">Chlora</span>
        </>
      )}
    </SidebarHeader>
  )
}