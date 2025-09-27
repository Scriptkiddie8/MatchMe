import React, { useEffect, useState } from "react";
import { socket } from "../utils/socket ";

const ChatWindow = ({ roomId, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [roomId]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    const msgData = { roomId, text: newMsg, sender: currentUserId };
    socket.emit("sendMessage", msgData);
    setNewMsg("");
  };

  return (
    <div>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid gray",
          padding: "5px",
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.sender === currentUserId ? "You" : "Them"}:</b> {m.text}
          </p>
        ))}
      </div>
      <input
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
