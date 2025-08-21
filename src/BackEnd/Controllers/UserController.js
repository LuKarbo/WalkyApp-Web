// EJEMPLO
// Simplemente es el pasmanos entre el Front y el Service
import { UserService } from "../Services/UserService.js";

export const UserController = {
    async fetchUserProfile(id) {
        return await UserService.getUserProfile(id);
    },
};
