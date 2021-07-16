import axios from "axios";

const url = `${window.location.origin}`;
const headers = {
    "Content-Type": "application/json"
};

const client = axios.create({
    withCredentials: true,
    baseUrl: url,
    headers
});

client.interceptors.request.use(
    (config) => {
        config.headers.Authorization = localStorage.getItem("JWToken");

        return config;
    }
)

export default client;