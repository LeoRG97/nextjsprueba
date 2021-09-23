import React, { useContext } from 'react';
import { AccordionContext, useAccordionButton } from 'react-bootstrap';
import styles from './accordion.module.css';

const ContextAwareToggle = ({ eventKey, callback }) => {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className={isCurrentEventKey ? styles.flag_selected : styles.flag}
      onClick={decoratedOnClick}
    >
      <span className={`icon ${styles.icon_flag}`}>{isCurrentEventKey ? '2' : 'b' }</span>
    </button>
  );
};

export default ContextAwareToggle;
