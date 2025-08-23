import { WalksAPI } from "../API/WalksAPI.js";

export const WalksDataAccess = {
    async getAllWalks() {
        return await WalksAPI.getAllWalks();
    },

    async getWalkById(id) {
        return await WalksAPI.getWalkById(id);
    },

    async getWalksByStatus(status) {
        return await WalksAPI.getWalksByStatus(status);
    },

    async getWalksByWalkerId(walkerId) {
        return await WalksAPI.getWalksByWalkerId(walkerId);
    },

    async getWalkByOwner(ownerId) {
        return await WalksAPI.getWalkByOwner(ownerId);
    },
};