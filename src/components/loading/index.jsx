import React from 'react';
import styles from './style/style.module.css';
import pokeball from '../../assets/images/pokeball.png';

function Loading() {
  return (
    <div className={styles.main}>
      <img src={pokeball} alt="" />
      <div>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
}

export default Loading;
