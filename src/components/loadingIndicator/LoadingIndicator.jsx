import React from 'react';
import PropTypes from 'prop-types';
import styles from './loadingIndicator.module.css';

const LoadingIndicator = ({ classAdd }) => {
  return (
    <div className={`${styles.loader} ${classAdd} `}><span /></div>
  );
};
LoadingIndicator.propTypes = {
  classAdd: PropTypes.string,
};
LoadingIndicator.defaultProps = {
  classAdd: '',
};

export default LoadingIndicator;
