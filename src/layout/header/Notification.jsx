import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BatteryLow, Bell, BellOff, CheckCheck, CircleHelp, Dot, TriangleAlert } from "lucide-react"
import React, { useState } from "react"

const notifications = [
    {
        id: "notif-001",
        type: "anomaly",
        title: "Voltage spike detected",
        message: "Unit A-03 reported voltage 15% above threshold at sensor #7",
        timestamp: "2025-04-09T10:03:00Z",
        read: true,
    },
    {
        id: "notif-002",
        type: "batteryy",
        title: "Battery critically low",
        message: "Unit B-11 battery at 8% — immediate charging required",
        timestamp: "2025-04-09T09:51:00Z",
        read: false,
    },
    {
        id: "notif-003",
        type: "anomaly",
        title: "Temperature anomaly",
        message: "Rack C-02 thermal sensor reading 78°C — exceeds safe limit",
        timestamp: "2025-04-09T09:05:00Z",
        read: true,
    },
    {
        id: "notif-004",
        type: "battery",
        title: "Battery health degraded",
        message: "Unit D-07 battery capacity reduced to 61% — consider replacement",
        timestamp: "2025-04-09T07:15:00Z",
        read: true,
    },
    {
        id: "notif-005",
        type: "anomaly",
        title: "Signal loss anomaly",
        message: "Node E-15 disconnected unexpectedly — 3 retry attempts failed",
        timestamp: "2025-04-08T22:41:00Z",
        read: true,
    },
    {
        id: "notif-006",
        type: "anomaly",
        title: "Signal loss anomaly",
        message: "Node E-15 disconnected unexpectedly — 3 retry attempts failed",
        timestamp: "2025-04-08T22:41:00Z",
        read: true,
    },
    {
        id: "notif-007",
        type: "anomaly",
        title: "Signal loss anomaly",
        message: "Node E-15 disconnected unexpectedly — 3 retry attempts failed",
        timestamp: "2025-04-08T22:41:00Z",
        read: false,
    },
    {
        id: "notif-008",
        type: "anomaly",
        title: "Signal loss anomaly",
        message: "Node E-15 disconnected unexpectedly — 3 retry attempts failed",
        timestamp: "2025-04-08T22:41:00Z",
        read: true,
    },
    {
        id: "notif-009",
        type: "anomaly",
        title: "Signal loss anomaly",
        message: "Node E-15 disconnected unexpectedly — 3 retry attempts failed",
        timestamp: "2025-04-08T22:41:00Z",
        read: true,
    },
    {
        id: "notif-010",
        type: "anomaly",
        title: "Signal loss anomaly",
        message: "Node E-15 disconnected unexpectedly — 3 retry attempts failed",
        timestamp: "2025-04-08T22:41:00Z",
        read: true,
    },
    {
        id: "notif-011",
        type: "anomaly",
        title: "Signal loss anomaly",
        message: "Node E-15 disconnected unexpectedly — 3 retry attempts failed",
        timestamp: "2025-04-08T22:41:00Z",
        read: true,
    },
]

const LIMIT = 5

const Notification = (props) => {
    const [notificationData, setNotificationData] = useState(notifications)
    const [visibleCount, setVisibleCount] = useState(LIMIT)

    const unreadCount = notificationData.filter((n) => !n.read).length
    const visibleData = notificationData.slice(0, visibleCount)
    const hasMore = visibleCount < notificationData.length

    const handleScroll = (e) => {
        const el = e.currentTarget
        const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10
        if (nearBottom && hasMore) {
            setVisibleCount((prev) => prev + LIMIT)
        }
    }

    const markAsRead = (id) => {
        setNotificationData((prev) =>
            prev.map((n) => n.id === id ? { ...n, read: true } : n)
        )
    }

    const markAllAsRead = () => {
        setNotificationData((prev) => prev.map((n) => ({ ...n, read: true })))
    }

    const mapIcon = (type) => {
        switch (type) {
            case "battery":
                return (
                    <div className="bg-red-500/20 p-2 rounded-xl">
                        <BatteryLow size={18} className="text-red-500" />
                    </div>
                )
            case "anomaly":
                return (
                    <div className="bg-yellow-500/20 p-2 rounded-xl">
                        <TriangleAlert size={18} className="text-yellow-500" />
                    </div>
                )
            default:
                return (
                    <div className="bg-gray-500/20 p-2 rounded-xl">
                        <CircleHelp size={18} className="text-gray-400" />
                    </div>
                )
        }
    }

    return (
        <Popover onOpenChange={(open) => { if (!open) setVisibleCount(LIMIT) }}>
            <PopoverTrigger asChild>
                <Button className="rounded-full relative" variant="outline" size="icon-sm">
                    <Bell />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="sm:w-100 p-0">
                <PopoverHeader className="flex flex-row items-center justify-between px-4 py-2 border-b">
                    <div className="flex flex-row items-center gap-2">
                        <Bell size={18} />
                        <span className="text-base">Notifications</span>
                    </div>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                tabIndex={-1}
                                disabled={unreadCount === 0}
                                variant="outline"
                                size="icon-sm"
                                onClick={markAllAsRead}
                            >
                                <CheckCheck />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="text-xs font-medium">Mark All as Read</span>
                        </TooltipContent>
                    </Tooltip>
                </PopoverHeader>

                <div
                    onScroll={handleScroll}
                    className="flex flex-col max-h-72 sm:max-h-64 overflow-y-auto scrollbar-minimal pr-1"
                >
                    {notificationData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted-foreground">
                            <BellOff className="opacity-70" />
                            <p className="text-sm">No notifications available</p>
                        </div>
                    ) : (
                        <>
                            {visibleData.map((data) => (
                                <div
                                    key={data.id}
                                    className="flex flex-row gap-2 px-4 py-3 cursor-pointer border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                                    onClick={() => markAsRead(data.id)}
                                >
                                    <div className="flex flex-row gap-4 flex-1 min-w-0">
                                        <div className="flex items-center">
                                            {mapIcon(data.type)}
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-sm font-medium">{data.title}</span>
                                            <p className="text-xs text-muted-foreground">{data.message}</p>
                                            <span className="text-xs text-muted-foreground/60">{data.timestamp}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center">

                                        <span
                                            className={`w-2.5 h-2.5 rounded-full inline-block ${data.read ? "bg-transparent" : "bg-red-500"
                                                }`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {notificationData.length > 0 && (
                    <div className="py-2 border-t">
                        <p className="text-xs text-muted-foreground/60 text-center">
                            Showing notifications from the last 14 days
                        </p>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default Notification