import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { mockUsers } from '../lib/mock-data';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Failed to parse auth data from localStorage", error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simula uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    // A verificação de senha é ignorada para esta simulação.
    if (foundUser) {
        const mockToken = `fake-jwt-token-for-${foundUser.role}`;
        
        setUser(foundUser);
        setToken(mockToken);
        localStorage.setItem('authUser', JSON.stringify(foundUser));
        localStorage.setItem('authToken', mockToken);
        navigate('/panel');
    } else {
        throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
