import React, { useRef, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import styles from './optionsDropdown.module.css';

const OptionDropdown = ({ options }) => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(this);

  const handleOptionsClick = (e) => {
    setTarget(e.target);
    setShow(!show);
  };

  return (
    <>
      <DropdownButton
        ref={ref}
        title="0"
        onClick={handleOptionsClick}
        className={`icon text--theme-secondary ${styles.button}`}
        target={target}
        show={show}
        align={{ sm: 'start' }}
      >
        {
          options.map((item) => (
            <Dropdown.Item
              className="drop-item"
              key={item.option}
              onClick={item.event ? item.eventName : null}
            >
              <span className="drop-item__icon">{item.iconType}</span>
              <span className="drop-item__content">{item.option}</span>
            </Dropdown.Item>
          ))

        }
      </DropdownButton>
    </>
  );
};

export default OptionDropdown;
