import React from 'react';
import { useRouter } from 'next/router';
import { AccordionComponent } from '@/components';
import styles from '../profileArticles/profile.module.css';

const ProfileTools = ({ option }) => {
  const router = useRouter();

  const navigateToEditor = () => {
    router.push(`/editor/${option}`);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center justify-content-lg-end mb-4">
        <div className={`select-filter ${styles.hideMobile}`}>
          <button className="button button--theme-primary" onClick={navigateToEditor}>
            Crear {option === 'tool' ? 'herramienta' : 'diagnóstico'}
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <AccordionComponent
            isEditable
            filter={option}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTools;
