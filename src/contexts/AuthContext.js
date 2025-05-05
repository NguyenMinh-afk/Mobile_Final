import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadLoginStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem('isLoggedIn');
        const storedUser = await AsyncStorage.getItem('user');
        console.log('📥 Lấy từ AsyncStorage:', { storedStatus, storedUser });

        if (storedStatus !== null) {
          const parsedStatus = JSON.parse(storedStatus);
          setIsLoggedIn(parsedStatus);
          if (parsedStatus && storedUser) {
            setUser(JSON.parse(storedUser));
          } else if (parsedStatus) {
            setUser(null);
          }
          if (parsedStatus) {
            setTimeout(() => {
              Alert.alert('👋 Welcome back !');
            }, 500);
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error('❌ Lỗi khi tải trạng thái đăng nhập:', error);
        setIsLoggedIn(false); // Đặt trạng thái mặc định nếu có lỗi
        setUser(null);
      } finally {
        setIsLoading(false); // Đảm bảo luôn đặt isLoading thành false
        console.log('✅ Hoàn thành tải trạng thái:', { isLoggedIn, user, isLoading: false });
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
          if (isLoggedIn && user) {
            await AsyncStorage.setItem('user', JSON.stringify(user));
          } else if (isLoggedIn) {
            await AsyncStorage.removeItem('user'); // Xóa user nếu không có
          }
        } catch (error) {
          console.error('❌ Lỗi khi lưu trạng thái đăng nhập:', error);
        }
      };

      saveLoginStatus();
    }
  }, [isLoggedIn, user]);

  const signOut = async () => {
    try {
      setIsLoggedIn(false);
      setUser(null);
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('user');
      console.log('🚪 Đã đăng xuất và xóa AsyncStorage');
    } catch (error) {
      console.error('❌ Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};