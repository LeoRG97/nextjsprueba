import React from 'react';
import { useRouter } from 'next/router';
import { AccordionComponent } from '@/components';
import styles from '../profileArticles/profile.module.css';

const ProfileTools = () => {
  const router = useRouter();

  const navigateToEditor = (option) => {
    router.push(`/editor/${option}`);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center justify-content-lg-end mb-4">
        <div className={`select-filter ${styles.hideMobile}`}>
          <div
            className={styles.optionsContainer}
          >
            <button className="button button--theme-primary">
              Nueva herramienta <span className="button__icon-right text--theme-light">1</span>
            </button>
            <div className={styles.list_content}>
              <div className="drop-item" onClick={() => navigateToEditor('tool')}>
                <span className="drop-item__content">Con archivo</span>
              </div>
              <div className="drop-item" onClick={() => navigateToEditor('diagnostic')}>
                <span className="drop-item__content">Con diagnóstico</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <AccordionComponent isEditable />
        </div>
      </div>
    </div>
  );
};

export default ProfileTools;
