'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState<string>(searchParams.get('q') || '');

  useEffect(() => {
    setQ(searchParams.get('q') || '');
  }, [searchParams]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const query = q?.trim();
      router.push(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
    },
    [q, router]
  );

  const handleLogin = () => {
    router.push(`${API_BASE}/auth/login`);
  };

  return (
    <header className='sticky top-0 z-50 w-full bg-white/80 border-b backdrop-blur'>
      <nav className='mx-auto flex max-w-6xl items-center gap-3 px-4 py-3'>
        {/*LOGO*/}
        <Link href='/' className='shrink-0 select-none text-xl font-black tracking-tight'>
          <span className='rounded bg-black px-2 py-1 text-white'>μBlog</span>
        </Link>

        {/*Primary links*/}
        <div className='ml-2 flex items-center gap-1 text-sm'>
          <Link
            href='/profile'
            className={`rounded-md px-3 py-2 hover:bg-gray-100 ${
              pathname === '/profile' ? 'bg-gray-100 font-semibold' : ''
            }`}
          >
            Profil
          </Link>
        </div>

        {/*Search*/}
        <form onSubmit={onSubmit} className='ml-auto flex w-full max-w-md items-center gap-2'>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder='Keresés felhasználónévre vagy poszt szövegére...'
            className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black'
            aria-label='Keresés'
          />
          <button
            type='submit'
            className='rounded-lg border px-3 py-2 font-medium hover:bg-gray-100'
            aria-label='Keresés gomb'
          >
            Keresés
          </button>
        </form>

        <button onClick={handleLogin} className='rounded-lg border px-3 py-2 font-medium hover:bg-gray-100'>
          Bejelentkezés
        </button>
      </nav>
    </header>
  );
}
