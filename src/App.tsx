import { AnimatePresence } from 'motion/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Linktree } from './components/Linktree';
import { AudioVisualPortfolio } from './components/AudioVisualPortfolio';
import { Portfolio } from './components/Portfolio';
import { TechPortfolio } from './components/TechPortfolio';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-obsidian text-white selection:bg-street-blue/30 overflow-x-hidden">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Linktree />} />
        <Route path="/tech" element={<TechPortfolio />} />
        <Route path="/audiovisual" element={<AudioVisualPortfolio />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </AnimatePresence>
  );
}