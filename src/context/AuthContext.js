import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  checkLoginStatus: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status when the app starts
  const checkLoginStatus = async () => {
    try {
      // Check for stored credentials
      const credentials = await AsyncStorage.getItem('userCredentials');
      
      // Check if remember me is set
      const rememberMe = await AsyncStorage.getItem('rememberMe');

      if (credentials) {
        // User has previous login credentials
        setIsLoggedIn(true);
        return true;
      }

      setIsLoggedIn(false);
      return false;
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Remove stored credentials
      await AsyncStorage.removeItem('userCredentials');
      await AsyncStorage.removeItem('rememberMe');
      
      // Update login state
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Check login status on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      setIsLoggedIn, 
      checkLoginStatus,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;