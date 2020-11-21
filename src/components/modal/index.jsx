import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './style/style.module.css';
import { ApplicationContext } from '../../context';

function Modal() {
  const { setShowModal, chosenAttack, attacks } = useContext(ApplicationContext);
  const attack = attacks.filter(({ name }) => chosenAttack === name)[0];
  return (

    <div className={styles.main}>
      <div className={styles.exit}>
        <FontAwesomeIcon
          icon={faTimes}
          color="#fff"
          onClick={() => setShowModal(false)}
        />
      </div>
      <div className={styles.attackInfo}>
        <p>{attack.name}</p>
        <p>{`Mana: -${attack.convertedEnergyCost}`}</p>
        <p>{`Damage: ${attack.damage}`}</p>
        <p>{`Description: ${attack.text ? attack.text : 'nothing to show'}`}</p>
        {console.log(attack)}
      </div>
    </div>
  );
}

export default Modal;
