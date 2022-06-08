import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/characters/reducers';

const Character = () => {
  const [isActive, setIsActive] = useState(false);

  const { personaje, getPersonaje } = useContext(AppContext);

  const handleShowCharacter = () => {
    const cardCharacter = document.getElementById('characterSelected')!;
    setIsActive(!isActive);
    if (isActive) {
      cardCharacter.style.bottom = '-85vh';
    } else {
      cardCharacter.style.bottom = '0';
    }
  };

  useEffect(() => {
    console.log('UseEffect Character');

    getPersonaje(1);
  }, []);

  return (
    <div
      id="characterSelected"
      className="w-full fixed lg:col-span-1 lg:static transition-all duration-700 ease-in-out"
      style={{ bottom: '-85vh' }}
    >
      <div className="absolute -top-5  w-full text-right lg:hidden">
        <button
          type="button"
          onClick={handleShowCharacter}
          className="bg-red-400 px-3 py-0 mr-8 rounded-t-full h-10 w-10 text-white text-center"
        >
          {isActive ? 'x' : '^'}
        </button>
      </div>
      <div className="selected-pokemon rounded-3xl bg-gray-100 px-5 py-5 my-5 mx-3 sticky top-5 font-sans flex flex-col justify-around text-center  shadow-lg shadow-gray-700 lg:shadow-none">
        {personaje ? (
          <>
            <img
              className="h-auto mx-auto max-w-[270px] max-h-[270px] rounded-lg"
              src={personaje.image}
              alt="Pokemon"
            />
            <small className="text-gray-400 font-bold">N° {personaje.id}</small>
            <h1 className="font-bold capitalize text-xl mb-3">
              {personaje.name}
            </h1>
            <div className="flex justify-center mb-3">
              <div className="flex">{personaje.gender}</div>
            </div>
            <div className="flex justify-center mb-3">
              <div className="mx-2">
                <div className="text-gray-500 text-xs font-bold uppercase">
                  weight
                </div>
                <div className="font-bold font-mono">{personaje.gender} kg</div>
              </div>
              <div className="mx-2">
                <div className="text-gray-500 text-xs font-bold uppercase">
                  height
                </div>
                <div className="font-bold font-mono">
                  {`${personaje.location}`}
                </div>
              </div>
            </div>
            <div className="mb-3 p-1 w-auto rounded-full bg-slate-200 uppercase font-bold text-slate-600 text-sm">
              base exp {personaje.species}
            </div>

            <div className="flex justify-center items-center mb-3">
              {personaje.status}
            </div>
            <div className="uppercase">
              <span className="text-md font-bold mb-3 tracking-wider text-gray-500">
                abilities
              </span>
              <div className="flex flex-wrap justify-center items-center mt-2">
                {personaje.type}
              </div>
            </div>
          </>
        ) : (
          <h1>Selecte</h1>
        )}
      </div>
    </div>
  );
};

export default Character;
