import Link from 'next/link';
import { useAuth } from '@/lib/AuthProvider';
import { useState } from 'react';

export default function SignIn() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err: any) {
      alert('Sign‑in failed: ' + err.message);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50"
    >
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded bg-white p-6 shadow"
      >
        <h2 className="mb-4 text-xl font-semibold">Sign In</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            className="w-full rounded border px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            className="w-full rounded border px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-gold-600 px-4 py-2 font-medium text-white hover:bg-gold-700"
        >{loading ? 'Signing in…' : 'Sign In'}</button>
        <p className="mt-4 text-center">
          No account?{' '}
          <a href="/sign-up" className="text-gold-600 underline">Create one</a>
        </p>
      </form>
    </section>
  );
}
