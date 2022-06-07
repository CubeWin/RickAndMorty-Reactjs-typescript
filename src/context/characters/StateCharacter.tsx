import axios from 'axios';
import { createContext, ReactNode, useReducer } from 'react';
import Personaje from '../../types/Personaje.types';

const GET_CHARACTERS: string = 'GET_CHARACTERS';
const GET_CHARACTER: string = 'GET_CHARACTER';

type ACTIONTYPE =
  | { type: 'GET_CHARACTERS'; payload: Personaje[] | Personaje }
  | { type: 'GET_CHARACTER'; payload: Personaje | Personaje[] };

type STATETYPE = {
  characters: Personaje[] | Personaje;
  character: Personaje | Personaje[];
};

type IContext = {
  characters: Personaje[] | Personaje;
  character: Personaje | Personaje[];
  // eslint-disable-next-line no-unused-vars
  getCharacters: (page: number) => void;
  // eslint-disable-next-line no-unused-vars
  getCharacter: (id: number) => void;
};

const ReducerCharacter = (state: STATETYPE, action: ACTIONTYPE): STATETYPE => {
  const { payload, type } = action;

  switch (type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: payload,
      };

    case GET_CHARACTER:
      return { ...state, character: payload };

    default:
      return state;
  }
};

export const CharacterContext = createContext<IContext | null>(null);

const StateCharacter = ({ children }: { children: ReactNode }) => {
  const initState = {
    characters: [] as Personaje[] | Personaje,
    character: {} as Personaje,
  };

  const [state, dispath] = useReducer(ReducerCharacter, initState);

  const getCharacters = (page: number = 1) => {
    const url: string = `https://rickandmortyapi.com/api/character/?page=${page}`;
    axios.get<Personaje[]>(url).then((res) => {
      dispath({ type: 'GET_CHARACTERS', payload: [...res.data] });
    });
  };

  const getCharacter = (id: number = 1) => {
    const url: string = `https://rickandmortyapi.com/api/character/${id}`;
    axios.get<Personaje>(url).then((res) => {
      dispath({ type: 'GET_CHARACTER', payload: res.data });
    });
  };

  return (
    <CharacterContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        characters: state.characters,
        character: state.character,
        getCharacters,
        getCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default StateCharacter;
