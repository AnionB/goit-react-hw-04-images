import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [pictureToFind, setPictureToFind] = useState('');

  const handleInputChange = e => {
    setPictureToFind(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(pictureToFind.trim());
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <MdSearch size={'30px'} color={'#78787A'} />
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={pictureToFind}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
