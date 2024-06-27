import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
import axios from 'axios'

const socket = io('http://localhost:3001');

function Chat() {
    let useEffectCalled = false
    const loggedInUser = useSelector(state => state.chat.loggedInUser)
    let clickedUser = useSelector(state => state.chat.clickedUser)
    const [sentMessages, setSentMessages] = useState([])
    const [receivedMessages, setReceivedMessages] = useState([])

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
        axios.get(`http://localhost:3001/message/messages/${loggedInUser}/${clickedUser}`)
            .then(res => {
                if (res.data) {
                    setSentMessages(res.data)
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchReceivedMessages = () => {
        axios.get(`http://localhost:3001/message/messages/${clickedUser}/${loggedInUser}`)
            .then(res => {
                if (res.data) {
                    setReceivedMessages(res.data)
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        // fetch messages between loggedInUser and clickedUser
        if (loggedInUser && clickedUser) {
            fetchSentMessages()
            fetchReceivedMessages()
        }
    }, [loggedInUser, clickedUser])

    return (
        <div>

        </div>
    )
}

export default Chat
