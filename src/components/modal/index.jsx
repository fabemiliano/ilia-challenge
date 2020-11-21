/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './style/style.module.css';
import { changeShowModal } from '../../actions';

function Modal(props) {
  const { setShowModal, chosenAttack, attacks } = props;
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

const mapStateToProps = (state) => ({
  chosenAttack: state.chosenAttack,
  attacks: state.attacks,
});

const mapDispatchToProps = (dispatch) => ({
  setShowModal: () => dispatch(changeShowModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
