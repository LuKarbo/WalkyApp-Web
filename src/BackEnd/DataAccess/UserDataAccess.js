// EJEMPLO
import { UserAPI } from "../API/UserAPI.js";

export const UserDataAccess = {
    async getUserById(id) {
        // Simplemente hace el pasamanos hacia la API
        return await UserAPI.getUserById(id);
    },
};
