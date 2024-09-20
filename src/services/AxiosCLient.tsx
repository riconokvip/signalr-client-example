import axios, { AxiosInstance, AxiosResponse } from "axios";

const CoreService: AxiosInstance = axios.create();

CoreService.interceptors.request.use((config: any) => {

    config.baseURL = "https://client.apimb66.com/api";
    config.headers.Authorization = `Bearer ${localStorage.getItem("token") ?? ""}`;

    return config;
});

CoreService.interceptors.response.use((response: AxiosResponse) => {

    if (response.data.status === 401) {
        localStorage.removeItem("auth");
        window.location.href = "/";
    }

    return response;
});

export default CoreService;