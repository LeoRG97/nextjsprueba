/* eslint-disable react/jsx-fragments */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useRef, Fragment } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './profileMembersAndInvitations.module.css';

const TooltipsMembers = ({ options, data, opacityCss }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(this);
  const ref = useRef(null);

  const handleOptionsClick = (e) => {
    setTarget(e.target);
    setShow(!show);
  };

  return (
    <Fragment>
      <div className={`btn-group ${styles.button_dropdown_content}`} style={{ opacity: opacityCss }}>
        <DropdownButton
          ref={ref}
          title="..."
          onClick={handleOptionsClick}
          className={styles.button_dropdown}
          align="end"
          target={target}
          show={show}
          placement="bottom"
          rootclose="true"
        >
          {
            options && data && options.map((index, i) => {
              const objData = {
                data,
              };
              return (
                <Dropdown.Item
                  className={styles.item_dropdown}
                  key={index.option}
                  onClick={() => (options[i].event
                    ? options[i].eventName(objData.data._id, objData.data.invitado_id)
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

TooltipsMembers.propTypes = {
  options: PropTypes.array,
  data: PropTypes.object,
};

export default TooltipsMembers;
