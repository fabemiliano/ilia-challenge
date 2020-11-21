import React, { useState, useEffect } from 'react';
import { getPokemonById } from '../../services/api';
import styles from './style/style.module.css';

function Details(props) {
  // eslint-disable-next-line react/prop-types
  const { props: { match: { params: { id } } } } = props;
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [attacks, setAttacks] = useState([]);
  console.log(pokemon);
  console.log(attacks);
  useEffect(() => {
    getPokemonById(id).then(({ data: { card } }) => {
      setPokemon(card);
      setLoading(false);
      setAttacks(card.attacks);
    });
  }, []);
  return (
    loading
      ? <div>Carregando</div>
      : (
        <div className={styles.main}>
          <img src={pokemon.imageUrlHiRes} alt={pokemon.name} />
          <p>{pokemon.name}</p>
          <p>{pokemon.id}</p>
          <p>{pokemon.types && pokemon.types[0]}</p>
          {pokemon.resistances.map(({ type, value }) => (
            <p>
              {type}
              {value}
            </p>
          ))}
          {pokemon.weaknesses.map(({ type, value }) => (
            <p>
              {type}
              {value}
            </p>
          ))}
          {pokemon.attacks.map(({ name }) => <p>{name}</p>)}
        </div>
      )
  );
}

export default Details;
