import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL || "https://groceryshop-jst8.onrender.com";
const apiUrl = rawApiUrl.replace(/\/+$/, "");

const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const API_BASE_URL = apiUrl;
export default apiClient;
