import React, { useEffect, useState } from 'react';
import Person from './Person';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Chat from './Chat';
import { useDispatch } from 'react-redux';
import { setClickedUser, setLoggedInUser } from '../ChatSlice';

function Home() {
    const useEffectCalled = false;
    const [users, setUsers] = useState([]);
    const [usersComponents, setUsersComponents] = useState([]);
    const location = useLocation();
    const data = location.state;
    const username = data.username;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // Scroll effects
    useEffect(() => {
        const peopleList = document.querySelector('.people-list');

        peopleList.classList.add('hide-scrollbar');

        // Add event listeners for showing and hiding scrollbar
        peopleList.addEventListener('mouseenter', () => {
            peopleList.classList.remove('hide-scrollbar');
        });

        peopleList.addEventListener('mouseleave', () => {
            if (!peopleList.classList.contains('scrolling')) {
                peopleList.classList.add('hide-scrollbar');
            }
        });

        peopleList.addEventListener('scroll', () => {
            peopleList.classList.add('scrolling');
            clearTimeout(peopleList.scrollTimeout);
            peopleList.scrollTimeout = setTimeout(() => {
                peopleList.classList.remove('scrolling');
                if (!peopleList.matches(':hover')) {
                    peopleList.classList.add('hide-scrollbar');
                }
            }, 1000);
        });

        // Cleanup event listeners on component unmount
        return () => {
            peopleList.removeEventListener('mouseenter', () => {
                peopleList.classList.remove('hide-scrollbar');
            });

            peopleList.removeEventListener('mouseleave', () => {
                if (!peopleList.classList.contains('scrolling')) {
                    peopleList.classList.add('hide-scrollbar');
                }
            });

            peopleList.removeEventListener('scroll', () => {
                peopleList.classList.add('scrolling');
                clearTimeout(peopleList.scrollTimeout);
                peopleList.scrollTimeout = setTimeout(() => {
                    peopleList.classList.remove('scrolling');
                    if (!peopleList.matches(':hover')) {
                        peopleList.classList.add('hide-scrollbar');
                    }
                }, 1000);
            });
        };
    }, []);

    const getAllUsers = async () => {
        axios.get('http://localhost:3001/users')
            .then(res => {
                if (res.data) {
                    setUsers(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            });
    };

    useEffect(() => {
        setLoading(true)
        if (!useEffectCalled) {
            getAllUsers();
        }
    }, []);

    useEffect(() => {
        if (users) {
            const usersComp = users.map(user => {
                if (user.username !== username) {
                    return <Person
                        key={user.user_id}
                        loggedInUsername={username}
                        username={user.username}
                    />;
                }
            });

            setUsersComponents(usersComp);
        }
    }, [users]);

    const handleLogOut = () => {
        dispatch(setLoggedInUser(''))
        dispatch(setClickedUser(''))
        navigate('/login');
    };

    if (loading) {
        return <h1 className='h-screen flex items-center justify-center'>Loading...</h1>;
    } else {
        return (
            <div className='w-full h-full flex items-center justify-center flex-col'>
                <div className='first-row w-3/4 flex justify-between items-center p-5'>
                    <h1 className='text-4xl'>Welcome <span className='text-customPurple'>{username}</span></h1>
                    <button onClick={handleLogOut}
                        className='border-2 p-2 border-red-300 rounded-xl hover:bg-red-200 transition'>
                        LOGOUT
                    </button>
                </div>

                <div className='h-3/4 w-3/4 p-5 rounded-2xl bg-slate-100 flex'>
                    <div className='people w-3/12 h-full flex flex-col'>
                        <h2 className='w-fit mx-auto'>People</h2>

                        <div className='people-list py-3 overflow-y-auto custom-scrollbar flex-grow'>
                            {usersComponents}
                        </div>
                    </div>

                    <div className='chat w-3/4 h-full flex flex-col'>
                        <Chat />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
