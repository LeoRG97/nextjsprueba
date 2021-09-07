/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';
import styles from './tBanner.module.css';

const TrendingBannerComponent = () => {
  const [session] = useSession();

  if (session) {
    return <h1 className={`title-xl text-center ${styles.titleTopSpacing}`}>Todas las publicaciones</h1>;
  }

  return (
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
  );
};

export default TrendingBannerComponent;
