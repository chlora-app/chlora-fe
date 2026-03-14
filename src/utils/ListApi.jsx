import axiosInstance from "./AxiosInstance";

const auth = axiosInstance("auth", { withCredentials: false });
const management = axiosInstance("management");

// Login and Register
export const loginApi = (res) => auth.post("/auth/login", res);
export const registerApi = (res) => auth.post("/auth/register", res);
export const logoutApi = (res) => auth.post("/auth/logout", res);

// app002 - Master User
export const getUser = (params, config = {}) => management.get("/users", { params, ...config });
export const getUserDeleted = (params, config = {}) => management.get("/users/deleted", { params, ...config });
export const addUser = (res) => management.post("/users", res);
export const editUser = (userId, res, config = {}) => management.patch(`/users/${userId}`, res, config);
export const deleteUser = (userId) => management.delete(`/users/${userId}`);
export const restoreUser = (userId) => management.post(`/users/deleted/${userId}/restore`);

// app003 - Master Cluster
export const getCluster = (params, config = {}) => management.get("/clusters", { params, ...config });
export const addCluster = (res) => management.post("/clusters", res);
export const editCluster = (clusterId, res, config = {}) => management.patch(`/clusters/${clusterId}`, res, config);
export const deleteCluster = (clusterId) => management.delete(`/clusters/${clusterId}`);

// app004 - Master Device
export const getDevice = (params, config = {}) => management.get("/devices", { params, ...config });
export const addDevice = (res) => management.post("/devices", res);
export const editDevice = (deviceId, res, config = {}) => management.patch(`/devices/${deviceId}`, res, config);
export const deleteDevice = (deviceId) => management.delete(`/devices/${deviceId}`);