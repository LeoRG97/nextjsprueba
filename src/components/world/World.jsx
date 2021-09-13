// import Script from 'next/script';
import React from 'react';
// import define from './index';
// import { Runtime, Inspector } from './runtime';

const WorldComponent = () => {
  // useEffect(() => {
  //   const runtime = new Runtime();
  //   runtime.module(define, Inspector.into(document.getElementById('body')));
  // }, []);

  return (
    <div id="chart">
      <div id="body" />
      <>
        {/* <Script
          src="https://d3js.org/d3.v7.min.js"
          strategy="lazyOnload"
        /> */}
        <img className="img img-fluid" src="/images/home/Mapa.png" alt="impactgo geográfico" />
      </>
    </div>
  );
};

export default WorldComponent;
