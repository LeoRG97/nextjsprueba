// import Image from 'next/image';
import Image from 'next/image';
import React from 'react';
import styles from './world.module.css';

const WorldComponent = () => {
  return (
    <Image
      className={styles.map}
      src="/images/home/mapa.gif"
      alt="impactgo geográfico"
      loading="lazy"
      width={860}
      priority
      height={520}
      layout="intrinsic"
      unoptimized
    />
  );
};

export default WorldComponent;
