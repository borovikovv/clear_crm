import client from "./api-client";

export default class AuthService {
    static async register (userData) {
        return client.post(`/api-v1/signup`, userData);
    };

    static async login (userData) {
        return client.post(`/api-v1/login`, userData);
    };

    static async logout () {
        return client.get(`/api-v1/logout`);
    };
}