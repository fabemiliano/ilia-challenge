import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getPokemonById } from '../../services/api';
import styles from './style/style.module.css';
import Modal from '../../components/modal';
import { ApplicationContext } from '../../context';
import Loading from '../../components/loading';
import { defineBg, getIcon } from '../../assets/auxFunctions';

function Details(props) {
  // eslint-disable-next-line react/prop-types
  const { props: { match: { params: { id } } } } = props;

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  const {
    showModal, setShowModal, setAttacks, setChosenAttack,
  } = useContext(ApplicationContext);

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
                <p>Attacks</p>
                <div className={styles.attacks}>
                  {pokemon.attacks && pokemon.attacks.map(({ name }) => <button onClick={() => { setShowModal(true); setChosenAttack(name); }} type="button">{name}</button>)}
                </div>
              </div>
            </div>
          </div>
          {showModal && <Modal />}
        </div>
      )
  );
}

export default Details;
