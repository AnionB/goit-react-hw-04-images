import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ children }) {
  return <ul className={styles.gallery}>{children}</ul>;
}

ImageGallery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};
