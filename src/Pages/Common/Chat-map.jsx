//la idea es 1) que est ecomponente abarque todo el fondo gris, 2) arreglar los color modo oscuro/claro
//3)que cargue el mapa; 4) poder guardar una marca en el mapa (local storage); 5) unir los puntos mediante lineas en el mapa
//ver acceso a la api de google
import { useState } from "react";
import {
    FiSend,
} from "react-icons/fi";
import Map from "./ChatMapComponents/Map"

const ChatMap = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { text: newMessage, sender: "user" }]);
            setNewMessage("");
        }
    };

    return (
        <div className="mx-auto px-4 py-8 h-[80vh] grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="bg-card rounded-lg shadow-md  flex flex-col h-full">
                <div className="flex-1 overflow-y-auto mb-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}
                        >
                            <div
                                className={`inline-block px-4 py-2 rounded-lg ${message.sender === "user" ? "bg-primary text-white" : "bg-muted"}`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={sendMessage} className="flex gap-2 mb-2 px-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="bg-primary text-white p-2 rounded-md hover:bg-opacity-90"
                    >
                        <FiSend size={20} />
                    </button>
                </form>
            </div>

            {/* Map Placeholder */}
            <div className="md:col-span-2 bg-card rounded-lg shadow-md overflow-hidden h-full">
                <Map />
            </div>
        </div>
    );
};

export default ChatMap;