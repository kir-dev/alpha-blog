'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('http://localhost:3001/auth/login');
  };
  return (
    <div className='min-h-[60vh] space-y-4 flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold'>Kezdőlap</h1>
      <p>
        Jelenleg a <strong>Kezdőlap</strong> oldalon vagy.
      </p>
      <button className='mt-4 rounded-2xl bg-green-900 px-6 py-3 text-white hover:opacity-90' onClick={handleLogin}>
        Log in
      </button>
    </div>
  );
}
