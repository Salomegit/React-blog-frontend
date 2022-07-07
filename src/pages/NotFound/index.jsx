import React from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.css'

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>404</h1>
      <p>Page you are looking for not available</p>
      <div>
        <p>
          Navigate back to <Link to={'/'}>Homepage</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
