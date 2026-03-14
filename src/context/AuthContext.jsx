import { createContext, useContext, useState, useEffect } from "react";

import { logoutApi } from "../utils/ListApi";
import { setLogoutHandler } from "../utils/AxiosInstance";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [loginStatus, setLoginStatus] = useState(() => {
        return localStorage.getItem("loginStatus") === "true";
    });

    const login = (userData) => {
        setUser(userData);
        setLoginStatus(true);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("loginStatus", "true");
    };

    const logout = async () => {
        const toastId = toast.loading("Loading...")
        try {
            await logoutApi();
            toast.success("Logout successfully.", { id: toastId })
        } catch (e) {
            console.error(e);
        } finally {
            setUser(null);
            setLoginStatus(false);
            localStorage.removeItem("user");
            localStorage.removeItem("loginStatus");
        }
    };

    const clearAuthState = () => {
        setUser(null);
        setLoginStatus(false);
        localStorage.removeItem("user");
        localStorage.removeItem("loginStatus");
        toast.dismissAll();
        toast.error("Token expired, please login to continue.");
    }

    useEffect(() => {
        setLogoutHandler(clearAuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loginStatus, login, logout, clearAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook untuk pakai context
export const useAuth = () => useContext(AuthContext);
