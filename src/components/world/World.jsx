// import Script from 'next/script';
import React from 'react';
import styles from './world.module.css';
// import define from './index';
// import { Runtime, Inspector } from './runtime';

const WorldComponent = () => {
  // useEffect(() => {
  //   const runtime = new Runtime();
  //   runtime.module(define, Inspector.into(document.getElementById('body')));
  // }, []);

  return (
    <>
      {/* <Script
          src="https://d3js.org/d3.v7.min.js"
          strategy="lazyOnload"
        /> */}
      <img className={styles.map} src="/images/home/Mapa.gif" alt="impactgo geográfico" />
    </>
  );
};

export default WorldComponent;
