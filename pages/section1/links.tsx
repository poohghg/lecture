import Link from 'next/link';

export default function Links() {
  // const handleLink = (e: SyntheticEvent) => {
  //   e.preventDefault();
  // };

  return (
    <main>
      <h1>Links</h1>
      <Link
        href="/section1/getStaticProps"
        // legacyBehavior //12
      >
        {/* 12버전에서는 a태그를 직접 넣어줘야 했다. 
          13버전부터는 link태그가 a태그를 완전히 대체했다.*/}
        {/* <a href=""></a> */}
        getStaticProps
      </Link>
    </main>
  );
}
