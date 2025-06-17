import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Analytics } from '@vercel/analytics/react'; // 追加
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Analytics /> {/* 追加 */}
    </ThemeProvider>
  );
}
