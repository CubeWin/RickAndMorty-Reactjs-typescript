import axios from 'axios';
import { createContext, FC, ReactElement, ReactNode, useReducer } from 'react';
import IPersonaje from '../../types/Personaje.types';

type InitialStateType = {
  personajes: IPersonaje[];
  personaje: IPersonaje;
  // eslint-disable-next-line no-unused-vars
  getPersonajes: (page: number) => void;
  // eslint-disable-next-line no-unused-vars
  getPersonaje: (id: number) => void;
};
type ACTIONTYPE =
  | { type: 'SELECT_CHARACTERS'; payload: IPersonaje[] }
  | { type: 'SELECT_CHARACTER'; payload: IPersonaje };

type STATETYPE = {
  personajes: IPersonaje[];
  personaje: IPersonaje;
};

const initialState = {
  personajes: [] as IPersonaje[],
  personaje: {} as IPersonaje,
  getPersonajes: (): void => {},
  getPersonaje: (): void => {},
};

export const AppContext = createContext<InitialStateType>(initialState);

const personajeReducer = (state: STATETYPE, action: ACTIONTYPE) => {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT_CHARACTERS':
      return { ...state, personajes: payload };

    case 'SELECT_CHARACTER':
      return { ...state, personaje: payload };

    default:
      return state;
  }
};

interface props {
  children: ReactNode;
}

const PersonajeStats: FC<props> = ({ children }): ReactElement => {
  const initialReducerState = {
    personajes: [] as IPersonaje[],
    personaje: {} as IPersonaje,
  };

  const [state, dispath] = useReducer(personajeReducer, initialReducerState);

  const getPersonajes = async (page: number): Promise<void> => {
    const url: string = `https://rickandmortyapi.com/api/character/?page=${page}`;
    // await axios.get<{ results: IPersonaje[] }>(url).then((res) => {
    //   const { data } = res;
    //   console.log(state.personajes);

    //   dispath({
    //     type: 'SELECT_CHARACTERS',
    //     payload: [...state.personajes, ...data.results],
    //   });
    // });
    const res = await axios.get<{ results: IPersonaje[] }>(url);
    const {
      data: { results },
    } = res;
    dispath({ type: 'SELECT_CHARACTERS', payload: [...results] });
  };

  const getPersonaje = async (id: number): Promise<void> => {
    const url: string = `https://rickandmortyapi.com/api/character/${id}`;
    await axios.get<IPersonaje>(url).then((res) => {
      const { data } = res;
      dispath({ type: 'SELECT_CHARACTER', payload: data });
    });
  };

  // const ctxValue = useMemo(
  //   () => ({
  //     personajes: state.personajes,
  //     personaje: state.personaje,
  //     getPersonajes,
  //     getPersonaje,
  //   }),
  //   []
  // );

  return (
    <AppContext.Provider
      value={{
        personajes: state.personajes,
        personaje: state.personaje,
        getPersonajes,
        getPersonaje,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default PersonajeStats;
