import React, { useState, useEffect, useCallback, useMemo } from "react";
import RootPageCustom from "../../components/common/RootPageCustom";
import TableCustom from "../../components/common/TableCustom";
import MasterPotAdd from "./MasterPotAdd";
import MasterPotEdit from "./MasterPotEdit";
import PopupDeleteAndRestore from "../../components/common/PopupDeleteAndRestore";
import { Trash2, SquarePen, Plus, Search } from "lucide-react";
import { ToasterCustom } from "@/components/common/ToasterCustom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { handleApiError } from "@/utils/ErrorHandler";
import { getPot, deletePot } from "../../utils/ListApi";
import { Badge } from "@/components/ui/badge";

const SensorData = () => {
    const [loading, setLoading] = useState(false)
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [app003PotEditData, setApp003PotEditData] = useState(null);
    const [app003PotDeleteData, setApp003PotDeleteData] = useState(null)

    const [app003PotData, setApp003PotData] = useState([]);
    const [app003PotTotalData, setApp003PotTotalData] = useState(0)
    const [app003TotalPage, app003SetTotalPage] = useState(0)
    const [search, setSearch] = useState("")
    const [app003PotDataParam, setApp003PotDataParam] = useState(
        {
            page: 1,
            size: 10,
            sort: "",
            order: "asc",
            search: "",
        }
    )

    const app003PotColumns = useMemo(() => [
        {
            dataField: "potId",
            text: "Pot ID",
            sort: true,
            headerAlign: "center",
            bodyAlign: 'center',
        },
        {
            dataField: "potName",
            text: "Pot Name",
            sort: true,
            headerAlign: "center",
            bodyAlign: 'center',
        },
        {
            dataField: "isMonitored",
            text: "Monitored",
            sort: true,
            headerAlign: "center",
            bodyAlign: 'center',
            formatter: (cellContent) => {
                switch (cellContent) {
                    case true:
                        return <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">True</Badge>
                    default:
                        return <Badge className="bg-sky-50 text-red-700 dark:bg-red-950 dark:text-red-300">False</Badge>
                }
            }
        },
        {
            dataField: "action",
            text: "Action",
            headerAlign: "center",
            bodyAlign: 'left',
            formatter: (cellContent, app003PotData) => (
                <div className="flex items-center justify-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon-sm"
                                onClick={() => handleModalEditOpen(app003PotData)}
                            >
                                <SquarePen
                                    className="text-blue-500"
                                />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon-sm"
                                onClick={() => handleModalDeleteOpen(app003PotData)}
                            >
                                <Trash2 className="text-red-500" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            ),
        },
    ], []);

    const handleChangePage = (newPage) => {
        setApp003PotDataParam(prev => ({
            ...prev,
            page: newPage + 1
        }));
    };

    const handleChangeRowsPerPage = (newRowsPerPage) => {
        setApp003PotDataParam(prev => ({
            ...prev,
            size: newRowsPerPage,
            page: 1
        }));
    };

    const handleRequestSort = (property, order) => {
        setApp003PotDataParam(prev => ({
            ...prev,
            sort: property,
            order: order,
            page: 1
        }));
    };

    // Fetch List Pot
    const fetchPot = useCallback(async (param) => {
        setLoading(true);
        try {
            const response = await getPot(param);
            setApp003PotData(response?.data?.pots ?? []);
            setApp003PotTotalData(response?.data?.totalElements ?? 0);
            app003SetTotalPage(response?.data?.totalPages ?? 0);
        } catch (error) {
            if (handleApiError(error)) return
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPot(app003PotDataParam);
    }, [app003PotDataParam]);

    const handleSearchState = () => {
        setApp003PotDataParam(prev => ({
            ...prev,
            page: 1,
            search: search
        }))

    }

    const refreshTable = useCallback(() => {
        setSearch("");
        setApp003PotDataParam({
            page: 1,
            size: 10,
            sort: "",
            order: "asc",
            search: "",
        });
    }, []);

    // Form Edit Modal
    const handleModalEditOpen = (obj) => {
        setModalEditOpen(true)
        setApp003PotEditData(obj)
    }

    // Form Delete Modal
    const handleModalDeleteOpen = (obj) => {
        setModalDeleteOpen(true)
        setApp003PotDeleteData(obj)
    }

    const deletePotAction = useCallback(async (param) => {
        setLoading(true)
        try {
            await ToasterCustom.promise(
                deletePot(param.potId), {
                loading: "Loading...",
                success: "Pot deleted successfully.",
                error: (err) => err?.response?.data?.message || "System is unavailable, please try again later."
            }
            )
            refreshTable()
        } catch (error) {
            console.log(error)
        } finally {
            setModalDeleteOpen(false)
            setLoading(false)
        }
    }, [])

    const app003HandleDeletePot = () => { app003PotDeleteData?.potId && deletePotAction(app003PotDeleteData) }


    return (
        <RootPageCustom
            title={"Sensor Data"}
            desc={"Feature will be available soon"}
            setModalAddOpen={setModalAddOpen}
        >
            {/* <div className="flex flex-col gap-2 flex-1">
                <Card>
                    <CardContent>
                        <div className="flex items-center justify-end mb-4">
                            <div className="relative w-full sm:w-48">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") handleSearchState() }}
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        <TableCustom
                            keyField="potId"
                            loadingData={loading}
                            columns={app003PotColumns}
                            appdata={app003PotData}
                            appdataTotal={app003PotTotalData}
                            totalPage={app003TotalPage}
                            rowsPerPageOption={[5, 10, 20, 25]}
                            page={app003PotDataParam.page - 1}
                            rowsPerPage={app003PotDataParam.size}
                            sortField={app003PotDataParam.sort}
                            sortOrder={app003PotDataParam.order}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            onRequestSort={handleRequestSort}
                        />
                    </CardContent>
                </Card>
            </div> */}

            {modalAddOpen && (
                <MasterPotAdd
                    modalAddOpen={modalAddOpen}
                    setModalAddOpen={setModalAddOpen}
                    refreshTable={refreshTable}
                />
            )}

            {modalEditOpen && (
                <MasterPotEdit
                    modalEditOpen={modalEditOpen}
                    setModalEditOpen={setModalEditOpen}
                    refreshTable={refreshTable}
                    app003PotEditData={app003PotEditData}
                />
            )}

            {modalDeleteOpen && (
                <PopupDeleteAndRestore
                    status={"delete"}
                    modalOpen={modalDeleteOpen}
                    modalClose={() => setModalDeleteOpen(false)}
                    loading={loading}
                    onClick={app003HandleDeletePot}
                />
            )}

        </RootPageCustom>
    );
}

export default SensorData;