import Link from 'next/link';
import Image from 'next/image';
import styles from '@/global/styles/errorPage.module.css';

export default function ErrorPageComp({ statusCode }) {
  return (
    <main className={`container-fluid ${styles.no_padd}`}>
      <div className={styles.content_error}>
        <div className={styles.container_elements}>
          <div className={styles.cont_img}>
            <Image
              src="/images/resourses/404.png"
              alt="page not found"
              layout="intrinsic"
              width={480}
              height={480}
            />
          </div>
          <div className={styles.cont_text}>
            <h3 className="title-xl">Lo sentimos, algo salió mal</h3>
            <h3 className="text-sm">{statusCode}</h3>
            <Link href="/">
              <a>
                <button className="button button--theme-primary">Ir al Inicio</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
