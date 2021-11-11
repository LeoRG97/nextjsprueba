/* eslint-disable react/jsx-fragments */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useRef, Fragment } from 'react';
import { DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';
import styles from './profileMembersAndInvitations.module.css';
import { adminAccess } from '@/helpers/accessVerifiers';

const TooltipsMembers = ({ options, data }) => {
  const [session] = useSession();
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(this);
  const ref = useRef(null);

  const handleOptionsClick = (e) => {
    setTarget(e.target);
    setShow(!show);
  };

  if (!adminAccess(session.user.role) || (data && !data.estatus)) {
    return <></>;
  }

  return (
    <Fragment>
      <div className="btn-group">
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
          <div className="w-100">
            {
              options && data && options.map((index, i) => {
                const objData = {
                  data,
                };
                return (
                  <div
                    key={index.option}
                    onClick={() => (options[i].event
                      ? options[i].eventName(objData.data.id)
                      : null)}
                    className="drop-item"
                  >
                    <span className="drop-item__icon">{options[i].iconType}</span>
                    <span className="drop-item__content">{options[i].option}</span>
                  </div>
                );
              })
            }
          </div>
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
