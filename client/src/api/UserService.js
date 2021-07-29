import client from "./api-client";

export default class UserService {
    static async getUsers () {
        return client.get(`/api-v1/users`);
    };
}