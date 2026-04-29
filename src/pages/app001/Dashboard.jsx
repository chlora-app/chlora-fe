import React, { useState } from "react";
import RootPageCustom from "../../components/common/RootPageCustom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronRight, Clock, Leaf, TrendingDown, TrendingUp, CalendarDays } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardData } from "./dummyData";
import { Separator } from "@/components/ui/separator";
import PotCard from "./PotCard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


const Dashboard = () => {
    const [app001p01Page, setApp001p01Page] = useState(true);
    const [allData, setAllData] = useState(dashboardData)

    const anomaliesToday = allData?.anomalyToday || {};
    const anomaliesLastWeek = allData?.anomalyInAWeek || {};
    const latestAnomaly = allData?.lastDetected || {};

    const onlinePot = allData?.potList?.filter((p) => p.status === "online").length || 0;
    const offlinePot = allData?.potList?.filter((p) => p.status === "offline").length || 0;

    const isIncrease = anomaliesToday.yesterdayPercent > 0;
    const isIncreaseWeek = anomaliesLastWeek.lastWeekPercent < 0;




    return (
        <React.Fragment>
            <RootPageCustom
                title={"Dashboard"}
                desc={"Monitor your plant pots in real-time"}
            >
                {/* Main Wrapper */}
                <div className={`${app001p01Page ? "flex" : "hidden"} flex-col gap-6`}>

                    {/* First Row Wrapper */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                        <Card className="">
                            <CardContent className="flex flex-row items-center gap-6">
                                <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-xl bg-green-500/10">
                                    <Leaf className="text-green-400" />
                                </div>

                                <div className="flex flex-1 flex-col justify-center gap-1 min-w-0">
                                    <CardTitle>Pot Overview</CardTitle>
                                    <div className="flex flex-row gap-8 items-center">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-green-400">{onlinePot}</span>
                                            <CardDescription>Online</CardDescription>
                                        </div>

                                        <Separator
                                            orientation="vertical"
                                            className="data-[orientation=vertical]:h-10"
                                        />

                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-red-400">{offlinePot}</span>
                                            <CardDescription>Offline</CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className=" flex justify-center ">
                            <CardContent className="flex flex-row items-center gap-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10">
                                    <AlertTriangle className="text-amber-400" />
                                </div>
                                <div className="flex flex-1 flex-col justify-center gap-2">
                                    <CardTitle>Daily Anomaly</CardTitle>
                                    <div className="flex flex-row gap-8 items-center">
                                        <div className="flex flex-row items-center gap-4">
                                            <span className="text-2xl font-bold">
                                                {anomaliesToday.today}
                                            </span>

                                            <CardDescription
                                                className={`flex gap-2 rounded-xl p-2 items-center ${isIncrease ? "text-red-400 bg-red-400/10" : "text-green-400 bg-green-400/10"}`}
                                            >
                                                {isIncrease ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                {Math.abs(anomaliesToday.yesterdayPercent)}% from yesterday
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className=" flex justify-center ">
                            <CardContent className="flex flex-row items-center gap-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10">
                                    <CalendarDays className="text-green-400" />
                                </div>
                                <div className="flex flex-1 flex-col justify-center gap-2">
                                    <CardTitle>Weekly Anomaly</CardTitle>
                                    <div className="flex flex-row gap-8 items-center">
                                        <div className="flex flex-row items-center gap-4">
                                            <span className="text-2xl font-bold">
                                                {anomaliesLastWeek.week}
                                            </span>

                                            <CardDescription
                                                className={`flex gap-2 rounded-xl p-2 items-center ${isIncreaseWeek ? "text-red-400 bg-red-400/10" : "text-green-400 bg-green-400/10"}`}
                                            >
                                                {isIncreaseWeek ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                {Math.abs(anomaliesLastWeek.lastWeekPercent)}% from last week
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className=" flex justify-center ">
                            <CardContent className="flex flex-row items-center gap-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10">
                                    <Clock className="text-orange-400" />
                                </div>
                                <div className="flex flex-1 flex-col justify-center gap-2">
                                    <CardTitle>Latest Anomaly</CardTitle>

                                    <div className="flex flex-row justify-between items-center">
                                        <div className="flex flex-row gap-8">
                                            <div className="flex flex-col">
                                                <CardDescription>Location</CardDescription>
                                                <span className="text-lg font-medium">{latestAnomaly.potId}</span>
                                            </div>

                                            <Separator
                                                orientation="vertical"
                                                className="data-[orientation=vertical]:h-10"
                                            />

                                            <div className="flex flex-col">
                                                <CardDescription>TIme</CardDescription>
                                                <span className="text-lg font-medium">{latestAnomaly.time}</span>
                                            </div>
                                        </div>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="icon-lg">
                                                    <ChevronRight />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span className="text-xs font-medium">View More</span>
                                            </TooltipContent>
                                        </Tooltip>

                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>


                    {/* Layout card agak eror bug */}
                    {/* Mapping show for 4 card by data */}

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"> */}
                        <PotCard
                            potData={allData}
                        />
                    {/* </div> */}
                </div>


            </RootPageCustom >
        </React.Fragment >
    );
}
export default Dashboard;
