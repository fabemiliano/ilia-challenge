import pokeTypes from './pokeTypes';

function defineBg(pokeType) {
  const { color } = pokeTypes.filter(({ type }) => type === pokeType)[0];
  return color;
}

function getIcon(pokeType) {
  const { src } = pokeTypes.filter(({ type }) => pokeType === type)[0];
  return src;
}

export { defineBg, getIcon };
