import React, { useState } from "react";
import RootPageCustom from "../../components/common/RootPageCustom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Plus, TriangleAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardData } from "./dummyData";
import { CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PotCard from "./PotCard";


const Dashboard = () => {
    const [app001p01Page, setApp001p01Page] = useState(true);
    const [allData, setAllData] = useState(dashboardData)
    console.log("Check all data", allData)

    const [anomaliesToday, setAnomaliesToday] = useState(allData?.anomalyToday || {})
    const [anomaliesLastWeek, setAnomaliesLastWeek] = useState(allData?.anomalyInAWeek || {})
    const [latestAnomaly, setLatestAnomaly] = useState(allData?.lastDetected || {})




    return (
        <React.Fragment>
            <RootPageCustom
                title={"Dashboard"}
                desc={"Monitor your plant pots in real-time"}
            >
                {/* Main Wrapper */}
                <div className={`${app001p01Page ? "flex" : "hidden"} flex-col gap-6`}>

                    {/* First Row Wrapper */}
                    <div className="grid grid-cols-12 gap-4">

                        <Card className="flex flex-row items-center col-span-3 bg-yellow-300/10 px-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10">
                                <AlertTriangle className="text-amber-400" />
                            </div>


                            <div className="flex flex-col justify-center gap-2">
                                <CardTitle>
                                    Anomalies Today
                                </CardTitle>

                                <span className="text-3xl font-medium">
                                    {anomaliesToday.today}
                                </span>

                                <CardDescription>
                                    {anomaliesToday.yesterdayPercent}% from yesterday
                                </CardDescription>
                            </div>
                        </Card>


                        <Card className="flex flex-row items-center col-span-3  bg-green-300/10 px-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10">
                                <CalendarDays className="text-green-400" />
                            </div>

                            <div className="flex flex-col justify-center gap-2">
                                <CardTitle>Anomalies This Week</CardTitle>
                                <span className="text-2xl">{anomaliesLastWeek.week}</span>
                                <CardDescription>{anomaliesLastWeek.lastWeekPercent}% from last week</CardDescription>
                            </div>
                        </Card>

                        <Card className=" flex flex-row items-center col-span-6 bg-orange-300/10 px-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10">
                                <Clock className="text-orange-400" />
                            </div>

                            <div className="flex flex-col justify-center gap-2 w-full">
                                <CardTitle>Last Detected</CardTitle>

                                <div className="flex w-full justify-between">
                                    <div className="flex gap-6 items-center">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Location</p>
                                            <h4 className="font-medium">{latestAnomaly.potId}</h4>
                                        </div>

                                        <div className="border-l border-border h-8 mx-4" />

                                        <div>
                                            <p className="text-xs text-muted-foreground">Time</p>
                                            <CardDescription>{latestAnomaly.time}</CardDescription>
                                        </div>
                                    </div>

                                    <div>
                                        <Button>
                                            View Detail
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </Card>
                    </div>


                    {/* Mapping show for 4 card by data */}

                    <div className="grid grid-cols-12 gap-6">
                        <PotCard
                            potData={allData}
                        />
                    </div>
                </div>


            </RootPageCustom >
        </React.Fragment >
    );
}
export default Dashboard;
