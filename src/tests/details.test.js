/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  render, waitFor, cleanup, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import reducer from '../reducers';

import Details from '../pages/details';

const renderWithRedux = (
  component,
  {
    initialState, store = createStore(reducer,
      initialState),
  } = {},
) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Provider store={store}><Router history={history}>{component}</Router></Provider>),
    store,
    history,
  });
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str,
    i18n: {
      changeLanguage: () => new Promise(() => { }),
    },
  }),
}));

jest.mock('axios');

const mockedApi = {
  data: {
    card: {
      id: 'swsh4-177',
      name: 'Aegislash V',
      nationalPokedexNumber: 681,
      imageUrl: 'https://images.pokemontcg.io/swsh4/177.png',
      imageUrlHiRes: 'https://images.pokemontcg.io/swsh4/177_hires.png',
      types: ['Metal'],
      supertype: 'Pokémon',
      subtype: 'V',
      hp: '210',
      retreatCost: ['Colorless', 'Colorless', 'Colorless'],
      convertedRetreatCost: 3,
      number: '177',
      artist: 'aky CG Works',
      rarity: 'Rare Holo V',
      series: 'Sword & Shield',
      set: 'Vivid Voltage',
      setCode: 'swsh4',
      text: ['V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards.'],
      attacks: [{
        cost: ['Metal', 'Colorless'], name: 'Slash', text: '', damage: '50', convertedEnergyCost: 2,
      }, {
        cost: ['Metal', 'Metal', 'Colorless'], name: 'Sonic Edge', text: "This attack's damage isn't affected by any effects on your opponent's Active Pokémon.", damage: '130', convertedEnergyCost: 3,
      }],
      resistances: [{ type: 'Grass', value: '-30' }],
      weaknesses: [{ type: 'Fire', value: '×2' }],
    },
  },
};

describe('testing main page rendering', () => {
  beforeEach(cleanup);
  test('the page should render the card info', async () => {
    axios.get.mockResolvedValue(mockedApi);
    const { queryByText } = renderWithRedux(<Details props={{ match: { params: { id: 'swsh4-177' } } }} />);
    await waitFor(() => {
      const text = queryByText(/pokedex/i);
      expect(text).not.toBeInTheDocument();
      const resistances = queryByText(/resistances/);
      expect(resistances).toBeInTheDocument();
    });
  });
  test('should show a modal', async () => {
    axios.get.mockResolvedValue(mockedApi);
    const { getAllByTestId, queryByText } = renderWithRedux(<Details props={{ match: { params: { id: 'swsh4-177' } } }} />);
    await waitFor(() => {
      const [attack] = getAllByTestId('attack');
      const damage = queryByText(/damage/i);
      expect(damage).not.toBeInTheDocument();
      fireEvent.click(attack);
      const mana = queryByText(/mana/i);
      expect(mana).toBeInTheDocument();
    });
  });
});
