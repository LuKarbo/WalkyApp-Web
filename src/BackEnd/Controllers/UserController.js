// EJEMPLO
// Simplemente es el pasamanos entre el Front y el Service
import { UserService } from "../Services/UserService.js";

export const UserController = {
    async fetchUserProfile(id) {
        return await UserService.getUserProfile(id);
    },

    async updateUserProfile(id, profileData) {
        return await UserService.updateUserProfile(id, profileData);
    },

    async changeUserPassword(id, passwordData) {
        return await UserService.changeUserPassword(id, passwordData);
    }
};