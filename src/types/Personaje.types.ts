type IPersonaje = {
  id: number;
  gender: string;
  image: string;
  name: string;
  species: string;
  status: string;
  type: string;
  episode: [];
  location: {};
  origin: {
    name: string;
    url: string;
  };
};

export default IPersonaje;
