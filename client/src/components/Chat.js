import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Chat() {
    const loggedInUser = useSelector(state => state.chat.loggedInUser)
    let clickedUser = useSelector(state => state.chat.clickedUser)

    useEffect(() => {
        if (loggedInUser && clickedUser) {
            console.log(loggedInUser, clickedUser)
        }
    }, [loggedInUser, clickedUser])

    return (
        <div>

        </div>
    )
}

export default Chat
