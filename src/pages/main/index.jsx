import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllPokemons } from '../../services/api';
import styles from './style/style.module.css';
import { defineBg, getIcon } from '../../assets/auxFunctions';

import SearchBar from '../../components/searchBar';
import Loading from '../../components/loading';

function Main(props) {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsArray, setPokemonsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const { typedPokemon } = props;

  pokemons.sort((a, b) => (a.name > b.name ? 1 : -1));

  useEffect(() => {
    getAllPokemons().then(({ data: { cards } }) => {
      setPokemons(cards);
      setPokemonsArray(cards);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const filterdPokemon = pokemonsArray
      .filter(({ name }) => name.toLowerCase().includes(typedPokemon.toLowerCase()));
    setPokemons(filterdPokemon);
  }, [typedPokemon]);

  return (
    loading
      ? <Loading />
      : (
        <div className={styles.main}>
          <div className={styles.nav}>
            <h1>Pokedex</h1>
            <SearchBar />
          </div>
          <div className={styles.container}>
            {pokemons.map(({
              name, id, imageUrl, types,
            }) => (
              <Link to={`/pokemon/${id}`} className={styles.card} key={id} style={{ backgroundColor: types ? defineBg(types[0]) : '#E8DDD8' }}>
                <div>
                  <p>{name}</p>
                  <p>{id}</p>
                  {types && <img src={getIcon(types[0])} alt="icon" />}
                </div>
                <img src={imageUrl} alt={name} />
              </Link>
            ))}
          </div>
        </div>
      )
  );
}

const mapStateToProps = (state) => ({
  typedPokemon: state.typedPokemon,
});

export default connect(mapStateToProps)(Main);

Main.propTypes = {
  typedPokemon: PropTypes.string.isRequired,
};
