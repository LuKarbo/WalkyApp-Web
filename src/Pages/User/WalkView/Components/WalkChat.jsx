import { useState } from "react";
import { FiSend } from "react-icons/fi";

const WalkChat = () => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { text: newMessage, sender: "user" }]);
            setNewMessage("");
        }
    };

    return(
    <div className="bg-foreground rounded-2xl shadow-md flex flex-col h-full border border-border mx-auto">
        <div className="flex-1 overflow-y-auto mb-4 p-3">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"
                        }`}
                >
                    <div
                        className={`inline-block px-4 py-2 rounded-lg text-body ${message.sender === "user"
                            ? "bg-primary text-black"
                            : "bg-muted text-foreground"
                            }`}
                    >
                        {message.text}
                    </div>
                </div>
            ))}
        </div>

        <form
            onSubmit={sendMessage}
            className="flex gap-2 mb-2 px-2 border-t border-border pt-2"
        >
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 rounded-md border border-primary 
                                   bg-foreground text-black 
                                   placeholder:text-neutral 
                                   focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
                type="submit"
                className="bg-primary text-white p-2 rounded-md hover:bg-opacity-90 btn-neon-hover"
            >
                <FiSend size={20} />
            </button>
        </form>
    </div>
    );
}

export default WalkChat;