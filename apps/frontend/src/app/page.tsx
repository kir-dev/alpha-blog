'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('http://localhost:3001/auth/login');
  };
  return (
    <div className='min-h-screen flex w-full'>
      <button
        className='m-auto bg-green-900 text-white p-5 rounded-2xl items-center justify-center'
        onClick={handleLogin}
      >
        Log in
      </button>
    </div>
  );
}
