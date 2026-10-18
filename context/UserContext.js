'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user,  setUser]  = useState(null);
  const [token, setToken] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nb_user');
      const storedToken = localStorage.getItem('nb_token');
      if (stored)      setUser(JSON.parse(stored));
      if (storedToken) setToken(storedToken);
    } catch {}
  }, []);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem('nb_user',  JSON.stringify(userData));
    localStorage.setItem('nb_token', jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nb_user');
    localStorage.removeItem('nb_token');
    document.cookie = 'nb_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be inside UserProvider');
  return ctx;
}
