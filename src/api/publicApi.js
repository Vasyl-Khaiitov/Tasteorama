import axios from "axios";

const publicApiClient = axios.create({
  baseURL: "https://cook-api-dtdl.onrender.com/api",
  withCredentials: false, // ❗important for CORS
});

export default publicApiClient;
