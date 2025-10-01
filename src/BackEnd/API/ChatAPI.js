export const ChatAPI = {
    async getChatMessages(tripId) {
        const mockChats = {
            "1": {
                chatId: 1,
                messages: [
                    {
                        id: 1,
                        senderId: 2,
                        senderName: "María Cliente",
                        senderType: "owner",
                        content: "Hola Sarah, ¿todo listo para el paseo de Max?",
                        sentAt: "2024-01-20T09:45:00.000Z",
                        isRead: true
                    },
                    {
                        id: 2,
                        senderId: 6,
                        senderName: "Sarah Johnson",
                        senderType: "walker",
                        content: "¡Hola María! Sí, estoy llegando al punto de encuentro. Max se ve muy emocionado",
                        sentAt: "2024-01-20T09:50:00.000Z",
                        isRead: true
                    },
                    {
                        id: 3,
                        senderId: 6,
                        senderName: "Sarah Johnson",
                        senderType: "walker",
                        content: "Comenzamos el paseo. Max está muy activo hoy",
                        sentAt: "2024-01-20T10:05:00.000Z",
                        isRead: true
                    },
                    {
                        id: 4,
                        senderId: 6,
                        senderName: "Sarah Johnson",
                        senderType: "walker",
                        content: "Todo perfecto, Max ha hecho ejercicio y socializado con otros perros",
                        sentAt: "2024-01-20T10:30:00.000Z",
                        isRead: true
                    },
                    {
                        id: 5,
                        senderId: 6,
                        senderName: "Sarah Johnson",
                        senderType: "walker",
                        content: "Regresando a casa. Max está feliz pero cansado",
                        sentAt: "2024-01-20T10:55:00.000Z",
                        isRead: true
                    },
                    {
                        id: 6,
                        senderId: 2,
                        senderName: "María Cliente",
                        senderType: "owner",
                        content: "¡Perfecto! Muchas gracias Sarah, Max se ve muy contento",
                        sentAt: "2024-01-20T11:05:00.000Z",
                        isRead: false
                    }
                ]
            },
            "2": {
                chatId: 2,
                messages: [
                    {
                        id: 7,
                        senderId: 2,
                        senderName: "María Cliente",
                        senderType: "owner",
                        content: "¿A qué hora comenzamos el paseo?",
                        sentAt: "2024-01-20T11:00:00.000Z",
                        isRead: false
                    },
                    {
                        id: 8,
                        senderId: 7,
                        senderName: "Mike Wilson",
                        senderType: "walker",
                        content: "Hola María, puedo estar allí a las 11:30",
                        sentAt: "2024-01-20T11:15:00.000Z",
                        isRead: true
                    }
                ]
            },
            "3": {
                chatId: 3,
                messages: [
                    {
                        id: 9,
                        senderId: 6,
                        senderName: "Sarah Johnson",
                        senderType: "owner",
                        content: "Hola Emma, ¿cómo va todo con Bella?",
                        sentAt: "2024-01-20T14:15:00.000Z",
                        isRead: true
                    },
                    {
                        id: 10,
                        senderId: 8,
                        senderName: "Emma Davis",
                        senderType: "walker",
                        content: "Todo excelente, Bella está disfrutando mucho del parque",
                        sentAt: "2024-01-20T14:20:00.000Z",
                        isRead: true
                    },
                    {
                        id: 11,
                        senderId: 8,
                        senderName: "Emma Davis",
                        senderType: "walker",
                        content: "Le encanta explorar los nuevos olores",
                        sentAt: "2024-01-20T14:45:00.000Z",
                        isRead: true
                    },
                    {
                        id: 12,
                        senderId: 8,
                        senderName: "Emma Davis",
                        senderType: "walker",
                        content: "Ya volvemos, Bella se portó increíble",
                        sentAt: "2024-01-20T15:20:00.000Z",
                        isRead: true
                    },
                    {
                        id: 13,
                        senderId: 6,
                        senderName: "Sarah Johnson",
                        senderType: "owner",
                        content: "¡Gracias Emma! Bella parece muy relajada",
                        sentAt: "2024-01-20T15:30:00.000Z",
                        isRead: false
                    }
                ]
            }
        };
        
        return mockChats[tripId] || {
            chatId: null,
            messages: []
        };
    },

    async sendMessage(messageData) {
        console.log('Enviando mensaje:', messageData);
        
        // Simular llamada a sp_walk_chat_send_message
        // En producción esto llamaría: POST /api/walks/:walkId/chat/messages
        const newMessage = {
            id: Date.now(),
            senderId: messageData.senderId,
            senderName: messageData.senderName,
            senderType: messageData.senderType,
            content: messageData.message,
            sentAt: new Date().toISOString(),
            isRead: false
        };
        
        console.log('Mensaje enviado:', newMessage);
        return newMessage;
    },

    async markMessagesAsRead(tripId, userId) {
        console.log(`Marcando mensajes como leídos para el paseo ${tripId}, usuario ${userId}`);
        
        // Simular llamada a sp_walk_chat_mark_read
        // En producción esto llamaría: PUT /api/walks/:walkId/chat/messages/read
        
        return { 
            success: true, 
            messagesMarked: Math.floor(Math.random() * 3) + 1,
            tripId, 
            userId 
        };
    },

    async getUnreadCount(userId) {
        console.log(`Obteniendo mensajes no leídos para usuario ${userId}`);
        
        // Simular llamada a sp_walk_chat_unread_count
        // En producción esto llamaría: GET /api/users/:userId/chat/unread-count
        
        return { 
            unreadCount: Math.floor(Math.random() * 5) 
        };
    }
};