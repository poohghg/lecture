import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '../styles/main.module.scss';
import Header from '@/components/common/Header';
import RightBox from '@/components/RightBox';
import MapSection from '@/components/home/MapSection';
import { Store } from '../types/store';
import { useActions, useValues } from '@/context/procider';
import { useEffect, useCallback } from 'react';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import DetailSection from '@/components/home/DetailSection';
import { NextSeo } from 'next-seo';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  // Store;
  stores: Store[];
}

export default function Home({ stores }: Props) {
  const { map } = useValues();
  const { setStores } = useActions();

  const resetMapOptions = useCallback(() => {
    map?.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  useEffect(() => {
    setStores(stores);
  }, []);

  return (
    <>
      <NextSeo
        title="메인 페이지"
        description="next.js 시작하기 강의를 위한 매장 지도서비스"
      />
      <>
        <Header onClickLogo={resetMapOptions} RightElements={<RightBox />} />
        <main className={styles.main}>
          <MapSection />
          <DetailSection />
        </main>
      </>
    </>
  );
}

export async function getStaticProps() {
  const stores = await (await import('../public/stores.json')).default;
  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
