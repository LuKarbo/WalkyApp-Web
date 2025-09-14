import { UserService } from "../Services/UserService.js";

export const UserController = {
    async fetchAllUsers() {
        return await UserService.getAllUsers();
    },

    async fetchUserById(id) {
        return await UserService.getUserById(id);
    },

    async updateUser(id, userData) {
        return await UserService.updateUser(id, userData);
    },

    async deleteUser(id) {
        return await UserService.deleteUser(id);
    },

    async fetchUserStats() {
        return await UserService.getUserStats();
    }
};