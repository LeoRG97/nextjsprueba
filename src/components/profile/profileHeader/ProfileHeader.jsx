import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './profileHeader.module.css';

const ProfileHeader = ({
  picture, name, lastName, state, country,
}) => {
  return (
    <div className={`${styles.headerContainer} texture-top`}>
      <div className={styles.profileCard}>
        <div className={styles.imgFrame}>
          <Image layout="fill" objectFit="cover" src={picture === 'string' || !picture ? '/images/profile/no-profile-img.png' : picture} />
        </div>
        <h1 className="title">{name} {lastName}</h1>
        <p className="subtitle">{state && country && `${state}, ${country}`}</p>
        <Link href="/profile/edit/general" passHref>
          <button className="button button--theme-secondary">Editar perfil</button>
        </Link>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  picture: PropTypes.string,
  name: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
};

ProfileHeader.defaultProps = {
  name: '',
  picture: '',
  state: '',
  country: '',
};

export default ProfileHeader;
