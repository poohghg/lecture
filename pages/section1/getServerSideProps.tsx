import { NextPage } from 'next';

interface Props {
  data: number;
}

const Example: NextPage<Props> = ({ data }) => {
  return (
    <main>
      <h1>getServerSideProps</h1>
      <p>갑:{data}</p>
    </main>
  );
};

export default Example;

export async function getServerSideProps() {
  /** https://web.dev/i18n/ko/stale-while-revalidate/ */
  // This value is considered fresh for five seconds (s-maxage=5).
  // If a request is repeated within the next 5 seconds, the previously
  // cached value will still be fresh.
  //
  // If the request is repeated before 5~15 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=10).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.

  /**
   * s-maxage 이내에 요청은 캐쉬된 html을 보여준다.
   */
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=5, stale-while-revalidate=10'
  // );

  const delayInSeconds = 3;
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
  );

  return {
    props: { data },
  };
}
