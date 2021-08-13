import Script from 'next/script';
import React, { useEffect } from 'react';
import define from './index';
import { Runtime, Inspector } from './runtime';

const WorldComponent = () => {
  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(document.getElementById('body')));
  }, []);

  return (
    <div id="chart">
      <div id="body" />
      <>
        <Script
          src="https://d3js.org/d3.v7.min.js"
          strategy="lazyOnload"
        />
      </>
    </div>
  );
};

export default WorldComponent;
