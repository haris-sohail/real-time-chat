import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const InputText = ({ socket}) => {
const loggedInUser = useSelector(state => state.chat.loggedInUser);
const clickedUser = useSelector(state => state.chat.clickedUser);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    setIsSending(true);
    console.log("loggedInUser: ",loggedInUser,"clickedUser: ",clickedUser)
    try {
    //   await axios.post('http://localhost:3001/message/messages', {
    //     sender_username: loggedInUser,
    //     receiver_username: clickedUser,
    //     message: message
    //   });
      socket.emit('send-chat-message', {
        sender_username: loggedInUser,
        receiver_username: clickedUser,
        message
      });
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err.response);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', borderTop: '1px solid #ddd' }}>
      <input
        type="text"
        style={{
          flex: 1,
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          outline: 'none',
        }}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isSending}
      />
      <button
        style={{
          marginLeft: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          outline: 'none',
          opacity: isSending ? 0.6 : 1,
        }}
        onClick={sendMessage}
        disabled={isSending}
      >
        Send
      </button>
    </div>
  );
};

export default InputText;
