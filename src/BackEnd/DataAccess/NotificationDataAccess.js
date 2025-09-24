import { NotificationAPI } from "../API/NotificationAPI.js";

export const NotificationDataAccess = {
    async getNotificationsByUser(userId) {
        if (!userId) {
            throw new Error("User ID is required");
        }
        return await NotificationAPI.getNotificationsByUser(userId);
    },

    async getNotificationById(notificationId, userId) {
        if (!notificationId) {
            throw new Error("Notification ID is required");
        }
        if (!userId) {
            throw new Error("User ID is required");
        }
        return await NotificationAPI.getNotificationById(notificationId, userId);
    },

    async setNotificationReaded(notificationId, userId) {
        if (!notificationId) {
            throw new Error("Notification ID is required");
        }
        if (!userId) {
            throw new Error("User ID is required");
        }
        return await NotificationAPI.setNotificationReaded(notificationId, userId);
    }
};