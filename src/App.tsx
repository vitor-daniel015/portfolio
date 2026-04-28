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

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('@portfolio:admin');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = () => {
    const senha = prompt("Digite a senha de acesso:");
    
    if (senha === "admin123") { 
      const adminUser = { email: 'vi.daniel16@gmail.com' };
      setUser(adminUser);
      localStorage.setItem('@portfolio:admin', JSON.stringify(adminUser));
      alert("Acesso de Administrador liberado!");
    } else if (senha) {
      alert("Senha incorreta!");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('@portfolio:admin');
  };

  return (
    <Router>
      <div className="min-h-screen bg-obsidian text-white selection:bg-street-blue/30 overflow-x-hidden">
        <AnimatedRoutes user={user} onLogin={handleLogin} onLogout={handleLogout} />
      </div>
    </Router>
  );
}

function AnimatedRoutes({ user, onLogin, onLogout }: any) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Linktree onLogin={onLogin} onLogout={onLogout} />} />
        <Route path="/tech" element={<TechPortfolio />} />
        <Route path="/audiovisual" element={<AudioVisualPortfolio />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </AnimatePresence>
  );
}