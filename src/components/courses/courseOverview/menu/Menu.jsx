/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styles from './menu.module.css';

const CourseMenu = () => {
  const router = useRouter();
  const { query: { slug, params } } = router;
  const [lessonIndex, tab] = params || [];

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

    dragScroll();
  });

  const isLinkActive = (value) => {
    return tab === value;
  };
  return (
    <div className={styles.tabBar} id="profileNavbar">
      <Link href={`/courses/${slug}/lesson/${lessonIndex}/overview`} passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${(isLinkActive('overview') || !tab) && styles.active}`}
        >
          Contenidos
        </a>
      </Link>
      <Link href={`/courses/${slug}/lesson/${lessonIndex}/comments`} passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${isLinkActive('comments') && styles.active}`}
        >
          Comentarios
          <span className="ms-2 text-md text--theme-secondary">0</span>
        </a>
      </Link>
      <Link href={`/courses/${slug}/lesson/${lessonIndex}/resources`} passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${isLinkActive('resources') && styles.active}`}
        >
          Recursos adicionales
        </a>
      </Link>
      <Link href={`/courses/${slug}/lesson/${lessonIndex}/certificate`} passHref scroll={false}>
        <a
          className={`subtitle ${styles.item} ${isLinkActive('certificate') && styles.active}`}
        >
          Certificado
        </a>
      </Link>
    </div>
  );
};

export default CourseMenu;