// WalkerDataAccess.js
import { WalkerAPI } from "../API/WalkerAPI.js";

export const WalkerDataAccess = {
    async getAllWalkers() {
        return await WalkerAPI.getAllWalkers();
    },

    async getWalkerById(id) {
        return await WalkerAPI.getWalkerById(id);
    }
};