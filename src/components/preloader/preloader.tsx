import styles from './preloader.module.css'

const Preloader = () => {
  return (
    <div className={styles.preloaderContainer}>
      <div className={styles.preloaderSpinner}></div>
    </div>
  );
};

export default Preloader;
