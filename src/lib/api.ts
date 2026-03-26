import { logout } from "@/state/auth/auth.slice";
import store from "@/state/store";
import axios, { AxiosError } from "axios";
import { API_PREFIX } from "./constants";



export const api = axios.create({
  adapter: "fetch",
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_API_URL}/${API_PREFIX}`
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!;
    console.log(`ERROR OCCURED WHEN ACCESSING: ${originalRequest.url} CODE: ${error.response?.status} MESSAGE: ${error.message}`)
    if (
      error.response?.status === 401 &&
            originalRequest.url !== "accounts/refresh"
    ) {
      try {
        await api.post("accounts/refresh");
        return api.request(originalRequest);
      } catch (err) {
        store.dispatch(logout())
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
