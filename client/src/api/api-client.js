import axios from "axios";

const url = `${window.location.origin}`;
const headers = {
    "Content-Type": "application/json"
};

const UNAUTORIZATION = 401;

const client = axios.create({
    withCredentials: true,
    baseUrl: url,
    headers
});

client.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

        return config;
    }
)

client.interceptors.response.use(
    (config) => {
        return config;
    }, async (error) => {
        const originalRequest = error.config;
        if(error.response.status === UNAUTORIZATION && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${url}/api-v1/refresh`, {withCredentials: true });
                localStorage.setItem("token", response.data.accessToken);

                return client.request(originalRequest);

            } catch (err) {
                console.error(err.message)
            }
        }
    }
)

export default client;