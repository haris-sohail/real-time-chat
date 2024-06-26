import React, { useState } from 'react'
import msgIcon from '../assets/msg.png'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate()

    const isFieldsNotEmpty = () => {
        // email, password or username can not be empty
        if (!password || !username) {
            toast.error("Please fill all the fields")
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters")
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFieldsNotEmpty()) {
            try {
                const res = await axios.post('http://localhost:3001/register', { username, password });

                // navigate to login page
                navigate('/login')
            } catch (err) {
                // if error code 409 then user already exists
                if (err.response.status === 409) {
                    toast.error("Username already exists")
                } else {
                    toast.error("Something went wrong")
                }
            }
        }
    }

    const handleLogin = () => {
        navigate('/login')
    }

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
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='border-b-2 rounded p-2 border-customPurpleLight focus:bg-customPurpleLight focus:outline-none'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button onClick={handleSubmit} className='bg-gradient-to-r-custom
                        from-customPurple to-customPurpleLight text-white rounded-md p-2'><h5>SIGNUP</h5></button>
                         <button onClick={handleLogin} className='bg-gradient-to-r-custom
                        from-customPurple to-customPurpleLight text-white rounded-md p-2'><h5>LOGIN</h5></button>
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
