'use client';
import type { User } from '@/app/types/user';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export default function ProfilePage() {
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/me`, { withCredentials: true })
      .then((res: { data: any }) => setMe(res.data))
      .catch(() => setMe(null));
  }, []);

  return (
    <section className='space-y-2'>
      <h1 className='text-2xl font-bold'>Profil</h1>
      <p>
        Jelenleg a <strong>Profil</strong> oldalon vagy.
      </p>
      {me ? (
        <div className='mt-4 rounded-lg border p-4'>
          <p className='font-semibold'>Bejelentkezve mint: {me.username}</p>
          <p className='text-sm text-gray-600'>@{me.username}</p>
        </div>
      ) : (
        <p className='text-sm text-gray-600'>Nem vagy bejelentkezve.</p>
      )}
    </section>
  );
}
