import React, { Component } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import '../styles.css';

export class App extends Component {
  state = {
    pictureToFind: '',
    pictures: [],
    currentPage: 1,
    currentPicture: null,
    loading: false,
    totalHits: null,
  };

  componentDidUpdate(prevProps, { pictureToFind, currentPage, pictures }) {
    if (
      pictureToFind !== this.state.pictureToFind ||
      currentPage !== this.state.currentPage
    ) {
      this.getPicture(this.state.pictureToFind, this.state.currentPage);
    }

    if (
      !this.state.loading &&
      this.state.currentPage > 1 &&
      pictures.length !== this.state.pictures.length
    ) {
      this.scroll();
    }
  }

  scroll() {
    window.scrollBy({
      top: 520,
      behavior: 'smooth',
    });
  }

  findPictures = pictureToFind => {
    if (pictureToFind) {
      this.setState({
        pictureToFind: pictureToFind,
        pictures: [],
        currentPage: 1,
        loading: true,
        totalHits: null,
      });
    }
  };

  getPicture = (pic, pg) => {
    const myKey = '25645547-d70858bec2d16a14b7d60bc29';
    return axios
      .get(
        `https://pixabay.com/api/?q=${pic}&page=${pg}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...response.data.hits],
          loading: false,
          totalHits: response.data.totalHits,
        }));
      })
      .catch(err => console.log(err));
  };

  handleBtnClick = () => {
    this.setState(({ currentPage }) => ({
      currentPage: currentPage + 1,
      loading: true,
    }));
  };

  openModal = picture => {
    this.setState({ currentPicture: picture });
  };

  render() {
    const {
      pictureToFind,
      pictures,
      currentPicture,
      loading,
      totalHits,
      currentPage,
    } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.findPictures} />
        {pictures.length > 0 && (
          <ImageGallery findPicture={pictureToFind}>
            {pictures.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                picture={picture}
                onClick={this.openModal}
              />
            ))}
          </ImageGallery>
        )}
        {pictures.length > 0 && !loading && totalHits > currentPage * 12 && (
          <Button handleClick={this.handleBtnClick} />
        )}
        {loading && <Loader />}
        {currentPicture && (
          <Modal
            currentPicture={currentPicture}
            closeModal={() => this.setState({ currentPicture: null })}
          />
        )}
      </div>
    );
  }
}
