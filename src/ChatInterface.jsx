// src/ChatInterface.jsx
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { getMediaRecommendation } from './ai'; 

function ChatInterface({ onBack }) {
  // --- STATE ---
  const [myList, setMyList] = useState([]);
  const [newMedia, setNewMedia] = useState(""); 
  
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: "Hi! I'm your AI Movie Buff. Add movies or TV shows to your list, then ask me for recommendations!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auto-scroll
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chatHistory]);

  // --- HANDLERS ---

  // 1. Add Movie/Series to Sidebar
  const addMedia = () => {
    if (!newMedia.trim()) return;
    setMyList([...myList, newMedia]);
    setNewMedia("");
  };

  const removeMedia = (index) => {
    const newList = [...myList];
    newList.splice(index, 1);
    setMyList(newList);
  };

  // 2. Handle Chat Interaction
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;

    // Add User Message immediately
    const userMessage = { role: 'user', content: chatInput };
    setChatHistory(prev => [...prev, userMessage]);
    const currentInput = chatInput;
    setChatInput(""); 
    setIsLoading(true);

    try {
      // Call the AI function
      const aiResponseText = await getMediaRecommendation(myList, currentInput);
      
      const aiMessage = { role: 'ai', content: aiResponseText };
      setChatHistory(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("App Error:", error);
      const errorMessage = `⚠️ Error: ${error.message || "Unknown error occurred"}. \n\nCheck the Console (F12) for details.`;
      
      setChatHistory(prev => [...prev, { role: 'ai', content: errorMessage }]);
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendChat();
  };

  return (
    <div className="app-container">
      
      {/* LEFT SIDEBAR: Watch History */}
      <div className="sidebar">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2>🎬 My Watchlist</h2>
            {/* BACK BUTTON TO HOME */}
            <button onClick={onBack} style={{background: 'transparent', border: '1px solid #555', color: '#aaa', cursor: 'pointer', padding: '5px 10px', borderRadius: '4px'}}>
                Exit
            </button>
        </div>
        
        <div className="add-anime-form">
          <input 
            value={newMedia}
            onChange={(e) => setNewMedia(e.target.value)}
            placeholder="Add movie (e.g. Inception)"
            onKeyDown={(e) => e.key === 'Enter' && addMedia()}
          />
          <button onClick={addMedia}>+</button>
        </div>

        <ul className="anime-list">
          {myList.length === 0 && <li style={{color: '#666', fontStyle: 'italic'}}>List is empty...</li>}
          {myList.map((item, index) => (
            <li key={index} className="anime-item">
              {item}
              <span className="remove-btn" onClick={() => removeMedia(index)}>×</span>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT MAIN: Chat Interface */}
      <div className="chat-container">
        <div className="chat-header">
            AI Movie/series Recommendation 
        </div>

        <div className="messages-area">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          {isLoading && <div className="message ai">Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input 
            className="chat-input"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask for a movie suggestion..."
            disabled={isLoading}
          />
          <button className="send-btn" onClick={handleSendChat} disabled={isLoading}>
            Send
          </button>
        </div>
      </div>

    </div>
  );
}

export default ChatInterface;