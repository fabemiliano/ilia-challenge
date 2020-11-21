import axios from 'axios';

const getAllPokemons = async () => axios.get('https://api.pokemontcg.io/v1/cards');

const getPokemonById = async (id) => axios.get(`https://api.pokemontcg.io/v1/cards/${id}`);

export { getAllPokemons, getPokemonById };
