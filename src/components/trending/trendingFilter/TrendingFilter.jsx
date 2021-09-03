import React, { useEffect } from 'react';
import styles from './tFilter.module.css';

const TrendingFilterComponent = () => {
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
  return (
    <div align="center">
      <div className={styles.filterContainer}>
        <div className={styles.filterOpacity1} />
        <div className={`items ${styles.filters}`}>
          <div className={`text-sm ${styles.filter}`}>
            <div>Tecnología</div>
          </div>
          <div className={`text-sm ${styles.filter}`}>
            <div>Negocios</div>
          </div>
          <div className={`text-sm ${styles.filter}`}>
            <div>Sustentabilidad</div>
          </div>
          <div className={`text-sm ${styles.filter}`}>
            <div>Todos</div>
          </div>
          <div className={`text-sm ${styles.filter}`}>
            <div>Innovación</div>
          </div>
          <div className={`text-sm ${styles.filter}`}>
            <div>Innovación</div>
          </div>
          <div className={`text-sm ${styles.filter}`}>
            <div>Innovación</div>
          </div>
          <div className={`text-sm ${styles.filter}`}>
            <div>Innovación</div>
          </div>
          <div className={`text-sm ${styles.filter}`}>
            <div>Innovación</div>
          </div>
        </div>
        <div className={styles.filterOpacity2} />
      </div>
    </div>
  );
};

export default TrendingFilterComponent;
