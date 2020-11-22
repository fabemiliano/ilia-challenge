const INITIAL_STATE = {
  showModal: false,
  attacks: [],
  chosenAttack: '',
  typedPokemon: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_MODAL': return { ...state, showModal: !state.showModal };
    case 'ATTACKS': return { ...state, attacks: action.value };
    case 'CHOSEN_ATTACK': return { ...state, chosenAttack: action.value };
    case 'TYPED_POKEMON': return { ...state, typedPokemon: action.value };
    default: return state;
  }
};

export default reducer;
