import Image from 'next/image';
import Link from 'next/link';
import example from '/public/example.jpg';
import styles from '../../styles/header.module.scss';
import { useValues } from '@/context/procider';

// https://simsimjae.tistory.com/426
interface Props {
  onClickLogo?: () => void;
  RightElements?: JSX.Element;
}

const Header = ({ RightElements, onClickLogo }: Props) => {
  const { map } = useValues();

  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link href="/" className={styles.box} onClick={onClickLogo}>
          <Image
            src={example}
            alt="logo"
            placeholder="blur"
            quality={100}
            width={110}
            height={20}
          />
        </Link>
      </div>
      {RightElements && <div className={styles.flexItem}>{RightElements}</div>}
    </header>
  );
};

export default Header;
