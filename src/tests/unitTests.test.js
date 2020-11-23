import axios from 'axios';
import { defineBg, getIcon } from '../assets/auxFunctions';
import { getAllPokemons, getPokemonById } from '../services/api';

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

const baseURL = (id) => `https://api.pokemontcg.io/v1/cards/${id}`;

describe('testing auxFunction', () => {
  it('tests define Bg', () => {
    const rightColor = defineBg('Metal');
    expect(rightColor).toBe('#9DB7B7');
    const wrongColor = defineBg('Dragon');
    expect(wrongColor).not.toBe('#9DB7B7');
  });
  it('tests getIcon function', () => {
    const wrongPath = getIcon('Dragon');
    expect(wrongPath).not.toBe('/icons/steel.svg');
    const rightPath = getIcon('Metal');
    expect(rightPath).toBe('/icons/steel.svg');
  });
});

describe('testing api Calls', () => {
  beforeEach(axios.mockReset());
  it('tests getAllPokemons', async () => {
    axios.get.mockResolvedValue(mockedApi);
    getAllPokemons().then((data) => expect(data).toEqual(mockedApi));
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
  it('tests getpokemonById', async () => {
    axios.get.mockResolvedValue(mockedApi);
    getPokemonById('101').then((data) => expect(data).toEqual(mockedApi));
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(baseURL('101'));
  });
});
