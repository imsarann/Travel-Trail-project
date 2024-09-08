import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newMessage = { text: userInput, type: "sender" };
      setMessages([...messages, newMessage]);
      let data = userInput + " ";
      data = JSON.stringify({ question: data });
      axios
        .post("http://localhost:5000/chatbot/question", { question: data })
        .then((response) => {
          const serverMessage = { text: response.data, type: "receiver" };
          setMessages((prevMessages) => [...prevMessages, serverMessage]);
        })
        .catch((error) => {
          console.error("There was an error communicating with the server!", error);
        });

      setUserInput("");
    }
  };

  return (
    <div className="chat-bot">
      <div className="card">
        <div className="chat-header p-3">Chat</div>
        <div className="chat-window">
          <ul className="message-list">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`message-item mr-2 ${message.type}`}
              >
                {message.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-input d-flex flex-row align-items-center">
          <input
            type="text"
            className="message-input"
            placeholder="Type your message here"
            value={userInput}
            onChange={handleInputChange}
          />
          <svg xmlns="http://www.w3.org/2000/svg" onClick={handleSendMessage} width="16" height="16" fill="currentColor" className="bi bi-send-fill ml-3 mr-2 send-img" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
        </svg>
        </div>
      </div>
    </div>
  );
}
