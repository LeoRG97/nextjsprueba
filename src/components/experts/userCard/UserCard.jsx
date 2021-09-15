import Image from 'next/image';
import React from 'react';
import { BUCKET_URL } from '@/global/constants';
import styles from './userCard.module.css';

const UserCard = ({ user }) => {
  const {
    name, apellidos, company, position, socialMedia,
  } = user;

  const renderPicture = (link) => {
    return link && link.match(`${BUCKET_URL}.*`) ? link : '/images/profile/no-profile-img.png';
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          layout="fill"
          objectFit="contain"
          src={renderPicture(user.picture)}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.infoTop}>
          <h3 className="title">{`${name} ${apellidos || ''}`}</h3>
          <div>
            <span className="text-regular text--theme-light d-block">{position}</span>
            <small className="text-sm d-block">{company}</small>
          </div>
        </div>
        <div className={styles.infoBottom}>
          {socialMedia && socialMedia.map((media) => (
            <a key={media._id} href={media.link} className="text-link icon-md text--theme-secondary">
              {media.nombre === 'twitter' && 'X'}
              {media.nombre === 'linkedin' && 'M'}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;