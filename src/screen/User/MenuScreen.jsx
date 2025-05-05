import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/AuthContext'; // cập nhật đúng đường dẫn


export default function MenuScreen() {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext); 
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');
    };

    loadTheme();

    const themeListener = setInterval(async () => {
      const newTheme = await AsyncStorage.getItem('theme');
      if (newTheme !== theme) {
        setTheme(newTheme);
      }
    }, 500);

    return () => clearInterval(themeListener);
  }, [theme]);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await signOut(); // Xóa trạng thái trong context
      navigation.replace('SignIn');
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể đăng xuất');
    }
  };
  

  const handlePress = (screen, isSignOut, label) => {
    if (isSignOut) {
      handleSignOut();
    } else if (screen) {
      navigation.navigate(screen);
    } else {
      Alert.alert('Thông báo', `Chức năng "${label}" hiện chưa được hỗ trợ.`);
    }
  };

  const menuOptions = [
    { icon: 'person-outline', label: 'Thông tin cá nhân', screen: 'PersonalInfo' },
    { icon: 'key-outline', label: 'Đổi mật khẩu', screen: 'ChangePassword' },
    { icon: 'language', label: 'Ngôn ngữ', screen: 'Language' },
    { icon: 'settings-outline', label: 'Cài đặt', screen: 'Settings' },
    { icon: 'chatbubble-ellipses-outline', label: 'Hỗ trợ từ kỹ thuật viên' },
    { icon: 'log-out-outline', label: 'Đăng xuất', screen: 'SignIn', isSignOut: true },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>
      {menuOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handlePress(option.screen, option.isSignOut, option.label)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
});
