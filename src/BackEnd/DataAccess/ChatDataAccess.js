import { ChatAPI } from "../API/ChatAPI.js";

export const ChatDataAccess = {
    async getChatMessages(tripId) {
        if (!tripId) {
            throw new Error("El ID del paseo es requerido");
        }
        return await ChatAPI.getChatMessages(tripId);
    },

    async sendMessage(messageData) {
        if (!messageData.tripId || !messageData.message || !messageData.senderId) {
            throw new Error("El ID del paseo, el mensaje y el ID del emisor son requeridos");
        }
        return await ChatAPI.sendMessage(messageData);
    },

    async markMessagesAsRead(tripId, userId) {
        if (!tripId || !userId) {
            throw new Error("El ID del paseo y el ID del usuario son requeridos");
        }
        return await ChatAPI.markMessagesAsRead(tripId, userId);
    },

    async getUnreadCount(userId) {
        if (!userId) {
            throw new Error("El ID del usuario es requerido");
        }
        return await ChatAPI.getUnreadCount(userId);
    }
};