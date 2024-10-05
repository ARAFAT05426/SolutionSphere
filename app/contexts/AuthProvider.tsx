"use client";
import axiosCommon from '@/utilities/axiosCommon';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  user: object | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  logout: () => Promise<void>;
  handleAuthModal: (isOpen: boolean) => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (credentials: { name: string; username: string; email: string; password: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axiosCommon.get("/session");
        setUser(data.user || null);

        // Open modal if the user does not exist
      } catch (error) {
        console.error("Error checking authentication:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // Run once on mount

  const handleAuthModal = (isOpen: boolean) => {
    setIsAuthModalOpen(isOpen);
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const { data } = await axiosCommon.post("/login", credentials);
      setUser(data.user);
      setIsAuthModalOpen(false); // Close modal on successful login
    } catch (error) {
      throw new Error("Login failed: " + (error instanceof Error ? error.message : "An error occurred."));
    }
  };

  const signup = async (credentials: { name: string; username: string; email: string; password: string }) => {
    try {
      const { data } = await axiosCommon.post("/register", credentials);
      setUser(data.user);
      setIsAuthModalOpen(false); // Close modal on successful signup
    } catch (error) {
      throw new Error("Signup failed: " + (error instanceof Error ? error.message : "An error occurred."));
    }
  };

  const logout = async () => {
    try {
      await axiosCommon.post("/logout");
      setUser(null);
      setIsAuthModalOpen(true); // Optionally reopen modal on logout
    } catch (error) {
      throw new Error("Logout failed: " + (error instanceof Error ? error.message : "An error occurred."));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    loading,
    isAuthModalOpen,
    handleAuthModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthProvider;
