import React from 'react';
import PropTypes from 'prop-types';
import styles from './switch.module.css';

const Switch = ({
  label, checked, name, onChange, inverted,
}) => {
  return (
    <label className={`${inverted && styles.inverted} ${styles.switch} `}>
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.slider} />
    </label>
  );
};

Switch.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

Switch.defaultProps = {
  name: '',
};

export default Switch;
