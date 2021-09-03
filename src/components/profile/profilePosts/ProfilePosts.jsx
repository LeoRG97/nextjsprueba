/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from './profilePosts.module.css';

const ProfilePostsComponent = () => {
  return (
    <div>
      <div className={styles.profilePostsContainer}>
        <div>
          <img className={styles.profilePostsImg} src="/images/profile/no-profile-img.png" alt="" />
          <div className="title">Fernando Carmona Guevara</div>
          <div className="text-md">Querétaro, México</div>
          <button className={`button button--theme-secondary ${styles.profilePostsButton}`}>Editar perfil</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostsComponent;
