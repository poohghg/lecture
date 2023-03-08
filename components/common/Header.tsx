import Image from 'next/image';
import Link from 'next/link';
import example from '/public/example.jpg';
// import example from '/';

interface Props {}

const Header = ({}: Props) => {
  return (
    <header>
      <div>
        <Link href="/">
          <Image src={example} alt="logo" placeholder="blur" quality={100} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
