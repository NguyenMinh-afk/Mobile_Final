import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function AccountScreen({ navigation }) {
  const handleSignOut = () => {
    // Xóa dữ liệu phiên người dùng tại đây nếu cần (ví dụ: AsyncStorage)
    navigation.replace('SignIn'); // Điều hướng về màn hình SignIn
  };

  return (
    <View style={styles.container}>
      <Text>Account Screen</Text>
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
