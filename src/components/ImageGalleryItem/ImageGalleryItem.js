import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ picture, onClick }) {
  const { webFormatURL, tags, largeImageURL } = picture;
  return (
    <li className={styles.galleryItem}>
      <img
        src={webFormatURL}
        alt={tags}
        className={styles.image}
        onClick={() => onClick({ largeImageURL, tags })}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webFormatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
