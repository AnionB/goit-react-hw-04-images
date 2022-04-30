import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({ handleClick }) {
  return (
    <button
      type="button"
      className={styles.loadButton}
      onClick={() => handleClick()}
    >
      Load more
    </button>
  );
}
Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
