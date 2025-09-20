export const ChatAPI = {
    async getChatMessages(tripId) {
        // Simulamos datos de chat por tripId
        const mockChats = {
            "W001": [
                {
                    id: "MSG001",
                    tripId: "W001",
                    senderId: 3,
                    senderType: "owner",
                    senderName: "María García",
                    message: "Hola, ¿cómo va el paseo con Max?",
                    timestamp: "2024-01-20T10:15:00",
                    read: true
                },
                {
                    id: "MSG002",
                    tripId: "W001",
                    senderId: 1,
                    senderType: "walker",
                    senderName: "Sarah Johnson",
                    message: "¡Todo perfecto! Max está muy contento y enérgico",
                    timestamp: "2024-01-20T10:17:00",
                    read: true
                },
                {
                    id: "MSG003",
                    tripId: "W001",
                    senderId: 3,
                    senderType: "owner", 
                    senderName: "María García",
                    message: "Genial, muchas gracias por cuidarlo tan bien",
                    timestamp: "2024-01-20T10:20:00",
                    read: false
                }
            ],
            "W002": [
                {
                    id: "MSG004",
                    tripId: "W002",
                    senderId: 3,
                    senderType: "owner",
                    senderName: "María García", 
                    message: "¿A qué hora comenzamos el paseo?",
                    timestamp: "2024-01-20T11:00:00",
                    read: false
                }
            ],
            "W003": [
                {
                    id: "MSG005",
                    tripId: "W003",
                    senderId: 3,
                    senderType: "owner",
                    senderName: "María García",
                    message: "Hola, ¿cómo va el paseo con Mimi?",
                    timestamp: "2024-01-20T10:15:00",
                    read: true
                },
                {
                    id: "MSG006",
                    tripId: "W003",
                    senderId: 1,
                    senderType: "walker",
                    senderName: "María García",
                    message: "¡Todo perfecto! Como yo nadie te va a cuidar a Mimi",
                    timestamp: "2024-01-20T10:17:00",
                    read: true
                },
                {
                    id: "MSG007",
                    tripId: "W003",
                    senderId: 3,
                    senderType: "owner", 
                    senderName: "María García",
                    message: "Genial, sos mi heroe!",
                    timestamp: "2024-01-20T10:20:00",
                    read: false
                }
            ],
        };

        // Simulamos delay de red
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return mockChats[tripId] || [];
    },

    async sendMessage(messageData) {
        console.log('Enviando mensaje:', messageData);
        
        // Simulamos creación de mensaje
        const newMessage = {
            id: `MSG${String(Date.now()).slice(-6)}`,
            tripId: messageData.tripId,
            senderId: messageData.senderId,
            senderType: messageData.senderType,
            senderName: messageData.senderName,
            message: messageData.message,
            timestamp: new Date().toISOString(),
            read: false
        };

        // Simulamos delay de envío
        await new Promise(resolve => setTimeout(resolve, 200));
        
        console.log('Mensaje enviado:', newMessage);
        return newMessage;
    },

    async markMessagesAsRead(tripId, userId) {
        console.log(`Marcando mensajes como leídos para el paseo ${tripId}, usuario ${userId}`);
        
        // Simulamos marcado como leído
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return { success: true, tripId, userId, markedAt: new Date().toISOString() };
    },

    async getUnreadCount(userId) {
        // Simulamos conteo de mensajes no leídos
        await new Promise(resolve => setTimeout(resolve, 150));
        
        return Math.floor(Math.random() * 5); // Número aleatorio para demo
    }
};