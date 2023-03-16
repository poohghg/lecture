import { useActions, useValues } from '@/context/procider';
import { ImageIcon } from '@/types/map';
import { Store } from '@/types/store';
import { useCallback } from 'react';
import Marker from './Marker';

interface Props {}

const Markers = ({}: Props) => {
  const { map, stores, currentStore } = useValues();
  const { setCurrentStore } = useActions();
  const handelClick = useCallback((store: Store) => setCurrentStore(store), []);
  if (!map || !stores) return null;
  // console.log('currentStore', currentStore);
  return (
    <>
      {stores.map((store) => (
        <Marker
          key={store.nid}
          map={map}
          store={store}
          flage={store.nid === currentStore?.nid}
          handelClick={handelClick}
        />
      ))}
    </>
  );
};

export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(
  markerIndex: number,
  isSelected?: boolean
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: isSelected ? 'images/markers-selected.png' : 'images/markers.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ),
  };
}
