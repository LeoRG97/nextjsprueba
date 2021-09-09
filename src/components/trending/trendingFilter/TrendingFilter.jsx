import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styles from './tFilter.module.css';

const TrendingFilterComponent = ({ preferences }) => {
  const router = useRouter();
  useEffect(() => {
    const dragScroll = () => {
      const slider = document.querySelector('.items');
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add(`${styles.active}`);
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove(`${styles.active}`);
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove(`${styles.active}`);
      });
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        // scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    };
    dragScroll();
  });

  const navigateToFilter = (filter) => {
    const { query, pathname } = router;
    if (query.category !== filter) {
      delete query.category;
      router.push({
        pathname,
        query: {
          ...query,
          ...(filter && { category: filter }),
        },
      }, undefined, { scroll: false, shallow: true });
    }
  };

  const { category } = router.query;

  return (
    <div align="center">
      <div className={styles.filterContainer}>
        <div className={styles.filterOpacity1} />
        <div className={`items ${styles.filters}`}>
          <div className={`text-regular ${styles.filter} ${!category && styles.current}`} onClick={() => navigateToFilter('')}>
            <div>Todos</div>
          </div>
          {
            preferences.map((pref) => (
              <div key={pref._id} className={`text-regular ${styles.filter} ${category === pref.slug && styles.current}`} onClick={() => navigateToFilter(pref.slug)}>
                <div>{pref.nombre}</div>
              </div>
            ))
          }
        </div>
        <div className={styles.filterOpacity2} />
      </div>
    </div>
  );
};

export default TrendingFilterComponent;
