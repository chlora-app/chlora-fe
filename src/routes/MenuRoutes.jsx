import LazyLoadRoutes from "./LazyLoadRoutes";
import {
    LayoutDashboard,
    Layers,
    ClipboardList,
    Headset,
    CircleAlert
} from "lucide-react"

const MenuRoutes = [
    {
        path: "/app001/dashboard",
        text: "Dashboard",
        icon: LayoutDashboard,
        component: LazyLoadRoutes(() => import("../pages/app001/Dashboard")),
        section: "main"
    },
    {
        text: "Master Data",
        icon: Layers,
        section: "main",
        sub: [
            { path: "/app002/master/users", text: "Master User", component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")) },
            { path: "/app003/master/clusters", text: "Master Cluster", component: LazyLoadRoutes(() => import("../pages/app003/MasterCluster")) },
            { path: "/app004/master/devices", text: "Master Device", component: LazyLoadRoutes(() => import("../pages/app004/MasterDevice")) },
        ],
    },
    {
        text: "Reports",
        icon: ClipboardList,
        section: "main",
        sub: [
            { path: "/reports/table", text: "Table Report", component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")), },
            { path: "/reports/graph", text: "Graph Report", component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")), },
        ],
    },
    {
        text: "Support",
        path: "/support",
        icon: Headset,
        section: "footer",
        component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")),
    },
    {
        text: "About",
        path: "/about",
        icon: CircleAlert,
        section: "footer",
        component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")),
    },

]

export default MenuRoutes;
