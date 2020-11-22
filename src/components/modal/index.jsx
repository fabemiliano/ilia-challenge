/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import styles from './style/style.module.css';
import { changeShowModal } from '../../actions';

function Modal(props) {
  const { setShowModal, chosenAttack, attacks } = props;
  const attack = attacks.filter(({ name }) => chosenAttack === name)[0];
  const { t } = useTranslation();

  return (

    <div className={styles.main}>
      <button type="button" className={styles.exit} onClick={() => setShowModal(false)} data-testid="exit">
        <FontAwesomeIcon
          icon={faTimes}
          color="#fff"
        />
      </button>
      <div className={styles.attackInfo}>
        <p>{attack.name}</p>
        <p>{`Mana: -${attack.convertedEnergyCost}`}</p>
        <p>{`${t('damage')}: ${attack.damage}`}</p>
        <p>{`${t('description')}: ${attack.text ? attack.text : t('nothingToShow')}`}</p>
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

Modal.propTypes = {
  chosenAttack: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  attacks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
