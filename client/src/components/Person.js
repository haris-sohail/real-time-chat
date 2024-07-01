import React from 'react'
import { useDispatch } from 'react-redux'
import { setClickedUser, setLoggedInUser } from '../ChatSlice'

function Person({ loggedInUsername, username }) {
    const dispatch = useDispatch()

    const handlePersonClick = () => {
        // set clicked user and loggedin user in redux store
        console.log("setClickedUser",username)
        console.log("loggedInUsername",loggedInUsername)
        dispatch(setClickedUser(username))
        dispatch(setLoggedInUser(loggedInUsername))
    }
    return (
        <div onClick={handlePersonClick} className='border-b-2 p-2 hover:cursor-pointer hover:border-black transition'>
            <h5>{username}</h5>
        </div>
    )
}

export default Person
