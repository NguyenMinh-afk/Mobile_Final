import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    // TODO: Clear session data if needed (e.g., AsyncStorage.clear())
    navigation.replace('SignIn');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Nguyễn Đức Minh</Text>
            <Text style={styles.username}>@minhnguyen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
              <Text style={styles.upgrade}>🎁 Nâng cấp tài khoản</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem icon="person-outline" label="Thông tin cá nhân" onPress={() => navigation.navigate('PersonalInfo')} />
          <MenuItem icon="key-outline" label="Đổi mật khẩu" onPress={() => navigation.navigate('ChangePassword')} />
          <MenuItem icon="language" label="Ngôn ngữ" onPress={() => navigation.navigate('Language')} />
          <MenuItem icon="settings-outline" label="Cài đặt" onPress={() => navigation.navigate('Settings')} />
          <MenuItem icon="chatbubble-ellipses-outline" label="Hỗ trợ từ kỹ thuật viên" />
          <MenuItem icon="log-out-outline" label="Đăng xuất" onPress={handleSignOut} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function MenuItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon} size={22} style={styles.menuIcon} />
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f0ed',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
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
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f2f0ed',
  },
  menuIcon: {
    marginRight: 16,
    marginLeft: 8,
  },
  menuText: {
    fontSize: 16,
  },
});
