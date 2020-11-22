import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style/style.module.css';
import pokeball from '../../assets/images/pokeball.png';

function Loading() {
  const { t } = useTranslation();

  const phrase = (t('loading')).split('');
  return (
    <div className={styles.main}>
      <img src={pokeball} alt="" />
      <div>
        {phrase.map((e, i) => <span key={`${i + 1}i`}>{e}</span>)}
      </div>
    </div>
  );
}

export default Loading;
