import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BatteryLow, Bell, BellOff, CheckCheck, TriangleAlert } from "lucide-react"
import React, { useCallback, useEffect, useState, useRef } from "react"
import { getNotication, subscribeNotificationSse, updateNotificationAll, updateNotificationOne } from "@/utils/ListApi";
import { ToasterCustom } from "@/components/common/ToasterCustom";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_NOTIF_SHOW = 5

const Notification = (props) => {
    // -------------------- Declare All State -------------------- //
    const notifIsOpenRef = useRef(false)
    const [notificationData, setNotificationData] = useState([])
    const [notificationUnread, setNotificationUnread] = useState(0)
    const [notificationVisibleCount, setNotificationVisibleCount] = useState(DEFAULT_NOTIF_SHOW)
    const notificationDataVisible = notificationData.slice(0, notificationVisibleCount)
    const hasMoreNotification = notificationVisibleCount < notificationData.length
    const [flagHasOpened, setFlagHasOpened] = useState(false)
    const [flagLoadingNotif, setFlagLoadingNotif] = useState(false)
    // -------------------- Declare All State -------------------- //

    // -------------------- Fetch API -------------------- //
    // If hasn't opened only takes notification badge count else takes all list and badge
    const fetchNotification = useCallback(async () => {
        try {
            const response = await getNotication()
            const notifications = response?.data?.notifications ?? []
            setNotificationData(notifications)
            setNotificationUnread(notifications.filter((data) => !data.isRead).length)
        } catch (error) {
            ToasterCustom.error("System is unavailable, please try again later.")
        }
    }, [])
    // -------------------- Fetch API -------------------- //

    // -------------------- Hit API On First Render -------------------- //
    useEffect(() => {
        fetchNotification()
    }, [])
    // -------------------- Hit API On First Render -------------------- //

    // -------------------- Listen SSE Subscribe Notification -------------------- //
    useEffect(() => {
        const eventSource = subscribeNotificationSse()
        eventSource.addEventListener("notification", (event) => {
            try {
                const jsonResponse = JSON.parse(event.data)
                setNotificationUnread(jsonResponse?.unreadCount ?? 0)
                if (jsonResponse?.notification) {
                    ToasterCustom.info(jsonResponse?.notification?.message, {
                        icon: jsonResponse?.notification?.notificationType === "BATTERY"
                            ? <BatteryLow size={16} className="text-red-500" />
                            : <TriangleAlert size={16} className="text-yellow-500" />
                    })
                    if (notifIsOpenRef.current) {
                        setNotificationData(prev => {
                            const exists = prev.some(n => n.id === jsonResponse?.notification?.id)
                            if (exists) return prev
                            return [jsonResponse.notification, ...prev]
                        })
                    }
                }
            }
            catch (error) {
                console.log(error)
            }
        })
        eventSource.onerror = (error) => console.log(error)
        return () => eventSource.close()
    }, [])
    // -------------------- Listen SSE Subscribe Notification -------------------- //

    // -------------------- Open Modal and Load List Notif With Timer 500ms for Skeleton -------------------- //
    const handleOpenChange = async (open) => {
        if (open) {
            if (!flagHasOpened) {
                setFlagLoadingNotif(true)
                try {
                    await Promise.all([
                        fetchNotification(),
                        new Promise(res => setTimeout(res, 500))
                    ])
                    setFlagHasOpened(true)
                } finally {
                    setFlagLoadingNotif(false)
                }
            } else {
                await fetchNotification()
            }
        } else {
            setNotificationVisibleCount(DEFAULT_NOTIF_SHOW)
        }
    }
    // -------------------- Open Modal and Load List Notif With Timer 500ms for Skeleton -------------------- //

    // -------------------- Effect Render Per 5 Items -------------------- //
    const handleScrollData = (e) => {
        const nearBottom = e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight - 10
        if (nearBottom && hasMoreNotification) {
            setNotificationVisibleCount((prev) => prev + DEFAULT_NOTIF_SHOW)
        }
    }
    // -------------------- Effect Render Per 5 Items -------------------- //

    // -------------------- Read Each Notification -------------------- //
    const handleReadNotif = useCallback(async (param) => {
        if (param.isRead) return

        setNotificationData((prev) =>
            prev.map((data) => data.id === param.id ? { ...data, isRead: true } : data)
        )
        setNotificationUnread((prev) => prev - 1)

        try {
            await updateNotificationOne(param.id)
        } catch (error) {
            setNotificationData((prev) =>
                prev.map((data) => data.id === param.id ? { ...data, isRead: false } : data)
            )
            setNotificationUnread((prev) => prev + 1)
            ToasterCustom.error("Failed to read notification.")
        }
    }, [])
    // -------------------- Read Each Notification -------------------- //

    // -------------------- Read All Notification -------------------- //
    const handleReadAllNotif = useCallback(async () => {
        const previousData = notificationData
        const previousUnread = notificationUnread
        setNotificationData((prev) => prev.map((data) => ({ ...data, isRead: true })))
        setNotificationUnread(0)

        try {
            await updateNotificationAll()
        } catch (error) {
            setNotificationData(previousData)
            setNotificationUnread(previousUnread)
            ToasterCustom.error("Failed to read all notifications.")
        }
    }, [notificationData, notificationUnread])
    // -------------------- Read All Notification -------------------- //


    // Tinggal fix ke ISO timestamp mentah and buat useeffect agar update terus timenya just now, 5 minutes ago, / gimana sesuai Ui yg bagus
    // -------------------- Date Converter For Display -------------------- //
    const formatNotifDate = (data) => {
        const [time, day, month, year] = data.split(" ")
        const [hour, minute] = time.split(":")

        const monthList = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        }
        return new Date(year, monthList[month], day, hour, minute)
    }

    const formatNotifTime = (data) => {
        const formattedNotifDate = formatNotifDate(data)
        const now = new Date()

        const diffMs = now - formattedNotifDate
        const diffMinutes = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)

        const isToday = now.toDateString() === formattedNotifDate.toDateString()
        const isYesterday = new Date(now - 86400000).toDateString() === formattedNotifDate.toDateString()

        if (isToday) {
            if (diffMinutes < 1) return "Just now"
            if (diffMinutes < 60) return `${diffMinutes} min ago`
            return `${diffHours} hr ago`
        }

        if (isYesterday) return "Yesterday"

        return formattedNotifDate.toLocaleDateString([], {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }
    // -------------------- Date Converter For Display -------------------- //

    return (
        <Popover onOpenChange={(open) => {
            notifIsOpenRef.current = open
            handleOpenChange(open)
        }}>
            <PopoverTrigger asChild>
                <Button className="rounded-full relative" variant="outline" size="icon-sm">
                    <Bell />
                    {notificationUnread > 0 && (
                        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-semibold rounded-full flex items-center justify-center leading-none">
                            {notificationUnread > 99 ? "99+" : notificationUnread}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="sm:w-110 p-0">
                <PopoverHeader className="flex flex-row items-center justify-between px-4 py-2 border-b-2">
                    <div className="flex flex-row items-center gap-2">
                        <Bell size={18} />
                        <span className="text-base">Notifications</span>
                    </div>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                tabIndex={-1}
                                disabled={notificationUnread === 0}
                                variant="outline"
                                size="icon-sm"
                                onClick={handleReadAllNotif}
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
                    onScroll={handleScrollData}
                    className="flex flex-col  max-h-64 overflow-y-auto scrollbar-minimal"
                >
                    {flagLoadingNotif ? (
                        <>
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 px-4 py-3.5 border-b last:border-b-0">
                                    <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                                    <div className="flex-1 space-y-2 min-w-0">
                                        <Skeleton className="h-3.5 w-11/12" />
                                        <Skeleton className="h-3.5 w-9/12 sm:hidden" />
                                        <Skeleton className="h-3 w-2/12" />
                                    </div>
                                    <div className="shrink-0 flex items-center">
                                        <Skeleton className="w-2 h-2 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : notificationData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground h-60">
                            <BellOff className="w-6 h-6 opacity-50" />
                            <p className="text-sm font-medium">You're all caught up</p>
                            <p className="text-xs opacity-70">No new notifications</p>
                        </div>
                    ) : (
                        <>
                            {notificationDataVisible.map((data) => (
                                <div
                                    key={data.id}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b last:border-b-0 transition-colors ${!data.isRead ? "bg-muted/30" : "hover:bg-muted/20"}`}
                                    onClick={() => handleReadNotif(data)}
                                >
                                    <div className="shrink-0 mt-0.5">
                                        {data.notificationType === "BATTERY" ? (
                                            <div className="bg-red-500/20 p-2 rounded-full">
                                                <BatteryLow size={16} className="text-red-500" />
                                            </div>
                                        ) : (
                                            <div className="bg-yellow-500/20 p-2 rounded-full">
                                                <TriangleAlert size={16} className="text-yellow-500" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm leading-snug ${data.isRead ? "text-muted-foreground" : "font-medium text-foreground"}`}>
                                            {data.message}
                                        </p>
                                        <span className="text-xs text-muted-foreground/70 mt-1 block">
                                            {formatNotifTime(data.time)}
                                        </span>
                                    </div>
                                    <div className="shrink-0 flex items-center">
                                        {!data.isRead && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className="py-2 border-t">
                    <p className="text-xs text-muted-foreground/60 text-center">
                        Showing notifications from the last 14 days
                    </p>
                </div>
            </PopoverContent >
        </Popover >
    )
}

export default Notification