/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SearchBar from '../../components/searchBar';
import Loading from '../../components/loading';

import { getAllPokemons } from '../../services/api';
import { changeLanguage } from '../../actions';
import styles from './style/style.module.css';
import { defineBg, getIcon } from '../../assets/auxFunctions';
import br from '../../assets/images/br.png';
import uk from '../../assets/images/uk.png';

function Main(props) {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsArray, setPokemonsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const { typedPokemon, setLocale, locale } = props;

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
            <div className={styles.flags}>
              <img src={uk} data-testid="en-language" className={(locale === 'en') ? styles.border : styles.normal} alt="en" onClick={() => { i18n.changeLanguage('en'); setLocale('en'); }} />
              <img src={br} data-testid="pt-language" className={(locale === 'pt') ? styles.border : styles.normal} alt="pt" onClick={() => { i18n.changeLanguage('pt'); setLocale('pt'); }} />
            </div>
            <h1>Pokedex</h1>
            <SearchBar />
          </div>
          <div className={styles.container}>
            {pokemons.map(({
              name, id, imageUrl, types,
            }) => (
              <Link to={`/pokemon/${id}`} data-testid={id} className={styles.card} key={id} style={{ backgroundColor: types ? defineBg(types[0]) : '#E8DDD8' }}>
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
  locale: state.locale,
});

const mapDispatchToProps = (dispatch) => ({
  setLocale: (value) => dispatch(changeLanguage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

Main.propTypes = {
  typedPokemon: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
};
