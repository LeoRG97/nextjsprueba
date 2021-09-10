/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import styles from './tSelect.module.css';

const ArticleListSelectComponent = (props) => {
  const {
    selectN,
    items,
    onChange,
    currentValue,
    defaultTitle,
  } = props;

  const [btnLabel, setBtnLabel] = useState(defaultTitle);
  const filtroS = (item) => {
    if (item) {
      onChange(item);
    }
  };

  useEffect(() => {
    if (!currentValue) {
      setBtnLabel(defaultTitle);
    } else {
      const result = items.filter((item) => item.value === currentValue)[0];
      setBtnLabel(result.label);
    }
  }, [currentValue, items]);

  return (
    <div className={`select-posts ${styles.selectContainer}`}>
      <DropdownButton className="text-md" id={`dropdown-basic-button-${selectN}`} title={btnLabel}>
        {items.map((item) => (
          <Dropdown.Item key={item.value} className="text-sm" onClick={() => filtroS(item)}>{item.label}</Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};

ArticleListSelectComponent.propTypes = {
  selectN: PropTypes.string.isRequired,
};

export default ArticleListSelectComponent;