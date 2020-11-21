/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPokemonById } from '../../services/api';
import styles from './style/style.module.css';
import Modal from '../../components/modal';
import Loading from '../../components/loading';
import { defineBg, getIcon } from '../../assets/auxFunctions';
import { changeShowModal, changeAttacks, changeChosenAttack } from '../../actions';

function Details(props) {
  const {
    props: { match: { params: { id } } }, showModal, setShowModal, setAttacks, setChosenAttack,
  } = props;

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonById(id).then(({ data: { card } }) => {
      setPokemon(card);
      setLoading(false);
      setAttacks(card.attacks);
    });
  }, []);

  return (
    loading
      ? <Loading />
      : (
        <div>
          <div className={styles.main} style={{ filter: showModal ? 'blur(10px)' : 'blur(0px)' }}>
            <Link to="/" className={styles.arrowLeft}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div className={styles.circle} style={{ backgroundColor: pokemon.types ? defineBg(pokemon.types[0]) : '#E8DDD8' }}>
              <div>
                <img src={pokemon.types ? getIcon(pokemon.types[0]) : '/icons/normal.svg'} alt="icon" />
              </div>
              <p>{pokemon.name}</p>
              <p>{pokemon.id}</p>
            </div>
            <div className={styles.container}>
              <img src={pokemon.imageUrlHiRes} alt={pokemon.name} />
              <div className={styles.cardInfo}>
                <div className={styles.left}>
                  <p>Resistances</p>
                  {pokemon.resistances
                    ? (pokemon.resistances.map(({ type, value }) => (
                      <div>
                        <img src={getIcon(type)} alt="" />
                        <p>{value}</p>
                      </div>
                    )))
                    : <div><p>None</p></div>}
                  <p>Weaknesses</p>
                  {pokemon.weaknesses && pokemon.weaknesses.map(({ type, value }) => (
                    <div>
                      <img src={getIcon(type)} alt="" />
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.right}>
                  <p>Attacks</p>
                  <div className={styles.attacks}>
                    {pokemon.attacks && pokemon.attacks.map(({ name }) => <button onClick={() => { setShowModal(true); setChosenAttack(name); }} type="button">{name}</button>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showModal && <Modal />}
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
