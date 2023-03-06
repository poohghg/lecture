import { NextPage } from 'next';

interface Props {
  data: number;
  title: string;
}

const Example: NextPage<Props> = ({ data, title }) => {
  return (
    <main>
      <div>{data}</div>
    </main>
  );
};

export default Example;

export async function getStaticProps() {
  const delayInSeconds = 2;
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds)
  );

  return {
    props: { data },
    revalidate: 10, // In seconds
  };
}
