// ChatApp.jsx
import  { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    { id: 2, text: "I need some information on your services.", sender: "user" }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: "user" }]);
      setNewMessage('');

      // Simulate bot response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: "This is a simulated bot response.", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      <div className="bg-white rounded shadow-lg w-full md:w-1/2 lg:w-1/3">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-center">Chat Application</h1>
        </div>
        <div className="p-4 flex flex-col space-y-4 overflow-auto h-64">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t flex space-x-4">
          <input
            type="text"
            className="flex-1 border rounded p-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t text-center">
        <Link
          to="/"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ChatApp;
