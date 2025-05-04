import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function AccountScreen({ navigation }) {
  const handleSignOut = () => {
    // Xóa dữ liệu phiên người dùng tại đây nếu cần (ví dụ: AsyncStorage)
    navigation.replace('SignIn'); // Điều hướng về màn hình SignIn
  };

  const handleManageContent = () => {
    navigation.navigate('ManageContent'); // Điều hướng đến màn hình quản lý nội dung
  };

  const handleSystemSettings = () => {
    navigation.navigate('SystemSettings'); // Điều hướng đến màn hình cài đặt hệ thống
  };

  const handleActivityLogs = () => {
    navigation.navigate('ActivityLogs'); // Điều hướng đến màn hình xem nhật ký hoạt động
  };

  return (
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }} // Placeholder avatar
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Admin Nguyễn Văn A</Text>
          <Text style={styles.email}>admin@example.com</Text>
          <Text style={styles.role}>Vai trò: Quản trị viên</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleManageContent}>
          <Text style={styles.actionText}>Quản lý nội dung hệ thống</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleSystemSettings}>
          <Text style={styles.actionText}>Cài đặt hệ thống</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleActivityLogs}>
          <Text style={styles.actionText}>Xem nhật ký hoạt động</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Đăng xuất</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
    paddingTop: 70,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  role: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  signOutButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1cb0f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});