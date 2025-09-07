'use client';
import type { User } from '@/app/types/user';
import api from '@/lib/api';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    api
      .get('/users/me')
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
          <p className='font-semibold'>Bejelentkezve mint: {me.name}</p>
          <p className='text-sm text-gray-600'>@{me.name}</p>
        </div>
      ) : (
        <p className='text-sm text-gray-600'>Nem vagy bejelentkezve.</p>
      )}
    </section>
  );
}
