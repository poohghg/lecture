import { NaverMap } from '@/types/map';
import { memo, useEffect } from 'react';
import type { Marker } from '../../types/map';

interface Props extends Marker {
  // map: NaverMap;
  // coordinates:
  // onClick:()=>void
}

const Marker = ({ coordinates, icon, map, onClick }: Props) => {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    if (map) {
      marker = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(...coordinates),
        icon,
      });
    }
    if (onClick) naver.maps.Event.addListener(marker, 'click', onClick);
    return () => {
      marker?.setMap(null);
    };
  }, [map, icon]);
  return null;
};

export default memo(Marker);
