import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './style/style.module.css';
import { ApplicationContext } from '../../context';

function SearchBar() {
  const { typedPokemon, setTypedPokemon } = useContext(ApplicationContext);

  return (
    <div className={styles.search}>
      <input placeholder="Search a Pokemon" value={typedPokemon} onChange={({ target: { value } }) => setTypedPokemon(value)} />
      <div>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
}

export default SearchBar;
