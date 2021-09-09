/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import Switch from '@/components/switch/Switch';
import styles from './tBanner.module.css';

const TrendingBannerComponent = ({ loggedIn }) => {
  const router = useRouter();
  const { query } = router;

  const handleSwitchNav = () => {
    if (!query.user) {
      router.push('/trending-topics?user=true', undefined, { shallow: false });
    } else {
      router.push('/trending-topics', undefined, { shallow: false });
    }
  };

  return (
    <>
      {!loggedIn && (
        <div className={styles.bannerImage}>
          <div>
            <div className="text-md">Trending topics</div>
            <div className={`title-xl ${styles.marginT}`}>
              <div>Descubre nuevas formas</div>
              <div>de ver el mundo.</div>
            </div>
            <div className="text-md">
              <div>
                Nuestros expertos crean y comparten artículos de relevancia,
              </div>
              <div>especialmente diseñados para mentes visionarias, como tú.</div>
            </div>
            <Link href="/create-account" passHref>
              <button className={`button button--theme-primary ${styles.marginT}`}>Crear cuenta</button>
            </Link>
          </div>
        </div>
      )}
      <div className={styles.centeredTitle}>
        {loggedIn ? (
          <div className={`${styles.pageSwitch} ${styles.topPadding}`}>
            <small className={`subtitle ${styles.switchTag} ${query.user && styles.active}`}>Para mí</small>
            <Switch
              checked={!query.user}
              onChange={handleSwitchNav}
              inverted
            />
            <small className={`subtitle ${styles.switchTag} ${!query.user && styles.active}`}>Todos</small>
          </div>
        ) : <span className="subtitle d-block mt-4">Quiero ver</span>}

        <h1 className="title-xl text-center">
          {query.user ? 'Selección de publicaciones de acuerdo a tus intereses' : 'Todas las publicaciones'}
        </h1>
      </div>
    </>
  );
};

export default TrendingBannerComponent;
