import Characters from '../components/Characters';
import Character from '../components/Character';
import StateCharacter from '../context/characters/StateCharacter';

const Inicio = () => (
  <StateCharacter>
    <Characters />
    <Character />
  </StateCharacter>
);
export default Inicio;
