import React, { useState } from "react";
import { Paper, Container } from "@mui/material";
import {
    Typography, Button, Grid, useTheme,
    useMediaQuery,
} from '@mui/material';
import RootPageCustom from "../../components/common/RootPageCustom";
import { DashboardIcon } from "../../assets/Icon/muiIcon";


const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // xs & sm
    const [firstRender, setFirstRender] = useState(false)
    const [app001p01Page, setApp001p01Page] = useState(true);

    const [app001Msg, setApp001setMsg] = useState("");
    const [app001MsgStatus, setApp001setMsgStatus] = useState("");


    return (
        <React.Fragment>
            <RootPageCustom
                msgStateGet={app001Msg}
                msgStateSet={setApp001setMsg}
                msgStateGetStatus={app001MsgStatus}
                setFirstRender={setFirstRender}
                title="Dashboard"
                icon={<DashboardIcon fontSize="small" />}
                isMobile={isMobile}
            >
                <Container
                    // maxWidth="xl"
                    maxWidth={false}
                    sx={{
                        display: app001p01Page ? "block" : "none",
                        bgcolor: 'background.paper'
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Dashboard
                    </Typography>
                    <Typography>
                        On Progress
                    </Typography>

                    {/* <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid >
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                    setApp001setMsg("Data berhasil disimpan!")
                                    setApp001setMsgStatus("success")
                                }}
                            >
                                Tampilkan Alert Sukses
                            </Button>
                        </Grid>
                        <Grid >
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    setApp001setMsg("Terjadi kesalahan pada server!")
                                    setApp001setMsgStatus("error")
                                }}
                            >
                                Tampilkan Alert Error
                            </Button>
                        </Grid>
                        <Grid >
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => {
                                    setApp001setMsg("Warning  pada server!");
                                    setApp001setMsgStatus("warning")
                                }}                        >
                                Tampilkan Alert Warning
                            </Button>
                        </Grid>
                    </Grid> */}
                </Container>


            </RootPageCustom>
        </React.Fragment >
    );
}
export default Dashboard;
