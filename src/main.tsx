import { createRoot } from 'react-dom/client';
import Inicio from './pages/Inicio';
import './index.css';
import './main.css';

const element = document.getElementById('root');
const root = createRoot(element!);
root.render(<Inicio />);
