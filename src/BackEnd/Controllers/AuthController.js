import { AuthService } from "../Services/AuthService.js";

export const AuthController = {
    async login(credentials) {
        return await AuthService.login(credentials);
    },

    async register(data) {
        return await AuthService.register(data);
    },

    async checkSession(token) {
        return await AuthService.checkSession(token);
    },

    async logout() {
        return await AuthService.logout();
    },
};
