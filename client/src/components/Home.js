import React from 'react'
import Person from './Person'

function Home() {
    return (
        <div className='h-3/4 w-3/4 p-5 rounded-2xl bg-slate-100 flex'>
            <div className='people w-3/12 h-full'>
                <h2 className='w-fit mx-auto'>People</h2>
                
                <div className='people-list py-3'>
                    <Person username={'haris'} />
                </div>
            </div>

            <div className='chat w-3/4'>

            </div>
        </div>
    )
}

export default Home
