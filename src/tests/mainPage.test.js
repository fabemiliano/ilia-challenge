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

import App from '../App';

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
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('axios');

const mockedApi = {
  data: {
    cards: [
      {
        name: 'Pikachu',
        id: '101',
        type: ['electric'],
        imageUrl: '../test.png',
      },
      {
        name: 'Charmander',
        id: '102',
        type: ['Fire'],
        imageUrl: '../test.png',
      },
    ],
  },
};

describe('testing main page rendering', () => {
  // beforeEach(cleanup);
  test('the page should show pokedex title', async () => {
    axios.get.mockResolvedValue(mockedApi);
    const { queryByText } = renderWithRedux(<App />);
    await waitFor(() => {
      const text = queryByText(/pokedex/i);
      expect(text).toBeInTheDocument();
    });
  });
  test('the page should render the cards', async () => {
    axios.get.mockResolvedValue(mockedApi);
    const { queryByText } = renderWithRedux(<App />);
    await waitFor(() => {
      const text = queryByText(/pikachu/i);
      expect(text).toBeInTheDocument();
    });
  });
  test('on clicking a card redirect to description page', async () => {
    axios.get.mockResolvedValue(mockedApi);
    const { getByTestId, history } = renderWithRedux(<App />);
    console.log(history);
    await waitFor(async () => {
      const text = getByTestId('101');
      console.log(text);
      console.log(fireEvent.click(text));
      if (text) {
        fireEvent.click(text);
        const { pathname } = history.location;
        console.log(pathname);
      }
      // expect(pathname).toBe('/pokemon/101');
    });
  });
});
