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
    {
      fallbackData: {
        publicacones: 0,
        borradores: 0,
        herramientas: 0,
        foros: 0,
        publicaconesCursos: 0,
        subscripcionesCursos: 0,
        invitaciones: 0,
        biblioteca: 0,
        valoraciones: 0,
        notas: 0,
      },
    },
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
      <span className={`icon ${styles.indicatorMovilLeft}`}>
        a
      </span>
      {authorAccess(user.role) && (
        <div className={styles.authorSection}>
          <Link href="/profile/articles" passHref scroll={false}>
            <a
              className={`linkItem subtitle ${styles.item} ${query.setting === 'articles' && styles.active}`}
            >
              Publicaciones
              <span className="ms-2 text-md text--theme-secondary">{data.publicacones}</span>
            </a>
          </Link>
          <Link href="/profile/drafts" passHref scroll={false}>
            <a
              className={`subtitle ${styles.item} ${query.setting === 'drafts' && styles.active}`}
            >
              Borradores
              <span className="ms-2 text-md text--theme-secondary">{data.borradores}</span>
            </a>
          </Link>
          {reviewerAccess(user.role) && (
            <>
              <Link href="/profile/tools" passHref scroll={false}>
                <a
                  className={`subtitle ${styles.item} ${query.setting === 'tools' && styles.active}`}
                >
                  Herramientas
                  <span className="ms-2 text-md text--theme-secondary">{data.herramientas}</span>
                </a>
              </Link>
              <Link href="/profile/courses" passHref scroll={false}>
                <a
                  className={`subtitle ${styles.item} ${query.setting === 'courses' && query.borradores !== 'true' && styles.active}`}
                >
                  Cursos
                  <span className="ms-2 text-md text--theme-secondary">{data.publicaconesCursos}</span>
                </a>
              </Link>
              <Link href="/profile/courses?borradores=true" passHref scroll={false}>
                <a
                  className={`subtitle ${styles.item} ${query.borradores === 'true' && query.setting === 'courses' && styles.active}`}
                >
                  Borradores de cursos
                  <span className="ms-2 text-md text--theme-secondary">{data.borradoresCursos}</span>
                </a>
              </Link>
              <Link href="/profile/forums" passHref scroll={false}>
                <a
                  className={`subtitle ${styles.item} ${query.setting === 'forums' && styles.active}`}
                >
                  Foros
                  <span className="ms-2 text-md text--theme-secondary">{data.foros}</span>
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
                <span className="ms-2 text-md text--theme-secondary">{data.invitaciones}</span>
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
          <span className="ms-2 text-md text--theme-secondary">{data.biblioteca}</span>
        </a>
      </Link>
      <Link href="/profile/ratings" passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${query.setting === 'ratings' && styles.active}`}
        >
          Valoraciones
          <span className="ms-2 text-md text--theme-secondary">{data.valoraciones}</span>
        </a>
      </Link>
      <Link href="/profile/notes" passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${query.setting === 'notes' && styles.active}`}
        >
          Notas
          <span className="ms-2 text-md text--theme-secondary">{data.notas}</span>
        </a>
      </Link>
      <Link href="/profile/about-me" passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${query.setting === 'about-me' && styles.active} ${styles.lastOption}`}
        >
          Sobre mí
        </a>
      </Link>
      <span className={`icon ${styles.indicatorMovilRight}`}>
        b
      </span>
    </div>
  );
};

export default TabMenu;
