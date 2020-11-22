const changeShowModal = () => ({
  type: 'SHOW_MODAL',
});

const changeAttacks = (value) => ({
  type: 'ATTACKS',
  value,
});

const changeChosenAttack = (value) => ({
  type: 'CHOSEN_ATTACK',
  value,
});

const changeTypedPokemon = (value) => ({
  type: 'TYPED_POKEMON',
  value,
});

const changeLanguage = (value) => ({
  type: 'LANGUAGE',
  value,
});

export {
  changeShowModal, changeAttacks, changeChosenAttack, changeTypedPokemon, changeLanguage,
};
