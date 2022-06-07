import Personaje from './Personaje.types';

type IContext = {
  characters: Personaje[] | Personaje;
  character: Personaje | Personaje[];
  getCharacters: Function;
  getCharacter: Function;
};

export type IContextProvider = {
  characters: Personaje[];
  character: Personaje;
  setCharacters: () => void;
  selectedCharacter: () => void;
};

export default IContext;
