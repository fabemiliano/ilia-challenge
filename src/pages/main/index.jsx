import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPokemons } from '../../services/api';
import colors from '../../assets/bgColors';
import styles from './style/style.module.css';

function defineBg(pokeType) {
  // console.log(colors.filter(({ type }) => { console.log(type, pokeType);
  //  return type === pokeType; }) || { color: '#ff0' });
  const { color } = colors.filter(({ type }) => type === pokeType)[0] || { color: '#ff0' };
  return color;
}

function Main() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  pokemons.sort((a, b) => (a.name > b.name ? 1 : -1));
  useEffect(() => {
    getAllPokemons().then(({ data: { cards } }) => { setPokemons(cards); setLoading(false); });
  }, []);
  return (
    loading
      ? <div>Carregando</div>
      : (
        <div className={styles.main}>
          <div className={styles.container}>
            { pokemons.map(({
              name, id, imageUrl, types,
            }) => (
              <Link to={`/pokemon/${id}`} className={styles.card} key={id} style={{ backgroundColor: types ? defineBg(types[0]) : '#ff0' }}>
                <div>
                  <p>{name}</p>
                  <p>{id}</p>
                  <p>{types && types[0]}</p>
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
