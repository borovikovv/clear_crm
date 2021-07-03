import axios from "axios";

const url = `${window.location.origin}`;
const headers = {
    "Content-Type": "application/json"
};

const client = axios.create({
    baseUrl: url,
    headers
});

export const register = (userData) => {
    return client.post(`/api/v1/signup`, userData);
};