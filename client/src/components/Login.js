import React, { useState } from 'react'
import msgIcon from '../assets/msg.png'
import { toast } from 'react-hot-toast';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
          toast.success('Login successful');
      } else {
          setError(data.error || 'An error occurred');
          toast.error(data.error || 'An error occurred');
      }
    };
    return (
        <div className='h-screen flex w-full'>
            <div className='left flex justify-center items-center flex-1'>
                <div className='w-1/2 flex flex-col gap-5'>
                    <h1 className='mx-auto'>LOGIN</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='border-b-2 rounded p-2 border-customPurpleLight focus:bg-customPurpleLight focus:outline-none'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border-b-2 rounded p-2 border-customPurpleLight focus:bg-customPurpleLight focus:outline-none'
                        />
                        <button className='bg-gradient-to-r-custom from-customPurple to-customPurpleLight text-white rounded-md p-2'>
                            <h5>LOGIN</h5>
                        </button>
                    </form>
                </div>
            </div>
            <div className='right flex items-center justify-center flex-1 bg-gradient-to-r-custom from-customPurple to-customPurpleLight'>
                <img src={msgIcon} alt='msgIcon' className='w-1/3' />
            </div>
        </div>
    );
}

export default Login;
