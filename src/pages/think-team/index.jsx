import {
  Layout, ForumsComponent, Footer,
} from '@/components';
import withAuth from '@/helpers/withAuth';
import styles from './think.module.css';

const ThinkTeam = () => {
  return (
    <Layout>
      <div className={styles.forum_title_cont}>
        <h2 className="title-xl">Únete a la conversación sobre...</h2>
      </div>
      <ForumsComponent showOptions={false} showSubs />
      <Footer />
    </Layout>
  );
};

export default withAuth(ThinkTeam);
