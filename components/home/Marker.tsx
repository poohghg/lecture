import { NaverMap } from '@/types/map';
import { Store } from '@/types/store';
import { memo, useCallback, useEffect, useMemo } from 'react';
import type { Marker } from '../../types/map';
import { generateStoreMarkerIcon } from './Markers';

interface Props {
  map: NaverMap;
  store: Store;
  flage: boolean;
  handelClick?: (store: Store) => void;
}

const Marker = ({ map, store, flage = false, handelClick }: Props) => {
  const marker = useMemo(() => {
    let marker: naver.maps.Marker | null = null;
    if (map) {
      marker = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(...store.coordinates),
        icon: generateStoreMarkerIcon(store.episode),
      });
      if (handelClick)
        naver.maps.Event.addListener(marker, 'click', () => handelClick(store));
    }
    return marker;
  }, [map]);

  useEffect(() => {
    return () => marker?.setMap(null);
  }, [marker]);

  useEffect(() => {
    marker?.setIcon(generateStoreMarkerIcon(store.episode, flage));
  }, [flage]);
  return null;
};

export default memo(Marker);
