import { useActions } from '@/context/procider';
import { NaverMap } from '@/types/map';
import { useCallback } from 'react';
import Map from './Map';
import Markers from './Markers';

const MapSection = () => {
  const { clearCurrentStore, setMap } = useActions();

  const onLoadMap = useCallback((map: NaverMap) => {
    setMap(map);
    naver.maps.Event.addListener(map, 'click', clearCurrentStore);
  }, []);

  return (
    <>
      <Map
        onLoad={onLoadMap}
        // initialZoom={initialZoom}
        // initialCenter={initialCenter}
      />
      <Markers />
    </>
  );
};

export default MapSection;
