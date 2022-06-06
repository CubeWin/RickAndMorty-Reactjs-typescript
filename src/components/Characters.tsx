import { useEffect, useState } from 'react';
import axios from 'axios';

import IPersonaje from '../types/Personaje.types';
import Cards from './Cards';

const Characters = () => {
  const [characters, setCharacters] = useState<IPersonaje[]>([]);

  const getCharacter = () => {
    const url: string = `https://rickandmortyapi.com/api/character/?page=2`;
    axios.get(url).then((res) => {
      const char: IPersonaje[] = res.data.results;
      setCharacters(char);
    });
  };

  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {characters.length > 0 &&
        characters.map((c) => <Cards key={c.id} character={c} />)}
    </div>
  );
};

export default Characters;
