import Link from 'next/link';
import React from 'react';
import styles from './loginHeader.module.css';

const LoginHeader = () => {
  return (
    <div className={`main-bg ${styles.header}`}>
      <Link href="/" passHref>
        <img
          src="/images/logos/NTTBlanco.png"
          alt="NTT Data"
          className={styles.logo}
        />
      </Link>
    </div>
  );
};

export default LoginHeader;
