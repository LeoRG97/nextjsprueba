import dynamic from 'next/dynamic';
import {
  Layout, ForumsComponent,
} from '@/components';
import { fetchForums } from '@/services/forums';
import styles from './think.module.css';

const Footer = dynamic(() => import('@/components/footer/Footer'));

const ThinkTeam = ({ forums }) => {
  return (
    <Layout className="texture-top">
      <div className={styles.forum_title_cont}>
        <h2 className="title-xl">Únete a la conversación sobre...</h2>
      </div>
      <ForumsComponent data={forums} showOptions={false} showSubs />
      <Footer />
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetchForums();
  return {
    props: {
      forums: res.data,
    },
    revalidate: 60,
  };
}

export default ThinkTeam;
