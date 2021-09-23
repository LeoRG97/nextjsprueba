import React, { useState } from 'react';
import styles from './accordion.module.css';

const AccordionCollapse = ({ herramienta }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="row align-items-center justify-content-end mb-2" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="col-8 offset-2  offset-md-2 col-sm-8 col-md-7">
        <div className="text-md">{herramienta.name}</div>
        <div className="text--theme-secondary text-md">{herramienta.tipo}</div>
      </div>
      <div className="col-2 col-sm-2 offset-md-1 col-md-2 justify-content-end">
        {
          hover ? (
            <div className={styles.icon_hover}>
              <span className={`icon ${styles.icon_options}`}>0</span>
            </div>
          ) : (
            <></>
          )
        }
      </div>
    </div>
  );
};

export default AccordionCollapse;
