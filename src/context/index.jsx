import React, { useState } from 'react';

export const ApplicationContext = React.createContext();

// eslint-disable-next-line react/prop-types
function Context({ children }) {
  const [typedPokemon, setTypedPokemon] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [attacks, setAttacks] = useState([]);
  const [chosenAttack, setChosenAttack] = useState('');

  const context = {
    typedPokemon,
    setTypedPokemon,
    showModal,
    setShowModal,
    attacks,
    setAttacks,
    chosenAttack,
    setChosenAttack,
  };
  return (
    <ApplicationContext.Provider value={context}>
      {children}
    </ApplicationContext.Provider>
  );
}

export default Context;
