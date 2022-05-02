import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ currentPicture, closeModal }) {
  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const { largeImageURL, tags } = currentPicture;
  return (
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  currentPicture: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};
