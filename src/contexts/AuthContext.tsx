import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios defaults
axios.defaults.baseURL = 'https://api.contactsphere.com'; // Replace with your API URL
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored token on app load
    const token = localStorage.getItem('contactsphere_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token with backend (mock for now)
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      // Mock API call - replace with real endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with real API response
      const mockUser: User = {
        id: '1',
        username: 'demo_user',
        email: 'demo@contactsphere.com'
      };
      
      setUser(mockUser);
    } catch (error) {
      localStorage.removeItem('contactsphere_token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Mock API call - replace with real endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      if (email && password) {
        const mockToken = 'mock_jwt_token_' + Date.now();
        const mockUser: User = {
          id: '1',
          username: email.split('@')[0],
          email: email
        };
        
        localStorage.setItem('contactsphere_token', mockToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        setUser(mockUser);
        
        toast({
          title: "Welcome to ContactSphere!",
          description: "You've successfully logged in.",
        });
        
        return true;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Mock API call - replace with real endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      if (username && email && password) {
        toast({
          title: "Registration Successful!",
          description: "Please log in with your new account.",
        });
        return true;
      }
      
      throw new Error('Registration failed');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again with different credentials.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('contactsphere_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};