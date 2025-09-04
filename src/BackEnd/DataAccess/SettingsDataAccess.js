import { SettingsAPI } from "../API/SettingsAPI.js";

export const SettingsDataAccess = {
    async getUserSettings(userId) {
        return await SettingsAPI.getUserSettings(userId);
    },

    async updateUserSettings(userId, settings) {
        return await SettingsAPI.updateUserSettings(userId, settings);
    },

    async getUserSubscription(userId) {
        return await SettingsAPI.getUserSubscription(userId);
    },

    async updateSubscription(userId, subscriptionData) {
        return await SettingsAPI.updateSubscription(userId, subscriptionData);
    },

    async getSubscriptionPlans() {
        return await SettingsAPI.getSubscriptionPlans();
    }
};