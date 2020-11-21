import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllPokemons } from '../../services/api';
import styles from './style/style.module.css';
import SearchBar from '../../components/searchBar';
import { ApplicationContext } from '../../context';
import Loading from '../../components/loading';
import { defineBg, getIcon } from '../../assets/auxFunctions';

function Main() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsArray, setPokemonsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const { typedPokemon } = useContext(ApplicationContext);

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

export default Main;
