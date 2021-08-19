import React from 'react';
import styles from './loginHeader.module.css';

const LoginHeader = () => {
  return (
    <div className={`main-bg ${styles.header}`}>
      <img
        src="/images/logos/NTTBlanco.png"
        alt="NTT Data"
        className={styles.logo}
      />
    </div>
  );
};

export default LoginHeader;
