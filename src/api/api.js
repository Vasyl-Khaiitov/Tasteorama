import axios from "axios";
import { lsRemoveToken, lsSetToken } from "../utils/localStorage";

const apiClient = axios.create({
  baseURL: "https://cook-api-dtdl.onrender.com/api",
  withCredentials: true,
});

export const setAuthorizationToken = (token) => {
  lsSetToken(token);
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAuthorizationToken = () => {
  lsRemoveToken();
  apiClient.defaults.headers.common.Authorization = "";
};

export default apiClient;
