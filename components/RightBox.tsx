import Link from 'next/link';
import styles from '../styles/header.module.scss';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { memo, useCallback } from 'react';
import { useValues } from '@/context/procider';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import { Coordinates } from '@/types/store';
import { useRouter } from 'next/router';
import copy from 'copy-to-clipboard';

const RightBox = () => {
  const router = useRouter();
  const { map } = useValues();

  const getMapOptions = useCallback(() => {
    if (!map) return;
    const mapCenter = map.getCenter();
    const center: Coordinates = [mapCenter.y, mapCenter.x];
    const zoom = map.getZoom();
    return { center, zoom };
  }, [map]);

  const replaceAndCopyURl = useCallback(() => {
    const mapOptions = getMapOptions();
    if (mapOptions) {
      const q = `/?zoom=${mapOptions?.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;
      router.replace(q);
      copy(location.origin + q);
    }
  }, [getMapOptions, router]);

  return (
    <>
      <button className={styles.box} onClick={() => replaceAndCopyURl()}>
        <AiOutlineShareAlt size={20} />
      </button>
      <Link href="/feadback" className={styles.box}>
        <VscFeedback size={20}></VscFeedback>
      </Link>
    </>
  );
};
// function RightBox() {}
export default memo(RightBox);
// export default memo(RightBox);
