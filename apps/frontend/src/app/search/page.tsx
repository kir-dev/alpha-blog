'use client';

import type { Post } from '@/app/types/post';
import type { User } from '@/app/types/user';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const debouncedQuery = useDebounced(query, 200);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const [u, p] = await Promise.all([
          axios.get<User[]>(`${API_BASE}/users`, { params: { q: debouncedQuery } }).catch(() => ({ data: [] })),
          axios.get<Post[]>(`${API_BASE}/posts`, { params: { q: debouncedQuery } }).catch(() => ({ data: [] })),
        ]);
        if (cancelled) return;
        setUsers(Array.isArray(u.data) ? u.data : []);
        setPosts(Array.isArray(p.data) ? p.data : []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (debouncedQuery.length === 0) {
      setUsers([]);
      setPosts([]);
      return;
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return (
    <section className='space-y-4'>
      <h1 className='text-2xl font-bold'>Keresés</h1>
      <p>
        Jelenleg a <strong>Keresés</strong> oldalon vagy. Kifejezés: <em>"{query}"</em>
      </p>

      {loading && <p>Keresés folyamatban…</p>}

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <h2 className='mb-2 text-lg font-semibold'>Felhasználók</h2>
          <ul className='divide-y rounded-lg border'>
            {users.length === 0 && !loading && <li className='p-3 text-sm text-gray-600'>Nincs találat.</li>}
            {users.map((u) => (
              <li key={u.id} className='p-3'>
                <div className='font-medium'>{u.username}</div>
                <div className='text-sm text-gray-600'>@{u.username}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='mb-2 text-lg font-semibold'>Posztok</h2>
          <ul className='divide-y rounded-lg border'>
            {posts.length === 0 && !loading && <li className='p-3 text-sm text-gray-600'>Nincs találat.</li>}
            {posts.map((p) => (
              <li key={p.id} className='p-3'>
                <p className='whitespace-pre-wrap'>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function useDebounced<T>(value: T, delay = 250) {
  const [v, setV] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
