/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { changeLanguage } from '../../actions';
import styles from './style/style.module.css';
import br from '../../assets/images/br.png';
import uk from '../../assets/images/uk.png';

function Languages(props) {
  const { i18n } = useTranslation();
  const { locale, setLocale } = props;

  return (
    <div className={styles.flags}>
      <img
        src={uk}
        data-testid="en-language"
        className={(locale === 'en') ? styles.border : styles.normal}
        alt="en"
        onClick={() => { i18n.changeLanguage('en'); setLocale('en'); }}
      />
      <img
        src={br}
        data-testid="pt-language"
        className={(locale === 'pt') ? styles.border : styles.normal}
        alt="pt"
        onClick={() => { i18n.changeLanguage('pt'); setLocale('pt'); }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  locale: state.locale,
});

const mapDispatchToProps = (dispatch) => ({
  setLocale: (value) => dispatch(changeLanguage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Languages);

Languages.propTypes = {
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
};
