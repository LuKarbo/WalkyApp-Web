import { WalksService } from "../Services/WalksService.js";

export const WalksController = {
    async fetchWalksForHome() {
        return await WalksService.getWalksForHome();
    },

    async fetchWalkDetails(id) {
        return await WalksService.getWalkDetails(id);
    },

    async fetchActiveWalks() {
        return await WalksService.getActiveWalks();
    },

    async fetchScheduledWalks() {
        return await WalksService.getScheduledWalks();
    },

    async fetchWalksByWalker(walkerId) {
        return await WalksService.getWalksByWalker(walkerId);
    },

    async fetchWalksByOwner(ownerId) {
        return await WalksService.getWalksByOwner(ownerId);
    }

};