import client from "./api-client";

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
}

export default AuthService; 