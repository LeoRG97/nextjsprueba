// import Image from 'next/image';
import React from 'react';
import styles from './world.module.css';

const WorldComponent = () => {
  return (
    <img className={styles.map} src="/images/home/mapa.gif" alt="impactgo geográfico" loading="lazy" />
  );
};

export default WorldComponent;
