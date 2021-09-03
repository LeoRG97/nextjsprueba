/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import styles from './tSelect.module.css';

const TrendingSelectComponent = (props) => {
  const { selectN } = props;
  const filtroS = (filtro) => {
    const button = document.getElementById(`dropdown-basic-button-${selectN}`);
    button.innerHTML = filtro;
  };

  return (
    <div className={`select-posts ${styles.selectContainer}`}>
      <DropdownButton className="text-md" id={`dropdown-basic-button-${selectN}`} title="Selecciona">
        <Dropdown.Item className="text-sm" onClick={() => filtroS('Todos')}>Todos</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

TrendingSelectComponent.propTypes = {
  selectN: PropTypes.string.isRequired,
};

export default TrendingSelectComponent;
