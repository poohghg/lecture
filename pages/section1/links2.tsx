import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Link2() {
  const router = useRouter();

  // router는 페이지를 프리페칭 하지않는다.
  useEffect(() => {
    router.prefetch('/section1/getStaticProps');
  }, [router]);

  return (
    <main>
      <h1>link2</h1>
      <button onClick={() => router.push('/section1/getStaticProps')}>
        getStaticProps
      </button>
    </main>
  );
}
