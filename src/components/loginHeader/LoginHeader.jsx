import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './loginHeader.module.css';

const LoginHeader = ({ mainBackg }) => {
  return (
    <div className={`main-bg ${styles.header} ${mainBackg}`}>
      <Link href="/" passHref>
        <Image
          src="/images/logos/Marca.png"
          alt="NTT Data"
          className={styles.logo}
          layout="intrinsic"
          width={120}
          height={57}
        />
      </Link>
    </div>
  );
};

export default LoginHeader;
