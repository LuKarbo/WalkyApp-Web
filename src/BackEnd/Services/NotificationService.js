import { NotificationDataAccess } from "../DataAccess/NotificationDataAccess.js";

export const NotificationService = {
    async getNotificationsForUser(userId, page = 1, limit = 10, searchTerm = "") {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const notifications = await NotificationDataAccess.getNotificationsByUser(userId);
        
        const filteredNotifications = notifications.filter(notification => {
            if (!searchTerm) return true;
            
            const searchLower = searchTerm.toLowerCase();
            return notification.title.toLowerCase().includes(searchLower) ||
                    notification.content.toLowerCase().includes(searchLower) ||
                    (notification.walkerName && notification.walkerName.toLowerCase().includes(searchLower));
        });

        filteredNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

        const notificationsDTO = paginatedNotifications.map(notification => ({
            id: notification.id,
            title: notification.title,
            preview: notification.content.length > 100 
                ? notification.content.substring(0, 100) + "..." 
                : notification.content,
            fullContent: notification.content,
            type: notification.type,
            date: notification.date,
            read: notification.read,
            walkerName: notification.walkerName
        }));

        return {
            notifications: notificationsDTO,
            totalCount: filteredNotifications.length,
            currentPage: page,
            totalPages: Math.ceil(filteredNotifications.length / limit),
            hasNextPage: endIndex < filteredNotifications.length,
            hasPrevPage: page > 1
        };
    },

    async getNotificationById(notificationId, userId) {
        if (!notificationId) {
            throw new Error("Notification ID is required");
        }
        if (!userId) {
            throw new Error("User ID is required");
        }

        const notification = await NotificationDataAccess.getNotificationById(notificationId, userId);
        
        if (!notification) {
            throw new Error("Notification not found or does not belong to user");
        }

        return {
            id: notification.id,
            title: notification.title,
            content: notification.content,
            type: notification.type,
            date: notification.date,
            read: notification.read,
            walkerName: notification.walkerName
        };
    },

    async markAsRead(notificationId, userId) {
        if (!notificationId) {
            throw new Error("Notification ID is required");
        }
        if (!userId) {
            throw new Error("User ID is required");
        }

        const notification = await NotificationDataAccess.getNotificationById(notificationId, userId);
        if (!notification) {
            throw new Error("Notification not found or does not belong to user");
        }

        const result = await NotificationDataAccess.setNotificationReaded(notificationId, userId);
        
        if (!result.success) {
            throw new Error("Failed to mark notification as read");
        }

        console.log(`Notification ${notificationId} for user ${userId} marked as read`);
        return result;
    }
};