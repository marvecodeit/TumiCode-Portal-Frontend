import { useEffect, useState, useRef } from "react";
import socket from "../api/socket.js";
import { fetchChatMessages } from "../api/chat.api.js";
import { useAuth } from "../components/AuthContext.jsx";
import "./ChatPage.css";

const ChatPage = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    if (!socket.connected) socket.connect();

    const loadHistory = async () => {
      const history = await fetchChatMessages();
      setMessages(history);
    };

    loadHistory();

    socket.on("receive-message", (msg) => {
      setMessages((prev) => {
        // ✅ prevent duplicates
        if (prev.some((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    });

    return () => {
      socket.off("receive-message");
    };
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit(
      "send-message",
      {
        senderId: user._id,
        senderName: user.name,
        role: user.role,
        text: message,
      },
      (res) => {
        if (!res?.success) {
          console.error("❌ Message failed");
        }
      }
    );

    setMessage("");
  };

  return (
    <div className="chat-container">
      <h2>Global Chat</h2>

      <div className="chat-box">
        {messages.map((msg) => {
          const isMe = msg.senderId === user._id;

          return (
            <div
              key={msg._id}
              className={`chat-message ${isMe ? "me" : "other"}`}
            >
              {!isMe && (
                <span className="sender">
                  {msg.senderName}
                  {msg.role === "admin" && " (Admin)"}
                </span>
              )}
              <p>{msg.text}</p>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
