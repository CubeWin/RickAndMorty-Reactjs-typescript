import { createContext } from 'react';
import IContext from '../../types/Context.types';

const CharacterContext = createContext<IContext | null>(null);

export default CharacterContext;
