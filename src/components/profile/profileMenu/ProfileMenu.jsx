/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { adminAccess, authorAccess, reviewerAccess } from '@/helpers/accessVerifiers';
import styles from './profileMenu.module.css';
import { ApiRoutes } from '@/global/constants';
import { fetchItemById } from '@/services/swr';

const TabMenu = () => {
  const { query } = useRouter();
  const [session] = useSession();

  const { user } = session;
  const { data } = useSWR(
    [ApiRoutes.UserTotals, session.user.id],
    fetchItemById,
  );

  useEffect(() => {
    const slider = document.querySelector('#profileNavbar');
    const dragScroll = () => {
      let isDown = false;
      let startX;
      let scrollLeft;
      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
      });
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      });
    };
    if (query.setting === 'about-me') {
      slider.scrollLeft = slider.scrollWidth;
    }

    dragScroll();
  });

  return (
    <div className={styles.tabBar} id="profileNavbar">
      {authorAccess(user.role) && (
        <div className={styles.authorSection}>
          <Link href="/profile/articles" passHref scroll={false}>
            <a
              className={`subtitle ${styles.item} ${query.setting === 'articles' && styles.active}`}
            >
              Publicaciones
              <span className="ms-2 text-md text--theme-secondary">{data && data.publicacones ? data.publicacones : 0}</span>
            </a>
          </Link>
          <Link href="/profile/drafts" passHref scroll={false}>
            <a
              className={`subtitle ${styles.item} ${query.setting === 'drafts' && styles.active}`}
            >
              Borradores
              <span className="ms-2 text-md text--theme-secondary">{data && data.borradores ? data.borradores : 0}</span>
            </a>
          </Link>
          {reviewerAccess(user.role) && (
            <>
              <Link href="/profile/tools" passHref scroll={false}>
                <a
                  className={`subtitle ${styles.item} ${query.setting === 'tools' && styles.active}`}
                >
                  Herramientas
                  <span className="ms-2 text-md text--theme-secondary">{data && data.herramientas ? data.herramientas : 0}</span>
                </a>
              </Link>
              <Link href="/profile/forums" passHref scroll={false}>
                <a
                  className={`subtitle ${styles.item} ${query.setting === 'forums' && styles.active}`}
                >
                  Foros
                  <span className="ms-2 text-md text--theme-secondary">{data && data.foros ? data.foros : 0}</span>
                </a>
              </Link>
            </>
          )}
          {adminAccess(user.role) && (
            <Link href="/profile/members-and-invitations" passHref scroll={false}>
              <a
                className={`subtitle ${styles.item} ${query.setting === 'members-and-invitations' && styles.active}`}
              >
                Miembros e invitaciones
                <span className="ms-2 text-md text--theme-secondary">{data && data.invitaciones ? data.invitaciones : 0}</span>
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
          <span className="ms-2 text-md text--theme-secondary">{data && data.biblioteca ? data.biblioteca : 0}</span>
        </a>
      </Link>
      <Link href="/profile/ratings" passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${query.setting === 'ratings' && styles.active}`}
        >
          Valoraciones
          <span className="ms-2 text-md text--theme-secondary">{data && data.valoraciones ? data.valoraciones : 0}</span>
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
