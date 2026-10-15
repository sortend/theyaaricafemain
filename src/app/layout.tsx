import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/lib/AuthProvider';
import { CartProvider } from '@/lib/CartProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}
