import { SpinnerInfinity } from 'spinners-react';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <SpinnerInfinity
      size={90}
      thickness={180}
      speed={180}
      color="rgba(61, 172, 57, 1)"
      secondaryColor="#3f51b5"
      className={styles.loader}
    />
  );
}
