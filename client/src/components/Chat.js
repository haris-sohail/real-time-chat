import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import InputText from './InputText'; 

const socket = io('http://localhost:3001');

function Chat() {
    const loggedInUser = useSelector(state => state.chat.loggedInUser);
    const clickedUser = useSelector(state => state.chat.clickedUser);
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loggedInUser) {
            socket.emit('new-user', loggedInUser);

            socket.on('user-connected', name => {
                console.log(`User connected: ${name}`);
            });

            socket.on('user-disconnected', name => {
                console.log(`User disconnected: ${name}`);
            });

            socket.on('receive-message', message => {
                setReceivedMessages(prevMessages => [...prevMessages, message]);
            });
        }

        return () => {
            socket.off('user-connected');
            socket.off('user-disconnected');
            socket.off('receive-message');
        };
    }, [loggedInUser]);

    const fetchSentMessages = () => {
        return axios.get(`http://localhost:3001/message/messages/${loggedInUser}/${clickedUser}`)
            .then(res => {
                if (res.data) {
                    setSentMessages(res.data);
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const fetchReceivedMessages = () => {
        return axios.get(`http://localhost:3001/message/messages/${clickedUser}/${loggedInUser}`)
            .then(res => {
                if (res.data) {
                    setReceivedMessages(res.data);
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (loggedInUser && clickedUser) {
            setLoading(true);
            Promise.all([fetchSentMessages(), fetchReceivedMessages()]).then(() => setLoading(false));
        }
    }, [loggedInUser, clickedUser]);

    // Combine and sort messages by timestamp
    const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    if (loading) {
        return (
            <div className="flex flex-col p-2 h-full overflow-y-scroll custom-scrollbar">
                {clickedUser && (
                    <h2 className='mb-4 text-center'>Chat with {clickedUser}</h2>
                )}
                <div className="flex flex-1 items-center justify-center">
                    <em><h4>Loading...</h4></em>
                </div>
            </div>
        );
    }

    if (!loading && clickedUser && allMessages.length === 0) {
        return (
            <div className="flex flex-col p-2 h-full overflow-y-scroll custom-scrollbar">
                {clickedUser && (
                    <h2 className='mb-4 text-center'>Chat with {clickedUser}</h2>
                )}
                <div className="flex flex-1 items-center justify-center">
                    <em><h4>Start the conversation</h4></em>
                </div>
                <InputText socket={socket} loggedInUser={loggedInUser} clickedUser={clickedUser} />
            </div>
        );
    } else {
        return (
            <div className="flex flex-col p-2 h-full overflow-y-scroll custom-scrollbar">
                {clickedUser && (
                    <h2 className='mb-4 text-center'>Chat with {clickedUser}</h2>
                )}
                {allMessages.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.sender_username === loggedInUser ? 'text-right' : 'text-left'}`}>
                        <span className={`${message.sender_username === loggedInUser ? 'bg-customPurpleLight' : 'bg-customPurpleLight'} px-2 py-1 rounded`}>
                            {message.message}
                        </span>
                        <p className='text-sm p-1 text-gray-500'>{new Date(message.timestamp).toLocaleString()}</p>
                    </div>
                ))}
                <InputText socket={socket} />
            </div>
        );
    }
}

export default Chat;
