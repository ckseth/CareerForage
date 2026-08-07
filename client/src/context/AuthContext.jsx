import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  requestForgotPassword,
  resetUserPassword,
} from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('careerforge_token'));
  const [loading, setLoading] = useState(true);

  // Helper to determine dashboard path based on role
  const getDashboardPath = (role) => {
    const userRole = role || user?.role;
    switch (userRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'recruiter':
        return '/recruiter/dashboard';
      case 'jobseeker':
      default:
        return '/dashboard';
    }
  };

  // Fetch logged in user details on initial load if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const data = await getCurrentUser();
          if (data.success) {
            setUser(data.user);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Session restore failed:', error);
          handleLogout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      if (data.success) {
        localStorage.setItem('careerforge_token', data.token);
        setToken(data.token);
        setUser(data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
        return { success: true, user: data.user, role: data.user.role };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      if (data.success) {
        localStorage.setItem('careerforge_token', data.token);
        setToken(data.token);
        setUser(data.user);
        toast.success('Account created successfully!');
        return { success: true, user: data.user, role: data.user.role };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, message };
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // Ignore logout API error
    } finally {
      localStorage.removeItem('careerforge_token');
      setToken(null);
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  const forgotPassword = async (email) => {
    try {
      const data = await requestForgotPassword(email);
      if (data.success) {
        toast.success(data.message || 'Reset code sent to your email!');
        return { success: true, demoResetToken: data.demoResetToken };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Password reset request failed.';
      toast.error(message);
      return { success: false, message };
    }
  };

  const resetPassword = async (resetData) => {
    try {
      const data = await resetUserPassword(resetData);
      if (data.success) {
        localStorage.setItem('careerforge_token', data.token);
        setToken(data.token);
        setUser(data.user);
        toast.success('Password reset successfully!');
        return { success: true, user: data.user };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Password reset failed.';
      toast.error(message);
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout: handleLogout,
        forgotPassword,
        resetPassword,
        getDashboardPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
