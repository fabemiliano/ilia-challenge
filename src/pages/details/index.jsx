import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Modal from '../../components/modal';
import Loading from '../../components/loading';

import { getPokemonById } from '../../services/api';
import styles from './style/style.module.css';
import { defineBg, getIcon } from '../../assets/auxFunctions';
import { changeShowModal, changeAttacks, changeChosenAttack } from '../../actions';

function renderCardInfo(pokemon, setShowModal, setChosenAttack, t) {
  return (
    <div className={styles.cardInfo}>
      <div className={styles.left}>
        <p>{t('resistances')}</p>
        {pokemon.resistances
          ? (pokemon.resistances.map(({ type, value }) => (
            <div key={value}>
              <img src={getIcon(type)} alt="" />
              <p>{value}</p>
            </div>
          )))
          : <div><p>None</p></div>}
        <p>{t('weaknesses')}</p>
        {pokemon.weaknesses.map(({ type, value }) => (
          <div key={value}>
            <img src={getIcon(type)} alt="" />
            <p>{value}</p>
          </div>
        ))}
      </div>
      <div className={styles.right}>
        <p>{t('attacks')}</p>
        <div className={styles.attacks}>
          {pokemon.attacks.map(({ name }) => <button data-testid="attack" key={name} onClick={() => { setShowModal(true); setChosenAttack(name); }} type="button">{name}</button>)}
        </div>
      </div>
    </div>
  );
}

function renderHeader(pokemon) {
  return (
    <div className={styles.circle} style={{ backgroundColor: pokemon.types ? defineBg(pokemon.types[0]) : '#E8DDD8' }}>
      <div>
        <div>
          <img src={pokemon.types ? getIcon(pokemon.types[0]) : '/icons/normal.svg'} alt="icon" />
        </div>
        <p>{pokemon.name}</p>
        <p>{pokemon.id}</p>
      </div>
    </div>
  );
}

function Details(props) {
  const {
    props: { match: { params: { id } } }, showModal, setShowModal, setAttacks, setChosenAttack,
  } = props;

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getPokemonById(id).then(({ data: { card } }) => {
      setPokemon(card);
      setLoading(false);
      setAttacks(card.attacks);
    })
      .catch(() => { setLoading(false); setRedirect(true); });
  }, []);

  return (
    loading
      ? <Loading />
      : (
        <div>
          <div className={styles.main} style={{ filter: showModal ? 'blur(10px)' : 'blur(0px)' }}>
            <Link to="/" className={styles.arrowLeft} data-testid="go-back">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            {renderHeader(pokemon)}
            <div className={styles.container}>
              <img src={pokemon.imageUrlHiRes} alt={pokemon.name} />
              {pokemon.attacks && renderCardInfo(pokemon, setShowModal, setChosenAttack, t)}
            </div>
          </div>
          {showModal && <Modal />}
          {redirect && <Redirect to="/notFound" />}
        </div>
      )
  );
}

const mapStateToProps = (state) => ({
  showModal: state.showModal,
});
const mapDispatchToProps = (dispatch) => ({
  setShowModal: () => dispatch(changeShowModal()),
  setAttacks: (value) => dispatch(changeAttacks(value)),
  setChosenAttack: (value) => dispatch(changeChosenAttack(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);

Details.propTypes = {
  props: PropTypes.objectOf(PropTypes.object).isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setAttacks: PropTypes.func.isRequired,
  setChosenAttack: PropTypes.func.isRequired,
};
