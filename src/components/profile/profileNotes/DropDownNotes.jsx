/* eslint-disable react/jsx-fragments */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useRef, Fragment } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './notes.module.css';

const DropDownNotes = ({ options, data }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(this);
  const ref = useRef(null);

  const handleOptionsClick = (e) => {
    setTarget(e.target);
    setShow(!show);
  };

  return (
    <Fragment>
      <div className="btn-group">
        <DropdownButton
          ref={ref}
          title="0"
          onClick={handleOptionsClick}
          className={`text--theme-secondary ${styles.button_dropdown}`}
          align={{ sm: 'start' }}
          target={target}
          show={show}
          placement="bottom"
          rootclose="true"
        >
          {
            options.map((index, i) => {
              const objData = {
                data,
              };
              return (
                <Dropdown.Item
                  className={styles.item_dropdown}
                  key={index.option}
                  onClick={() => (options[i].event
                    ? options[i].eventName(objData.data._id)
                    : null)}
                >
                  <span className="icon">{options[i].iconType}</span>
                  <span className={styles.item_dropdown_text}>{options[i].option}</span>
                </Dropdown.Item>
              );
            })
          }
        </DropdownButton>
      </div>
    </Fragment>
  );
};

DropDownNotes.propTypes = {
  options: PropTypes.array,
  data: PropTypes.object,
};

export default DropDownNotes;
