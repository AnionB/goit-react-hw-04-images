import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ picture, onClick }) {
  const { webformatURL, tags, largeImageURL } = picture;
  return (
    <li className={styles.galleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={styles.image}
        onClick={() => onClick({ largeImageURL, tags })}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
