import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import '../styles.css';

export function App() {
  const [pictureToFind, setPictureToFind] = useState('');
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPicture, setCurrentPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPictureFind, setTotalPictureFind] = useState(null);

  useEffect(() => {
    if (pictureToFind) {
      getPicture(pictureToFind, currentPage);
    }
  }, [currentPage, pictureToFind]);

  useEffect(() => {
    if (currentPage > 1) {
      scroll();
    }
  }, [currentPage, pictures.length]);

  function scroll() {
    window.scrollBy({
      top: 520,
      behavior: 'smooth',
    });
  }

  const findPictures = pictureToFind => {
    if (pictureToFind) {
      setPictureToFind(pictureToFind);
      setPictures([]);
      setCurrentPage(1);
      setLoading(true);
      setTotalPictureFind(null);
    }
  };
  function getPicture(pic, pg) {
    const myKey = '25645547-d70858bec2d16a14b7d60bc29';
    return axios
      .get(
        `https://pixabay.com/api/?q=${pic}&page=${pg}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const foundPictures = response.data.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );

        setPictures([...pictures, ...foundPictures]);
        setLoading(false);
        setTotalPictureFind(response.data.totalHits);
      })
      .catch(err => console.log(err));
  }

  const handleBtnClick = () => {
    setCurrentPage(currentPage + 1);
    setLoading(true);
  };

  const openModal = picture => {
    setCurrentPicture(picture);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={findPictures} />
      {pictures.length > 0 && (
        <ImageGallery findPicture={pictureToFind}>
          {pictures.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              picture={picture}
              onClick={openModal}
            />
          ))}
        </ImageGallery>
      )}
      {pictures.length > 0 &&
        !loading &&
        totalPictureFind > currentPage * 12 && (
          <Button onClick={handleBtnClick} />
        )}
      {loading && <Loader />}
      {currentPicture && (
        <Modal
          currentPicture={currentPicture}
          this
          closeModal={() => setCurrentPicture(null)}
        />
      )}
    </div>
  );
}
