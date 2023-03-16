import { Store } from '@/types/store';
import styles from '../styles/detail.module.scss';
import { useRouter } from 'next/router';
import DetailHeader from '@/components/home/DetailHeader';
import DetailContent from '@/components/home/DetailContent';

interface Props {
  store: Store;
}

export default function StoreDetail({ store }: Props) {
  const expanded = true;
  const router = useRouter();
  if (router.isFallback) return <div>Loading</div>;

  return (
    <div
      className={`${styles.detailSection} ${
        store ? `${styles.selected}` : ''
      } ${expanded ? `${styles.expanded}` : ''}`}
    >
      <DetailHeader
        currentStore={store}
        expanded={expanded}
        onClickArrow={() => null}
      />
      <DetailContent currentStore={store} expanded={expanded} />
    </div>
  );
}

export async function getStaticPaths() {
  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }: { params: { name: string } }) {
  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params.name);

  if (!store) return { notFound: true }; //404페이지로 보냄
  return { props: { store } };
}

// export default StoreDetail;
