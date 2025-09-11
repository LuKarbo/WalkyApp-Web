import { WalkerService } from "../Services/WalkerService.js";

export const WalkerController = {
    async fetchWalkersForHome() {
        return await WalkerService.getWalkersForHome();
    },

    async fetchWalkerProfile(id) {
        return await WalkerService.getWalkerProfile(id);
    },

    async fetchWalkerSettings(walkerId) {
        return await WalkerService.getWalkerSettings(walkerId);
    },

    async updateWalkerSettings(walkerId, settings) {
        return await WalkerService.updateWalkerSettings(walkerId, settings);
    },

    async updateWalkerLocation(walkerId, location) {
        return await WalkerService.updateWalkerLocation(walkerId, location);
    },

    async updateWalkerPricing(walkerId, pricingData) {
        return await WalkerService.updateWalkerPricing(walkerId, pricingData);
    }
};