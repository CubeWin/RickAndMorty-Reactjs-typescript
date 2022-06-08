import { useContext, useEffect, useState } from 'react';

import Cards from './Cards';
import { AppContext } from '../context/characters/reducers';
import IPersonaje from '../types/Personaje.types';

const Characters = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<IPersonaje[]>([]);
  const [buscarPersonaje, setBuscarPersonaje] = useState('');

  const { getPersonajes, personajes, searchPersonaje } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    getPersonajes(page);
  }, [page]);

  useEffect(() => {
    setCharacters(personajes);
    setLoading(false);
  }, [personajes]);

  const nextPage = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const prevPage = () => {
    setLoading(true);
    setPage(page - 1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchPersonaje(buscarPersonaje.toLocaleLowerCase());
    setBuscarPersonaje('');
  };
  return (
    <div className="col-span-1 lg:col-span-2 xl:col-span-3 pb-5">
      <div className="bg-[#e4ebf1] rounded-2xl my-5 mx-2 flex justify-between">
        <form onSubmit={handleSubmit} className="flex justify-center">
          <label
            htmlFor="inputBusqueda"
            className="relative block h-10 w-96 my-auto mx-2 "
          >
            <span className="absolute inset-y-0 left-0 flex items-center justify-center pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="16px"
                height="16px"
              >
                <path
                  fill="#339AF0"
                  d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
                />
              </svg>
            </span>
            <input
              className="h-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-16 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for characters..."
              id="inputBusqueda"
              type="text"
              name="search"
              value={buscarPersonaje}
              onChange={(e) => setBuscarPersonaje(e.target.value)}
            />
            <span className="absolute inset-y-0 right-0 flex items-center justify-center pl-2 ">
              <button
                type="submit"
                className="h-full bg-blue-400 px-2 rounded-r text-white"
              >
                Search
              </button>
            </span>
          </label>
        </form>
        <div>
          <button
            type="button"
            className={` ease-in-out font-bold font-mono rounded-lg p-2 m-2 ${
              loading
                ? 'bg-blue-200'
                : 'bg-blue-400 hover:shadow-md transition-shadow duration-300'
            } mx-3 text-white`}
            onClick={prevPage}
            disabled={loading}
          >
            {`< prev`}
          </button>
          <button
            type="button"
            className={` ease-in-out font-bold font-mono rounded-lg p-2 m-2 ${
              loading
                ? 'bg-blue-200'
                : 'bg-blue-400 hover:shadow-md transition-shadow duration-300'
            } mx-3 text-white`}
            onClick={nextPage}
            disabled={loading}
          >
            {`next >`}
          </button>
        </div>
      </div>
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
    </div>
  );
};

export default Characters;
