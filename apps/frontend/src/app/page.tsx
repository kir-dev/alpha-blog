'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import axiosApi from '@/lib/apiSetup';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('http://localhost:3001/auth/login');
  };

  const [me, setMe] = useState<User>();

  useEffect(() => {
    axiosApi.get('http://localhost:3001/users/me').then((res) => {
      setMe(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className='min-h-screen flex w-full'>
      <button
        className='m-auto bg-green-900 text-white p-5 rounded-2xl items-center justify-center'
        onClick={handleLogin}
      >
        Log in
      </button>
      {me && (
        <div className='m-auto bg-green-900 text-black p-5 rounded-2xl items-center justify-center'>{me.name}</div>
      )}
      <Link className='bg-blue-900 m-auto text-white p-5 rounded-2xl items-center justify-center' href='/example'>
        Példa oldal
      </Link>
    </div>
  );
}
