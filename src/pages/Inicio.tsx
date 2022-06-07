import Characters from '../components/Characters';
import Character from '../components/Character';
import PersonajeStats from '../context/characters/reducers';

const Inicio = () => (
  <PersonajeStats>
    <Characters />
    <Character />
  </PersonajeStats>
);
export default Inicio;
