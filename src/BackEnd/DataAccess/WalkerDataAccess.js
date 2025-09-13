import { WalkerAPI } from "../API/WalkerAPI.js";

export const WalkerDataAccess = {
    async getAllWalkers() {
        return await WalkerAPI.getAllWalkers();
    },

    async getWalkerById(id) {
        return await WalkerAPI.getWalkerById(id);
    },

    async getWalkerSettings(walkerId) {
        return await WalkerAPI.getWalkerSettings(walkerId);
    },

    async updateWalkerSettings(walkerId, settings) {
        return await WalkerAPI.updateWalkerSettings(walkerId, settings);
    }
};