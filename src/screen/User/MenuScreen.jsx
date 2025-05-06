import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function MenuScreen() {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext); // Lấy hàm signOut từ AuthContext
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
      <Text>Menu Screen</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  signOutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
