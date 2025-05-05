import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(null);

  // Tải tùy chọn chế độ tối đã lưu khi ứng dụng khởi động
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        } else {
          setIsDarkMode(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.error('Lỗi khi tải theme:', error);
        setIsDarkMode(systemColorScheme === 'dark');
      }
    };
    loadTheme();
  }, []);

  // Lưu tùy chọn chế độ tối khi nó thay đổi
  useEffect(() => {
    const saveTheme = async () => {
      if (isDarkMode !== null) {
        try {
          await AsyncStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        } catch (error) {
          console.error('Lỗi khi lưu theme:', error);
        }
      }
    };
    saveTheme();
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Chờ theme được tải trước khi render
  if (isDarkMode === null) {
    return null; // Hoặc một giao diện loading
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};