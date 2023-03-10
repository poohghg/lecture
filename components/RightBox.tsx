import Link from 'next/link';
import styles from '../styles/header.module.scss';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { memo } from 'react';

const RightBox = () => {
  return (
    <>
      <button className={styles.box}>
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
