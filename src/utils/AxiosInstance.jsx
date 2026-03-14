import axios from 'axios';

let logoutHandler = null;

export const setLogoutHandler = (handler) => {
    logoutHandler = handler;
};

const ENV = import.meta.env?.VITE_ENV || "LOCAL";

const getBaseURL = (service) => {
    if (ENV === "DEV" || ENV === "PROD") {
        return import.meta.env[`VITE_BASE_URL_${ENV}`];
    }
    return import.meta.env[`VITE_BASE_URL_${ENV}_${service.toUpperCase()}`];
};

const unauthorizedInterceptor = (service) => (error) => {
    if (error.response?.status === 401 && service !== "auth") {
        logoutHandler?.();
        error.isUnauthorized = true;
    }
    return Promise.reject(error);
};

const axiosInstance = (service = "management", additionalConfig = {}) => {
    const baseURL = getBaseURL(service);
    if (!baseURL) {
        throw new Error(`BASE_URL not found for service "${service}" on env "${ENV}"`);
    }
    const instance = axios.create({
        baseURL,
        withCredentials: true,
        ...additionalConfig,
    });
    instance.interceptors.response.use((response) => response, unauthorizedInterceptor(service));
    return instance;
};

export default axiosInstance;