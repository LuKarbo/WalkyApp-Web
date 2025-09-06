import { NotificationService } from "../Services/NotificationService.js";

export const NotificationController = {
    async fetchNotifications(page = 1, limit = 10, searchTerm = "") {
        return await NotificationService.getNotificationsForUser(page, limit, searchTerm);
    },

    async fetchNotificationById(id) {
        return await NotificationService.getNotificationById(id);
    },

    async markNotificationAsRead(id) {
        return await NotificationService.markAsRead(id);
    }
};