import React from 'react'
import msgIcon from '../assets/msg.png'

function Signup() {
    return (
        <div className='h-screen flex w-full'>

            <div className='left flex justify-center items-center flex-1'>

                <div className='w-1/2 flex flex-col gap-5'>

                    <h1 className='mx-auto'>SIGNUP</h1>

                    <form className='flex flex-col gap-5'>
                        <input
                            type='text'
                            placeholder='Username'
                            className='border-b-2 rounded p-2 border-customPurpleLight focus:bg-customPurpleLight focus:outline-none'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='border-b-2 rounded p-2 border-customPurpleLight focus:bg-customPurpleLight focus:outline-none'
                        />

                        <button className='bg-gradient-to-r-custom
                        from-customPurple to-customPurpleLight text-white rounded-md p-2'><h5>SIGNUP</h5></button>
                    </form>

                </div>

            </div>
            <div
                className='right flex items-center justify-center flex-1 bg-gradient-to-r-custom
                from-customPurple to-customPurpleLight'>

                <img src={msgIcon} alt='msgIcon' className='w-1/3' />
            </div>
        </div>
    )
}

export default Signup
