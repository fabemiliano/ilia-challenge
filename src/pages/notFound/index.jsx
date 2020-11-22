import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style/style.module.css';
import pokeball from '../../assets/images/pokeball.png';

function NotFound() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div>
          <h1>4</h1>
          <img src={pokeball} alt="" />
          <h1>4</h1>
        </div>
        <h1>Not Found</h1>
        <Link to="/">Main Page</Link>
      </div>
    </div>
  );
}

export default NotFound;
