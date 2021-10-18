/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
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

  const handleSwitchNavUser = () => {
    router.push('/trending-topics?user=true', undefined, { shallow: false });
  };

  const handleSwitchNavNotUser = () => {
    router.push('/trending-topics', undefined, { shallow: false });
  };

  const getTitle = () => {
    if (query.search) {
      return null;
    } if (query.user) {
      return 'Selección de publicaciones de acuerdo a tus intereses';
    }
    return 'Todas las publicaciones';
  };

  return (
    <>
      {!loggedIn && !query.search && (
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
        {loggedIn && !query.search && (
          <div className={`${styles.pageSwitch} ${styles.topPadding}`}>
            <small onClick={handleSwitchNavUser} className={`subtitle ${styles.switchTag} ${query.user && styles.active}`}>Para mí</small>
            <Switch
              checked={!query.user}
              onChange={handleSwitchNav}
              inverted
            />
            <small onClick={handleSwitchNavNotUser} className={`subtitle ${styles.switchTag} ${!query.user && styles.active}`}>Todos</small>
          </div>
        )}
        {!loggedIn && !query.search && <p className="subtitle d-block mt-4">Quiero ver</p>}
        <h1 className="title-xl text-center">
          {getTitle()}
        </h1>
      </div>
    </>
  );
};

TrendingBannerComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default TrendingBannerComponent;
