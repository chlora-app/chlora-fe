import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import potDashboard from "../../assets/images/potDashboard.webp"
import { Wifi } from "lucide-react"


const PotCard = (props) => {
    return (
        <>
            <Card className="flex col-span-3">
                <CardContent>
                    <div className="flex justify-end">
                        <Wifi className="text-green-500" />
                    </div>

                    <div className="flex justify-center">
                        <img src={props.image} className="h-35 w-25" />
                    </div>

                    <div>
                        <CardHeader>
                            <CardTitle>{props.name}</CardTitle>
                            <p>{props.status}</p>
                        </CardHeader>

                        <CardContent className="flex flex-row col-span-12 gap-2">
                            <Card className="col-span-6">Temp</Card>
                            <Card className="col-span-6">Humidity</Card>
                            <Card className="col-span-6">Soil Moisture</Card>
                            <Card className="col-span-6">Battery</Card>
                        </CardContent>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
export default PotCard