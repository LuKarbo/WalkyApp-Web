import { SettingsService } from "../Services/SettingsService.js";

export const SettingsController = {
    async getUserSettings(userId) {
        return await SettingsService.getUserSettings(userId);
    },

    async updateUserSettings(userId, settings) {
        return await SettingsService.updateUserSettings(userId, settings);
    },

    async getUserSubscription(userId) {
        return await SettingsService.getUserSubscription(userId);
    },

    async updateSubscription(userId, planId) {
        return await SettingsService.updateSubscription(userId, planId);
    },

    async getSubscriptionPlans() {
        return await SettingsService.getSubscriptionPlans();
    }
};