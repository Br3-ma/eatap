// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  // Load user info from AsyncStorage on app start
  useEffect(() => {
    const loadUserInfo = async () => {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString) {
        setUserInfo(JSON.parse(userInfoString));
      }
    };
    loadUserInfo();
  }, []);

  // Function to update user info
  const updateUserInfo = async (newUserInfo) => {
    setUserInfo(newUserInfo);
    await AsyncStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};