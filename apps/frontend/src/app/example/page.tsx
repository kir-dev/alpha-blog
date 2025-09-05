'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '@/types/user';

export default function Groups() {
  const [inputValue, setInputValue] = useState<string>('');
  const [user, setUser] = useState<string>('Béla');
  const [realUser, setRealUser] = useState<User>();

  useEffect(() => {
    axios.get('http://localhost:3001/users/6').then((res) => {
      setRealUser(res.data);
      console.log(res.data);
    });
  }, [user]);

  return (
    <div className='flex flex-col justify-center min-h-screen bg-blue-900'>
      <div className='justify-center m-auto bg-blue-400 p-10 rounded-lg space-y-5'>
        <p>Hello</p>
        <p>{user}</p>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            console.log(e.target.value);
          }}
          className='border border-gray-300 rounded-md p-2'
        />
        <button
          className='border border-gray-300 rounded-md p-2'
          onClick={() => {
            setUser(inputValue);
          }}
        >
          Váltás
        </button>
      </div>
      <div className='flex justify-center m-auto bg-blue-400 p-10 rounded-lg space-y-5'>
        {realUser ? realUser.name : 'Bejelentkezés'}
      </div>
    </div>
  );
}
