import Link from 'next/link';
import { Row } from 'react-bootstrap';
import styles from '@/global/styles/Home.module.css';

export const NoArticles = () => {
  return (
    <Row className={styles.marginNoArticles}>
      <div className={`${styles.content_centered}`}>
        <p className="title">¡Bienvenido!</p>
        <Link href="trending-topics/" passHref>
          <a>
            <button className="button button--theme-secondary">Explorar temas</button>
          </a>
        </Link>
      </div>
    </Row>
  );
};
