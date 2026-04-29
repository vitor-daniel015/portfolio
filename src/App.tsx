import { useState, useEffect } from 'react';
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
import { AdminProvider, useAdmin } from './context/AdminContext';


export default function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="min-h-screen bg-obsidian text-white selection:bg-street-blue/30 overflow-x-hidden">
          <AnimatedRoutes />
        </div>
      </Router>
    </AdminProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const { isAdmin } = useAdmin();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Linktree />} />
        <Route path="/tech" element={<TechPortfolio />} />
        <Route path="/audiovisual" element={<AudioVisualPortfolio isAdmin={isAdmin} />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </AnimatePresence>
  );
}
