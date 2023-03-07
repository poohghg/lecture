import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// dynamic을 사용하여 CSR을 사용
const NoSSR = dynamic(() => import('@/components/NoSSR'), {
  ssr: false,
});

interface Props {}

const Example: NextPage<Props> = () => {
  const [data, setData] = useState<number>(0);

  const getData = async () => {
    const g = () =>
      new Promise<number>((resolve) =>
        setTimeout(() => resolve(Math.random()), 2000)
      );
    const data = await g();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <h1>CSR</h1>
      <p>{data}</p>
      <NoSSR />
    </main>
  );
};

export default Example;
