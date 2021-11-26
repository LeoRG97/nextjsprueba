import React from 'react';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import styles from './autoSaveIndicator.module.css';

const AutoSaveIndicator = ({ show }) => {
  return (
    <div className={`${styles.indicator} ${show && styles.visible}`}>
      <p className="subtitle">Guardando...</p>
      <LoadingIndicator />
    </div>
  );
};

export default AutoSaveIndicator;
