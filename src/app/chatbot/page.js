"use client"

import Loading from '@/components/Loading';
import Nav from '@/components/Nav';
import React, { useState } from 'react';

// Replace with  Gemini API key
// ai api ta testing ar jonno chilo aita delete kore dichi
const API = process.env.NEXT_PUBLIC_GEMINI_API;

const apiKey = API; // Replace with your actual Gemini API key

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendToChatbot = async (input) => {
    try {
      // Make the API request
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: input
            }]
          }]
        }),
      });

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();

      // Log the full response for debugging
      console.log('API Response:', data);

      // Check if the response contains the expected structure
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        return 'Error: No valid response from API';
      }
    } catch (error) {
      console.error('Error with Gemini API:', error);
      return `Error with Gemini API: ${error.message}`;
    }
  };

  const handleSendClick = async () => {
    if (userInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: userInput },
      ]);
      setLoading(true);

      const response = await sendToChatbot(userInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response },
      ]);

      setUserInput('');
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div  className='overflow-hidden'>
      <Nav/>
      <Loading/>
      <div style={styles.titleBar}>
        <div style={styles.title}>AI Chat Assistant</div>
      </div>
      <div style={styles.mainFrame}>
        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(msg.sender === 'user' ? styles.userMessage : styles.botMessage),
              }}
            >
              <div style={styles.messageBubble}>
                <div style={styles.messageHeader}>
                  {msg.sender === 'user' ? 'You' : 'Bot'}
                </div>
                <div style={styles.messageContent}>
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} style={styles.messageLine}>{line}</p>
                  ))}
                </div>
                <div style={styles.messageTime}>
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.inputFrame}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here and press Enter to send..."
            style={styles.input}
          />
          <button
            onClick={handleSendClick}
            disabled={loading}
            style={{
              ...styles.sendButton,
              ...(loading ? styles.sendButtonDisabled : {})
            }}
          >
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  window: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#1a1a1a',
    overflow: 'hidden', // Prevent window level scrolling
  },
  titleBar: {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    height: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
    borderBottom: '1px solid #333',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  mainFrame: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#2b2b2b',
    borderRadius: '15px',
    margin: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    height: 'calc(100vh - 50px)', // Account for titleBar height
    overflow: 'hidden', // Prevent mainFrame scrolling
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto',
    padding: '15px',
    backgroundColor: '#1e1e1e',
    color: 'white',
    fontSize: '14px',
    borderRadius: '10px',
    marginBottom: '15px',
    height: 'calc(100% - 80px)', // Account for inputFrame height
  },
  message: {
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column',
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: '#333',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  messageHeader: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#007acc',
  },
  messageContent: {
    wordBreak: 'break-word',
  },
  messageLine: {
    margin: '5px 0',
  },
  messageTime: {
    fontSize: '10px',
    color: '#888',
    marginTop: '5px',
    textAlign: 'right',
  },
  inputFrame: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#333',
    borderRadius: '10px',
    marginTop: 'auto', // Push to bottom
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#222',
    color: 'white',
    transition: 'border-color 0.3s',
    '&:focus': {
      borderColor: '#007acc',
      outline: 'none',
    },
  },
  sendButton: {
    padding: '12px 24px',
    backgroundColor: '#007acc',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#005999',
    },
  },
  sendButtonDisabled: {
    backgroundColor: '#444',
    cursor: 'not-allowed',
  },
};

export default App;
