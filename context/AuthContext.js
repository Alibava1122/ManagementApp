import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI, setAuthToken, getAuthToken } from '../utils/api';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  // useEffect(() => {
  //   checkUserLoggedIn();
  // }, []);


  // const checkUserLoggedIn = async () => {
  //   try {
  //     const token = await getAuthToken();
  //     if (token) {
  //       const response = await authAPI.getMe();
  //       setUser(response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error checking auth status:', error);
  //     await setAuthToken(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.register(userData);
      console.log('response from signup' , response)
      await setAuthToken(response.data.token);
      setUser(response.data);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      
      setLoading(true);
      setError(null);
      const response = await authAPI.login(credentials);
      console.log('response 2 is here' , response)
      await setAuthToken(response.data.token);
      setUser(response.data);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await setAuthToken(null);
      setUser(null);
     
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.updateProfile(profileData);
      setUser(response.data);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        // isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 