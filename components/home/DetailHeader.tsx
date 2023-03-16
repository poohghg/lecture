import styles from '../../styles/detail.module.scss';
import { IoIosArrowUp } from 'react-icons/io';
import { Store } from '@/types/store';

interface Props {
  currentStore: Store | null;
  expanded: boolean;
  onClickArrow: () => void;
}
const DetailHeader = ({ currentStore, expanded, onClickArrow }: Props) => {
  return (
    <div className={styles.header}>
      <button
        className={`${styles.arrowButton} ${
          expanded ? `${styles.expanded}` : ''
        }`}
        onClick={onClickArrow}
        disabled={!currentStore}
      >
        <IoIosArrowUp size={20} color="#666666" />
      </button>
      <p className={styles.title}>
        {currentStore ? currentStore.name : '매장을 선택해주세요'}
      </p>
    </div>
  );
};
export default DetailHeader;
