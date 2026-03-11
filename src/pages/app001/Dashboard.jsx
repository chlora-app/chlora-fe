import React, { useState } from "react";
import RootPageCustom from "../../components/common/RootPageCustom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


const Dashboard = () => {
    const [firstRender, setFirstRender] = useState(false)
    const [app001p01Page, setApp001p01Page] = useState(true);



    return (
        <React.Fragment>
            <RootPageCustom
                setFirstRender={setFirstRender}
            >
                <div className={`${app001p01Page ? "flex" : "hidden"} flex-col gap-2`}>
                    <div className="flex items-center justify-between px-6 mb-2">
                        <div>
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                            <p className="text-sm text-muted-foreground">On progress</p>
                        </div>
                    </div>
                </div>


            </RootPageCustom>
        </React.Fragment >
    );
}
export default Dashboard;
