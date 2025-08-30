// EJEMPLO
import { UserAPI } from "../API/UserAPI.js";

export const UserDataAccess = {
    async getUserById(id) {
        // Simplemente hace el pasamanos hacia la API
        return await UserAPI.getUserById(id);
    },

    async updateUserProfile(id, profileData) {
        return await UserAPI.updateUserProfile(id, profileData);
    },

    async changeUserPassword(id, passwordData) {
        return await UserAPI.changeUserPassword(id, passwordData);
    }
};