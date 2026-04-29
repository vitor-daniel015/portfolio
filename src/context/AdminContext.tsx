import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const ADMIN_KEY = 'daniel_portfolio_admin';
const PASSWORD = (import.meta as any).env.VITE_ADMIN_PASSWORD || 'admin123';

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const status = localStorage.getItem(ADMIN_KEY);
      if (status === 'true') {
        setIsAdmin(true);
      }
    } catch (e) {
      console.error('AdminContext: Error reading localStorage', e);
    }
  }, []);

  const login = (password: string) => {
    if (password === PASSWORD) {
      try {
        localStorage.setItem(ADMIN_KEY, 'true');
        setIsAdmin(true);
        return true;
      } catch (e) {
        console.error('AdminContext: Error saving localStorage', e);
      }
    }
    return false;
  };

  const logout = () => {
    try {
      localStorage.removeItem(ADMIN_KEY);
      setIsAdmin(false);
    } catch (e) {
      console.error('AdminContext: Error removing localStorage', e);
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
