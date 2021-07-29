import client from "./api-client";
import axios from "axios";

const url = `${window.location.origin}`

class AuthService {
    static async register (email, password) {
        const data = { email, password };
        return client.post(`/api-v1/signup`, data);
    };

    static async login (email, password) {
        const data = { email, password };
        return client.post(`/api-v1/login`, data);
    };

    static async logout () {
        return client.get(`/api-v1/logout`);
    };

    static async checkAuth () {
        return axios.get(`${url}/api-v1/refresh`, { 
            withCredentials: true
        });
    }
}

export default AuthService; 