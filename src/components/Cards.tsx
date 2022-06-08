import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/characters/reducers';
import IPersonaje from '../types/Personaje.types';

import './cards.css';

const Cards = ({ character }: { character: IPersonaje }) => {
  const [statusColor, setStatusColor] = useState<string>(
    'text-gray-500  fill-gray-500'
  );
  const { id, name, image, species, status, origin } = character;

  const { getPersonaje } = useContext(AppContext);

  useEffect(() => {
    if (status === 'Dead') {
      setStatusColor('text-red-600 fill-red-600');
    } else if (status === 'Alive') {
      setStatusColor('text-green-600 fill-green-600');
    }
  }, []);

  return (
    <button
      type="button"
      className="my-4 mx-auto"
      onClick={() => getPersonaje(id)}
    >
      <div className="w-[290px] h-[360px] relative block transition-shadow duration-500 ease-in-out bg-[#e4ebf1] p-4 rounded-2xl cw__box--shadow">
        <div className="w-full text-center block">
          <h2 className="text-2xl font-opensans font-bold p-0">{name}</h2>
        </div>
        <div className="absolute top-[80px] block text-left">
          <h3 className="m-0 text-lg font-opensans font-bold" title="Species">
            {species}
          </h3>
          <small className="text-sm" title="Origin">
            {origin.name}
          </small>
        </div>
        <div className="absolute h-[210px] w-[210px] bottom-4 rounded-lg overflow-hidden">
          <img
            className="absolute h-[260px] w-[260px] -right-[25px] -bottom-[45px] max-w-none"
            src={image}
            alt={name}
            loading="lazy"
          />
        </div>
        <div className="absolute right-4 bottom-5">
          <p
            title="status"
            className={`uppercase flex items-center rotate-180 text-vrl m-0 p-0 text-2xl font-audiowide font-extrabold ${statusColor}`}
          >
            <svg
              className="w-7 h-7 rotate-90 my-auto mb-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              {`<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->`}
              <path d="M352.4 243.8l-49.83 99.5c-6.009 12-23.41 11.62-28.92-.625L216.7 216.3l-30.05 71.75L88.55 288l176.4 182.2c12.66 13.07 33.36 13.07 46.03 0l176.4-182.2l-112.1 .0052L352.4 243.8zM495.2 62.86c-54.36-46.98-137.5-38.5-187.5 13.06L288 96.25L268.3 75.92C218.3 24.36 135.2 15.88 80.81 62.86C23.37 112.5 16.84 197.6 60.18 256h105l35.93-86.25c5.508-12.88 23.66-13.12 29.54-.375l58.21 129.4l49.07-98c5.884-11.75 22.78-11.75 28.67 0l27.67 55.25h121.5C559.2 197.6 552.6 112.5 495.2 62.86z" />
            </svg>
            {status}
          </p>
        </div>
        <span className="absolute bottom-5 left-6 font-audiowide font-extrabold text-2xl text-white cw__text--shadow">
          {id}
        </span>
      </div>
    </button>
  );
};

export default Cards;
