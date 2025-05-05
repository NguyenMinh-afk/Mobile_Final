import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext

export default function MenuScreen() {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext); // Lấy hàm signOut từ AuthContext
  const [theme, setTheme] = useState(null);

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
    await signOut(); // Gọi hàm signOut từ AuthContext
    navigation.replace('SignIn'); // Điều hướng về SignIn
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

  if (theme === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const menuOptions = [
    { icon: 'person-outline', label: 'Thông tin cá nhân', screen: 'PersonalInfo' },
    { icon: 'key-outline', label: 'Đổi mật khẩu', screen: 'ChangePassword' },
    { icon: 'language', label: 'Ngôn ngữ', screen: 'Language' },
    { icon: 'settings-outline', label: 'Cài đặt', screen: 'Settings' },
    { icon: 'chatbubble-ellipses-outline', label: 'Hỗ trợ từ kỹ thuật viên' },
    { icon: 'log-out-outline', label: 'Đăng xuất', screen: 'SignIn', isSignOut: true },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, theme === 'dark' && styles.darkSafeArea]}>
      <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
        <View style={[styles.profileCard, theme === 'dark' && styles.darkProfileCard]}>
          <Image source={{ uri: 'https://via.placeholder.com/60' }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={[styles.name, theme === 'dark' && styles.darkText]}>Nguyễn Đức Minh</Text>
            <Text style={[styles.username, theme === 'dark' && styles.darkText]}>@minhnguyen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
              <Text style={[styles.upgrade, theme === 'dark' && styles.darkText]}>🎁 Nâng cấp tài khoản</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={20} color={theme === 'dark' ? '#f4f3f4' : '#000'} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {menuOptions.map(({ icon, label, screen, isSignOut }, index) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.menuItem,
                theme === 'dark' && styles.darkMenuItem,
                index < menuOptions.length - 1 && styles.menuItemWithBorder,
                theme === 'dark' && index < menuOptions.length - 1 && styles.darkMenuItemWithBorder,
              ]}
              onPress={() => handlePress(screen, isSignOut, label)}
            >
              <Ionicons name={icon} size={22} color={theme === 'dark' ? '#f4f3f4' : '#000'} style={styles.menuIcon} />
              <Text style={[styles.menuText, theme === 'dark' && styles.darkText]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f0ed',
  },
  darkSafeArea: {
    backgroundColor: '#1c1c1c',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#2a2a2a',
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  darkProfileCard: {
    backgroundColor: '#3a3a3a',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  username: {
    color: '#555',
    marginBottom: 4,
  },
  upgrade: {
    fontSize: 12,
    color: '#000',
    textDecorationLine: 'underline',
  },
  menuContainer: {
    flexGrow: 1,
    paddingVertical: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 30,
    backgroundColor: '#f2f0ed',
  },
  darkMenuItem: {
    backgroundColor: '#3a3a3a',
  },
  menuItemWithBorder: {
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  darkMenuItemWithBorder: {
    borderBottomColor: '#555',
  },
  menuIcon: {
    marginRight: 16,
    marginLeft: 8,
  },
  menuText: {
    fontSize: 16,
  },
  darkText: {
    color: '#f4f3f4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
