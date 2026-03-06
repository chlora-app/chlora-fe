"use client"
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import PageSpinner from "../../components/common/PageSpinner";
import AlertAuthMessage from "../../components/common/AlertAuthMessage";
import { useAuth } from "../../context/AuthContext";
import { loginApi } from "../../utils/ListApi";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon, Lock, MailIcon, AlertCircle } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const LoginForm = ({ className, ...props }) => {
    const { login } = useAuth();
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false)
    const [message, setMessage] = useState("");
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = async (values) => {
        debugger
        const response = await loginApi({
            user_id_or_email: values.username,
            password: values.password
        })
        debugger
        return response
    }

    // Validation Form
    const formik = useFormik({
        enableReinitialize: true,
        initialValues:
        {
            username: "",
            password: "",
        },
        validationSchema: Yup.object
            ({
                username: Yup.string().required("Email or Username is required."),
                password: Yup.string().required("Password is required."),
            }),

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            document.activeElement.blur();
            setSubmitting(true)
            setLoadingSpinner(true);
            setShowAlert(false)
            setMessage("");

            try {
                const response = await handleLogin(values)
                login(response.data.data)
                navigate("/")
                resetForm()
            } catch (error) {
                setShowAlert(true)
                if (error.response) {
                    toast.error(error.response.data.message, { position: 'top-right' });
                    // toast.error("Event has been created", { position: "top-right"})

                } else {
                    toast.error("System is Unavailable. Please Try Again Later.");
                    // toast.error("Event has been created", { position: "top-left" })
                }u
            } finally {
                setSubmitting(false);
                setLoadingSpinner(false);


                setTimeout(() => {
                    setShowAlert(false);
                    setMessage("");
                }, 3000);
            }
        },
    });




    return (
        <>
            <PageSpinner
                open={loadingSpinner}
                text="Processing..."
            />

            < form
                className={cn("flex flex-col gap-5", className)}
                onSubmit={formik.handleSubmit}
                {...props}
            >
                <div className="flex flex-col items-left text-start">
                    <h1 className="scroll-m-24 text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-balance text-muted-foreground">
                        Please enter your details to access the systems.
                    </p>
                </div>

                <FieldGroup className="gap-1">
                    <Field>
                        <FieldLabel htmlFor="email">Email or User ID</FieldLabel>
                        <div className="flex flex-col gap-1">
                            <InputGroup>
                                <InputGroupAddon>
                                    <MailIcon />
                                </InputGroupAddon>
                                <InputGroupInput
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your email or user id"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                />
                            </InputGroup>
                            <div className="min-h-4">
                                {formik.touched.username && formik.errors.username && (
                                    <p className="text-xs text-red-600">{formik.errors.username}</p>
                                )}
                            </div>
                        </div>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon>
                                <Lock />
                            </InputGroupAddon>
                            <InputGroupInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <InputGroupAddon align="inline-end" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                            </InputGroupAddon>
                        </InputGroup>
                        <div className="min-h-[1.25rem]">
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-xs text-red-600">{formik.errors.password}</p>
                            )}
                        </div>
                        {/* </div> */}
                    </Field>
                </FieldGroup>


                <Button type="submit" disabled={formik.isSubmitting} className="w-full">
                    {formik.isSubmitting ? "Processing..." : "Login"}
                </Button>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    OR
                </FieldSeparator>

                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-primary font-medium !no-underline hover:!underline underline-offset-4"
                    >
                        Sign Up
                    </Link>
                </p>
            </form >
        </>
    );
}

export default LoginForm;



{/* <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription> */}


{/* <AlertAuthMessage
                open={showAlert}
                severity="error"
                message={message}
                onClose={() => setShowAlert(false)}
            /> */}

{/* Main Container */ }
{/* <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    p: { xs: 1, sm: 2 },
                    gap: 5,
                }}
            >


                <Stack width={"100%"}>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 5,
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: 4,
                            }}
                        >
                            <Stack>
                                <TextField
                                    className="auth-field"
                                    variant="outlined"
                                    placeholder="Enter your email or user id"
                                    name="username"
                                    size="medium"
                                    label="Email or User ID"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                            autoCorrect: "off",
                                            autoCapitalize: "none",
                                            startAdornment: (
                                                <InputAdornment position="start" >
                                                    <MailOutlineOutlinedIcon
                                                        sx={{
                                                            mx: 0.5,
                                                            color: formik.values.username === "" ? 'text.secondary' : 'text.primary'
                                                        }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Stack>

                            <Stack >
                                <TextField
                                    className="auth-field"
                                    variant="outlined"
                                    placeholder="Enter your password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    size="medium"
                                    label="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                            autoCorrect: "off",
                                            autoCapitalize: "none",
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon
                                                        sx={{
                                                            mx: 0.5,
                                                            color: formik.values.password === "" ? 'text.secondary' : 'text.primary'
                                                        }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        tabIndex={-1}
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                        sx={{
                                                            color: formik.values.password === "" ? 'text.secondary' : 'text.primary'
                                                        }}
                                                    >
                                                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        },
                                    }}
                                />
                            </Stack>
                        </Box>

                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
                            <Button
                                type="submit"
                                variant="outlined"
                                size="large"
                                fullWidth
                                className="auth-button"

                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "Processing..." : "LOGIN"}
                            </Button>

                            <Box sx={{ display: 'flex', alignItems: 'center', width: '90%' }}>
                                <Divider
                                    className="auth-divider"
                                    sx={{
                                        flexGrow: 1,
                                        opacity: '100%'
                                    }}
                                />
                                <Typography variant="body1" sx={{ mx: 2 }}>OR</Typography>
                                <Divider
                                    className="auth-divider"
                                    sx={{
                                        flexGrow: 1,
                                        opacity: '100%'
                                    }}
                                />
                            </Box>

                            <Typography
                                variant="body1"
                            >
                                Don't have an account?
                                <Button
                                    component={Link}
                                    to="/register"
                                    className="linkto-button"
                                >
                                    Sign Up
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Box> */}