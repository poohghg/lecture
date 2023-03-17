import { useActions } from '@/context/procider';
import { INITIAL_ZOOM, INITIAL_CENTER } from '@/hooks/useMap';
import { NaverMap } from '@/types/map';
import { Coordinates } from '@/types/store';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import Map from './Map';
import Markers from './Markers';

const MapSection = () => {
  const router = useRouter();
  const { clearCurrentStore, setMap } = useActions();
  const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const initialZoom = useMemo(
    () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
    [query]
  );

  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get('lat') && query.get('lng')
        ? [Number(query.get('lat')), Number(query.get('lng'))]
        : INITIAL_CENTER,
    [query]
  );

  const onLoadMap = useCallback((map: NaverMap) => {
    setMap(map);
    naver.maps.Event.addListener(map, 'click', clearCurrentStore);
  }, []);
  // console.log(initialCenter, initialZoom);

  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialZoom={initialZoom}
        initialCenter={initialCenter}
      />
      <Markers />
    </>
  );
};

export default MapSection;
