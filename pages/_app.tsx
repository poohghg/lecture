import Provider from '@/context/procider';
import '@/styles/globals.scss';
import SEO from '../seo.config';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

// 공통 레이아웃을 잡을수 있다.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Provider>
  );
}
