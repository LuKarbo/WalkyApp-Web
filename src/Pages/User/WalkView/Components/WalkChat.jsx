import { useState, useEffect } from "react";
import { FiSend, FiMessageCircle } from "react-icons/fi";
import { ChatController } from "../../../../BackEnd/Controllers/ChatController";
import { useUser } from "../../../../BackEnd/Context/UserContext";

const WalkChat = ({ tripId, walkStatus }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [error, setError] = useState(null);

    const user = useUser();
    const userId = user?.id;
    const userName = user?.name || "Usuario";
    const userType = user?.type || "owner"; // 'owner' o 'walker'

    // Verificar si el chat está visible y si se pueden enviar mensajes
    const isChatVisible = ChatController.isChatVisible(walkStatus);
    const canSendMessages = ChatController.canSendMessages(walkStatus);
    const chatStatusMessage = ChatController.getChatStatusMessage(walkStatus);

    // Cargar mensajes al montar el componente
    useEffect(() => {
        if (tripId && userId) {
            loadMessages();
        }
    }, [tripId, userId]);

    const loadMessages = async () => {
        try {
            setLoading(true);
            setError(null);
            const chatMessages = await ChatController.fetchChatMessages(tripId);
            setMessages(chatMessages);
            
            // Marcar mensajes como leídos
            if (chatMessages.length > 0) {
                await ChatController.markMessagesAsRead(tripId, userId);
            }
        } catch (err) {
            setError('Error cargando mensajes: ' + err.message);
            console.error('Error loading chat messages:', err);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        
        if (!newMessage.trim() || !tripId || !userId || !canSendMessages) return;

        try {
            setSendingMessage(true);
            setError(null);
            
            const sentMessage = await ChatController.sendMessage(
                tripId, 
                userId, 
                userType, 
                userName, 
                newMessage
            );
            
            // Agregar mensaje a la lista
            setMessages(prev => [...prev, sentMessage]);
            setNewMessage("");
            
        } catch (err) {
            setError('Error enviando mensaje: ' + err.message);
            console.error('Error sending message:', err);
        } finally {
            setSendingMessage(false);
        }
    };

    // Función para determinar si el mensaje es del usuario actual
    const isCurrentUserMessage = (message) => {
        return message.sender === userType;
    };

    if (loading) {
        return (
            <div className="bg-foreground rounded-2xl shadow-md flex flex-col h-full border border-border mx-auto">
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-2 text-gray-600">Cargando chat...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-foreground rounded-2xl shadow-md flex flex-col h-full border border-border mx-auto">
            {/* Header del chat */}
            <div className="p-3 border-b border-border rounded-t-2xl">
                <div className="flex items-center gap-2">
                    <FiMessageCircle className="text-primary" size={20} />
                    <h3 className="font-semibold text-black">Chat del Paseo</h3>
                </div>
                <p className="text-xs text-gray-600 mt-1">Estado: {chatStatusMessage}</p>
                {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 ">
                {!isChatVisible ? (
                    <div className="text-center text-gray-500 mt-8 p-4">
                        <FiMessageCircle size={48} className="mx-auto mb-3 text-gray-400" />
                        <p className="font-medium">Chat no disponible</p>
                        <p className="text-sm">{chatStatusMessage}</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8 p-4">
                        <FiMessageCircle size={48} className="mx-auto mb-3 text-gray-400" />
                        <p className="font-medium">No hay mensajes aún</p>
                        <p className="text-sm">
                            {walkStatus === 'Finalizado' ? 
                                'El paseo ha finalizado' : 
                                '¡Inicia la conversación!'
                            }
                        </p>
                    </div>
                ) : (
                    messages.map((message, index) => {
                        const isCurrentUser = isCurrentUserMessage(message);
                        
                        return (
                            <div
                                key={message.id || index}
                                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-3`}
                            >
                                <div
                                    className={`max-w-[75%] rounded-lg p-3 shadow-sm ${
                                        isCurrentUser
                                            ? "bg-primary text-black rounded-br-sm"
                                            : "bg-black text-white rounded-bl-sm border"
                                    }`}
                                >
                                    {/* Nombre del usuario (solo para mensajes de otros) */}
                                    {!isCurrentUser && (
                                        <p className="text-xs font-medium text-gray-500 mb-1">
                                            {message.senderName}
                                        </p>
                                    )}
                                    
                                    {/* Contenido del mensaje */}
                                    <p className="break-words text-sm leading-relaxed">
                                        {message.text}
                                    </p>
                                    
                                    {/* Hora del mensaje */}
                                    <p className={`text-xs mt-2 ${
                                        isCurrentUser ? "text-gray-700" : "text-gray-500"
                                    } text-right`}>
                                        {message.time}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input de mensaje */}
            <form
                onSubmit={sendMessage}
                className={`flex gap-2 mb-2 px-3 py-2 border-t border-border rounded-b-2xl ${
                    !canSendMessages ? 'opacity-50' : ''
                }`}
            >
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={
                        walkStatus === 'Finalizado' 
                            ? "El paseo ha finalizado - No se pueden enviar mensajes" 
                            : canSendMessages 
                                ? "Escribe tu mensaje..." 
                                : "Chat no disponible"
                    }
                    disabled={sendingMessage || !canSendMessages}
                    className="flex-1 px-4 py-2 rounded-full border border-gray-300
                               bg-gray-50 text-gray-900 text-sm
                               placeholder:text-gray-500
                               focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200"
                />
                <button
                    type="submit"
                    disabled={sendingMessage || !newMessage.trim() || !canSendMessages}
                    className="bg-primary text-white p-2 rounded-full hover:bg-opacity-90 
                               transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                               flex items-center justify-center min-w-[40px] min-h-[40px]
                               shadow-md hover:shadow-lg"
                >
                    {sendingMessage ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                        <FiSend size={16} />
                    )}
                </button>
            </form>
        </div>
    );
};

export default WalkChat;