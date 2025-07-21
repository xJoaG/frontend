// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface User {
  id: string;
  email: string;
  name?: string; // name is optional for now, adjust based on your DB schema if you add it
  // Add other user properties like isActive if needed from API response
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  requestEmailChange: (newEmail: string) => Promise<void>;
  verifyNewEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Check for stored token/user on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // In a real app, you'd send this token to your backend to verify it's valid
      // and fetch the actual user data, rather than just decoding client-side.
      // This is a basic client-side decode for immediate UI update.
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1])); // Basic decode of JWT payload
        // Ensure the token has not expired client-side (optional, backend should enforce)
        if (payload.exp * 1000 > Date.now()) {
          setUser({ id: payload.id, email: payload.email, name: payload.name || 'User' });
        } else {
          localStorage.removeItem('token'); // Token expired
        }
      } catch (error) {
        console.error("Failed to decode or parse token from localStorage", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://backend.cpp-hub.com/api';

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      setUser({ id: data.user.id, email: data.user.email, name: data.user.name || 'User' });
      // Navigate to dashboard upon successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // After successful registration, the API sends a verification email.
      // We don't log the user in immediately. They need to verify.
      console.log('Registration successful, please verify email:', data);
      navigate('/verify-email'); // Redirect to verify email page
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/'); // Redirect to home page after logout
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Forgot password request failed');
      }
      console.log('Forgot password response:', data.message);
      // Success message will be handled by the page component
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }
      console.log('Password reset response:', data.message);
      // Success message and redirect to login handled by page component
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const requestEmailChange = async (newEmail: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found. Please log in.');

      const response = await fetch(`${API_BASE_URL}/auth/change-email-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email change request failed');
      }
      console.log('Email change request response:', data.message);
      // Inform user to check new email
    } catch (error) {
      console.error('Request email change error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyNewEmail = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-email-verify?token=${token}`, {
        method: 'GET', // GET request as per API
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'New email verification failed');
      }
      console.log('New email verified response:', data.message);
      // After successful email change verification, the user's email in the JWT might be outdated.
      // A full refresh or re-login might be ideal here, or fetch user data.
      // For simplicity, we just log success.
    } catch (error) {
      console.error('Verify new email error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      forgotPassword,
      resetPassword,
      requestEmailChange,
      verifyNewEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};