import { GET_CHARACTERS, GET_CHARACTER } from '../types';
import Icontext from '../../types/Context.types';

type ACTIONTYPE =
  | { type: 'GET_CHARACTERS'; payload: {} }
  | { type: 'GET_CHARACTER'; payload: {} };

export default (state: Icontext, action: ACTIONTYPE) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CHARACTERS:
      return { ...state, characters: payload };
    case GET_CHARACTER:
      return { ...state, selectedCharacter: payload };
    default:
      return state;
  }
};
