import Link from 'next/link';
import { useRouter } from 'next/router';
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from './profileNav.module.css';

const ProfileNavComponent = () => {
  const { query } = useRouter();

  return (
    <div className={styles.profileSettingsOptions}>
      <Link href="/profile/edit/general" passHref scroll={false}>
        <div className={`text-md ${styles.optionsContent} ${query.option === 'general' && styles.active}`}><span className="icon">Y</span> General</div>
      </Link>
      <Link href="/profile/edit/data-and-preferences" passHref scroll={false}>
        <div className={`text-md ${styles.optionsContent} ${query.option === 'data-and-preferences' && styles.active}`}> <span className="icon">Z</span> Datos y preferencias</div>
      </Link>
      <Link href="/profile/edit/email-and-pasword" passHref scroll={false}>
        <div className={`text-md ${styles.optionsContent} ${query.option === 'email-and-pasword' && styles.active}`}> <span className="icon">W</span> Correo y contraseña</div>
      </Link>
      <Link href="/profile/edit/social-network" passHref scroll={false}>
        <div className={`text-md ${styles.optionsContent} ${query.option === 'social-network' && styles.active}`}> <span className="icon">V</span> Redes sociales</div>
      </Link>
    </div>
  );
};

export default ProfileNavComponent;
