import React from 'react'

function Person({ username }) {
    return (
        <div className='border-b-2 p-2 hover:cursor-pointer hover:border-black transition'>
            <h5>{username}</h5>
        </div>
    )
}

export default Person
