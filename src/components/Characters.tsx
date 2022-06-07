import { useContext, useEffect, useState } from 'react';

import Cards from './Cards';
import { AppContext } from '../context/characters/reducers';
import IPersonaje from '../types/Personaje.types';

const Characters = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<IPersonaje[]>([]);

  const { getPersonajes, personajes } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    getPersonajes(page);
  }, [page]);

  useEffect(() => {
    setCharacters(personajes);
    setLoading(false);
  }, [personajes]);

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <button
        type="button"
        className="p-3 bg-blue-400 rounded"
        onClick={nextPage}
      >
        next
      </button>
      {loading ? (
        <div className="w-full h-full flex justify-center">
          <h1 className="text-2xl mt-5">...Loading</h1>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {characters.length > 0 &&
            characters.map((c) => <Cards key={c.id} character={c} />)}
        </div>
      )}
    </>
  );
};

export default Characters;
