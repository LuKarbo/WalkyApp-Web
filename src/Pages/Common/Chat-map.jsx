import { useState } from "react";
import {
    FiSend,
} from "react-icons/fi";

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
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="bg-card rounded-lg shadow-md p-4 h-[600px] flex flex-col">
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
                <form onSubmit={sendMessage} className="flex gap-2">
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
            <div className="md:col-span-2 h-[600px] bg-card rounded-lg shadow-md overflow-hidden flex items-center justify-center">
                <div className="text-center text-accent">
                    <p className="text-xl mb-2">Map View</p>
                    <p>Interactive map will be displayed here</p>
                </div>
            </div>
        </div>
    );
};

export default ChatMap;