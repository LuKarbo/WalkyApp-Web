import { NotificationAPI } from "../API/NotificationAPI.js";

export const NotificationDataAccess = {
    async getAllNotifications() {
        return await NotificationAPI.getAllNotifications();
    },

    async getNotificationById(id) {
        return await NotificationAPI.getNotificationById(id);
    }
};