import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import styles from './style/style.module.css';
import { changeTypedPokemon } from '../../actions';

function SearchBar(props) {
  const { typedPokemon, setTypedPokemon } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.search} data-testid="search-icon">
      <input
        data-testid="search"
        placeholder={t('placeholder')}
        value={typedPokemon}
        onChange={({ target: { value } }) => setTypedPokemon(value)}
      />
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

SearchBar.propTypes = {
  typedPokemon: PropTypes.string.isRequired,
  setTypedPokemon: PropTypes.func.isRequired,
};
