/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from './profilePostsO.module.css';

const ProfilePostsOptionsComponent = () => {
  return (
    <div className={styles.postsOptions}>
      <div className={`text-md ${styles.postsOption}`}>Publicaciones <span>0</span></div>
      <div className={`text-md ${styles.postsOption}`}>Borradores <span>0</span></div>
      <div className={`text-md ${styles.postsOption}`}>Biblioteca <span>0</span></div>
      <div className={`text-md ${styles.postsOption}`}>Valoraciones <span>0</span></div>
      <div className={`text-md ${styles.postsOption}`}>Sobre mí <span>0</span></div>
    </div>
  );
};

export default ProfilePostsOptionsComponent;
