import { useState, useEffect } from 'react';

const ADMIN_KEY = 'daniel_portfolio_admin';
const PASSWORD = (import.meta as any).env.VITE_ADMIN_PASSWORD || 'admin123';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem(ADMIN_KEY);
    if (status === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string) => {
    if (password === PASSWORD) {
      localStorage.setItem(ADMIN_KEY, 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_KEY);
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
}
