import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    const loadLoginStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem('isLoggedIn');
        console.log('📥 Lấy từ AsyncStorage:', storedStatus);
        if (storedStatus !== null) {
          const parsedStatus = JSON.parse(storedStatus);
          setIsLoggedIn(parsedStatus);
          if (parsedStatus) {
            setTimeout(() => {
              Alert.alert('👋 Welcome back !');
            }, 500);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('❌ Lỗi khi tải trạng thái đăng nhập:', error);
      } finally {
        setIsLoading(false); // Kết thúc loading
      }
    };

    loadLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn !== null) {
      const saveLoginStatus = async () => {
        try {
          console.log('💾 Lưu vào AsyncStorage:', isLoggedIn);
          await AsyncStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        } catch (error) {
          console.error('❌ Lỗi khi lưu trạng thái đăng nhập:', error);
        }
      };

      saveLoginStatus();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
