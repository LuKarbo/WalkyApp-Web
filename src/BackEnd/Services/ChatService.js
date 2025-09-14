import { ChatDataAccess } from "../DataAccess/ChatDataAccess.js";

export const ChatService = {
    async getChatMessages(tripId) {
        const messages = await ChatDataAccess.getChatMessages(tripId);
        
        // Transformamos los datos a DTO para la UI
        return messages.map(message => ({
            id: message.id,
            text: message.message,
            sender: message.senderType,
            senderName: message.senderName,
            timestamp: message.timestamp,
            time: new Date(message.timestamp).toLocaleTimeString('es-AR', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            read: message.read
        }));
    },

    async sendMessage(tripId, userId, userType, userName, messageText) {
        if (!messageText.trim()) {
            throw new Error("El mensaje no puede estar vacío");
        }

        const messageData = {
            tripId: tripId,
            senderId: userId,
            senderType: userType, // 'owner' or 'walker'
            senderName: userName,
            message: messageText.trim()
        };

        const sentMessage = await ChatDataAccess.sendMessage(messageData);
        
        // Retornamos en formato DTO
        return {
            id: sentMessage.id,
            text: sentMessage.message,
            sender: sentMessage.senderType,
            senderName: sentMessage.senderName,
            timestamp: sentMessage.timestamp,
            time: new Date(sentMessage.timestamp).toLocaleTimeString('es-AR', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            read: sentMessage.read
        };
    },

    async markMessagesAsRead(tripId, userId) {
        return await ChatDataAccess.markMessagesAsRead(tripId, userId);
    },

    async getUnreadCount(userId) {
        return await ChatDataAccess.getUnreadCount(userId);
    },

    // Validaciones de negocio
    validateMessageLength(message) {
        const MAX_LENGTH = 500;
        if (message.length > MAX_LENGTH) {
            throw new Error(`Mensaje muy largo. Máximo ${MAX_LENGTH} caracteres permitidos.`);
        }
        return true;
    },

    validateUserCanSendMessage(tripId, userId, tripData) {
        // Verificamos que el usuario sea owner o walker del trip
        if (!tripData) {
            throw new Error("Paseo no encontrado");
        }
        
        const isOwner = tripData.ownerId === userId;
        const isWalker = tripData.walkerId === userId;
        
        if (!isOwner && !isWalker) {
            throw new Error("Usuario no autorizado para enviar mensajes en este paseo");
        }
        
        return true;
    },

    // Validar si el chat está habilitado según el estado del paseo
    validateChatEnabled(walkStatus) {
        const enabledStatuses = ['Activo'];
        return enabledStatuses.includes(walkStatus);
    },

    getChatStatusMessage(walkStatus) {
        switch (walkStatus) {
            case 'Agendado':
                return 'El chat se habilitará cuando el paseo esté activo';
            case 'Finalizado':
                return 'El paseo ha finalizado. El chat ya no está disponible';
            case 'Rechazado':
                return 'El paseo fue rechazado';
            case 'Solicitado':
                return 'El paseo está pendiente de confirmación';
            case 'Esperando pago':
                return 'El paseo está esperando confirmación de pago';
            case 'Activo':
                return 'Chat activo';
            default:
                return 'Estado del paseo no reconocido';
        }
    }
};