import Link from 'next/link';
import Hero3D from '@/components/Hero3D';
import { Button } from '@ui';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50">
      <Hero3D />
      <section className="mt-8 text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gold-600 mb-4">The Yairi Café</h1>
        <p className="text-lg text-gray-700 mb-6">
          A premium, cinematic dining experience. Reserve a table, explore our menu, and order online.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/menu" className="rounded bg-gold-600 px-4 py-2 font-medium text-white hover:bg-gold-700">
            Explore Menu
          </Link>
          <Link href="/sign-in" className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300">
            Sign In
          </Link>
        </div>
      </section>
    </main>
  );
}
