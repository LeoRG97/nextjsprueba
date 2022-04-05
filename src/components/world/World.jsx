import Image from 'next/image';
import React from 'react';
import styles from './world.module.css';

const WorldComponent = () => {
  return (
    <>
      <Image
        className={styles.map}
        src="/images/home/Mapa.gif"
        alt="Impacto geográfico"
        layout="intrinsic"
        objectFit="contain"
        loading="lazy"
        width={960}
        height={540}
      />
    </>
  );
};

export default WorldComponent;
