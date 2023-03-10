import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

// 공통 레이아웃을 잡을수 있다.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
