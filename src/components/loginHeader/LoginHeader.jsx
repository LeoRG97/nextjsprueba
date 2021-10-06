import Link from 'next/link';
import React from 'react';
import styles from './loginHeader.module.css';

const LoginHeader = ({ mainBackg }) => {
  return (
    <div className={`main-bg ${styles.header} ${mainBackg}`}>
      <Link href="/" passHref>
        <img
          src="/images/logos/Marca.png"
          alt="NTT Data"
          className={styles.logo}
        />
      </Link>
    </div>
  );
};

export default LoginHeader;
