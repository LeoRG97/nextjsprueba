import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-bootstrap';
import styles from './articlesList.module.css';

export const ArticleOptionsAdmin = ({ articleId, onDelete, onUpdate }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  const handleDeleteArticle = () => {
    onDelete(articleId);
  };

  return (
    <div className={`${styles.trendingContentAdminOptions}`}>
      <button
        onClick={() => setOpen(!open)}
        aria-controls="adminOptions"
        aria-expanded={open}
        className={`d-flex align-items-center text-sm text--theme-light ${styles.trendingLabelAdmin} ${styles.adminOptionsOverArticle}`}
      >
        <span className="icon text--theme-light">0</span>
      </button>

      <Collapse in={open}>
        <div id="adminOptions" className={`w-80 text-sm mt-3 ${styles.trendingLabelAdmin} ${styles.adminOptionsMenu}`}>
          <div className={`row py-1 ${styles.updateOption}`} onClick={onUpdate}>
            <div className="d-flex align-items-center">
              <span className="icon">K</span>
              <span>&nbsp;Modificar</span>
            </div>
          </div>

          <div onClick={handleDeleteArticle} className={`row py-1 ${styles.deleteOption}`}>
            <div className="d-flex align-items-center">
              <span className="icon">L</span>
              <span>&nbsp;Eliminar </span>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};
