import styles from '../../styles/detail.module.scss';
import { useValues } from '@/context/procider';
import { useCallback, useState } from 'react';
import DetailContent from './DetailContent';
import DetailHeader from './DetailHeader';

const DetailSection = () => {
  const { currentStore } = useValues();
  const [expanded, setExpanded] = useState<boolean>(false);

  const onClickArrow = useCallback(() => setExpanded((prev) => !prev), []);

  return (
    <div
      className={`${styles.detailSection} ${
        currentStore ? `${styles.selected}` : ''
      } ${expanded ? `${styles.expanded}` : ''}`}
    >
      <DetailHeader
        currentStore={currentStore}
        expanded={expanded}
        onClickArrow={onClickArrow}
      />
      <DetailContent currentStore={currentStore} expanded={expanded} />
    </div>
  );
};
export default DetailSection;
