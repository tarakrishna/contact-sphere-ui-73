import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { authAPI, setAuthToken } from '@/lib/api';

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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored token on app load
    const token = localStorage.getItem('contactsphere_token');
    if (token) {
      setAuthToken(token);
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
    } catch (error) {
      localStorage.removeItem('contactsphere_token');
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      const response = await authAPI.login({ email, password });
      
      if (response.token && response.user) {
        localStorage.setItem('contactsphere_token', response.token);
        setAuthToken(response.token);
        setUser(response.user);
        
        toast({
          title: "Welcome to ContactSphere!",
          description: "You've successfully logged in.",
        });
        
        return true;
      }
      
      throw new Error('Invalid response from server');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Please check your credentials and try again.",
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
      
      await authAPI.register({ username, email, password });
      
      toast({
        title: "Registration Successful!",
        description: "Please log in with your new account.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Please try again with different credentials.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('contactsphere_token');
    setAuthToken(null);
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