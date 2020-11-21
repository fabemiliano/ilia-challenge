/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import styles from './style/style.module.css';
import { changeTypedPokemon } from '../../actions';

function SearchBar(props) {
  const { typedPokemon, setTypedPokemon } = props;

  return (
    <div className={styles.search}>
      <input placeholder="Search a Pokemon" value={typedPokemon} onChange={({ target: { value } }) => setTypedPokemon(value)} />
      <div>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  typedPokemon: state.typedPokemon,
});
const mapDispatchToProps = (dispatch) => ({
  setTypedPokemon: (value) => dispatch(changeTypedPokemon(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
