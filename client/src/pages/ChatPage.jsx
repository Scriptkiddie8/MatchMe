import React, { useState, useEffect } from "react";
import { socket } from "../utils/socket";

const ChatPage = ({ currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("receive-message");
  }, []);

  const sendMessage = () => {
    if (newMsg.trim() === "") return;
    const msg = { text: newMsg, sender: currentUserId };
    socket.emit("send-message", msg);
    setMessages((prev) => [...prev, msg]);
    setNewMsg("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="chat-window h-64 overflow-y-auto p-2 bg-white rounded-lg mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 my-1 rounded-lg ${
              m.sender === currentUserId
                ? "bg-blue-100 text-right"
                : "bg-pink-100 text-left"
            }`}
          >
            <b>{m.sender === currentUserId ? "You" : "Them"}:</b> {m.text}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
