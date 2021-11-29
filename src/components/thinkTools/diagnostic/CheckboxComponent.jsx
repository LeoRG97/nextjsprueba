import React, { useState } from 'react';
import styles from '@/global/styles/Diagnostic.module.css';

const CheckboxComponent = ({
  initialState = false,
  idAnswer,
  onChange,
  answer,
  value,
  response,
}) => {
  const [checked, setChecked] = useState(initialState);

  const handleCheck = () => {
    setChecked(!checked);
    onChange(idAnswer, !checked, value, answer);
  };

  return (
    <div className={styles.check}>
      {
        !response ? (
          <button className={styles.buttonChek} onClick={handleCheck} type="button">
            <span className={`icon ${checked ? 'icon--theme-highlight' : 'icon--theme-secondary'}`}>
              {checked ? 'A' : '5'}
            </span>
          </button>
        ) : (
          <button className={styles.buttonChek} onClick={handleCheck} type="button">
            <span className="icon icon--theme-highlight">
              A
            </span>
          </button>
        )
      }

      <span className="text-sm d-block mb-2 ms-1 text--theme-light">
        {answer}
      </span>
    </div>
  );
};

export default CheckboxComponent;
