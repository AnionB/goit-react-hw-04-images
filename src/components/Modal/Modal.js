import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ key }) => {
    if (key === 'Escape') {
      this.props.closeModal();
    }
  };

  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.currentPicture;
    return (
      <div className={styles.overlay} onClick={this.handleClick}>
        <div className={styles.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  currentPicture: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};
