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

  const isActive = (item) => {
    if (!item.value && !currentValue) {
      return true;
    } if (item.value === currentValue) {
      return true;
    }
    return false;
  };

  return (
    <div className={`select-posts ${styles.selectContainer}`}>
      <DropdownButton className="text-md" id={`dropdown-basic-button-${selectN}`} title={btnLabel}>
        {items.map((item) => (
          <Dropdown.Item
            key={item.value}
            className="text-sm drop-item"
            onClick={() => filtroS(item)}
          >
            <div className={`drop-item__content ${isActive(item) && 'drop-item__content--active'}`}>
              {item.label}
            </div>
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};

ArticleListSelectComponent.propTypes = {
  selectN: PropTypes.string.isRequired,
};

export default ArticleListSelectComponent;
