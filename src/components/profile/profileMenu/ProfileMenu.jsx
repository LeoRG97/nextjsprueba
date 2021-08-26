/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { adminAccess, authorAccess } from '@/helpers/accessVerifiers';
import styles from './profileMenu.module.css';

const TabMenu = () => {
  const { query } = useRouter();
  const [session] = useSession();

  const { user } = session;

  return (
    <div className={styles.tabBar}>
      {authorAccess(user.role) && (
        <div className={styles.authorSection}>
          <Link href="/profile/articles" passHref scroll={false}>
            <a
              className={`subtitle ${styles.item} ${query.setting === 'articles' && styles.active}`}
            >
              Publicaciones
            </a>
          </Link>
          <Link href="/profile/drafts" passHref scroll={false}>
            <a
              className={`subtitle ${styles.item} ${query.setting === 'drafts' && styles.active}`}
            >
              Borradores
            </a>
          </Link>
          {adminAccess(user.role) && (
            <Link href="/profile/members-and-invitations" passHref scroll={false}>
              <a
                className={`subtitle ${styles.item} ${query.setting === 'members-and-invitations' && styles.active}`}
              >
                Miembros e invitaciones
              </a>
            </Link>
          )}
        </div>
      )}
      <Link href="/profile/library" passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${query.setting === 'library' && styles.active}`}
        >
          Biblioteca
        </a>
      </Link>
      <Link href="/profile/ratings" passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${query.setting === 'ratings' && styles.active}`}
        >
          Valoraciones
        </a>
      </Link>
      <Link href="/profile/about-me" passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${query.setting === 'about-me' && styles.active}`}
        >
          Sobre mí
        </a>
      </Link>
    </div>
  );
};

export default TabMenu;
