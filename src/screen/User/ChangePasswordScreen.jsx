import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePasswordScreen() {
  const [theme, setTheme] = useState('light'); // Default theme

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');
    };
  
    loadTheme();
  
    // Listen for updates when navigating back or theme changes
    const unsubscribe = navigation.addListener('focus', loadTheme);
  
    return () => unsubscribe(); // Cleanup listener
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.safeArea, theme === 'dark' && styles.darkSafeArea]}>
      <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
        <Text style={styles.title}></Text>
        <View style={[styles.formContainer, theme === 'dark' && styles.darkFormContainer]}>
          <View style={[styles.inputContainer, theme === 'dark' && styles.darkInputContainer]}>
            <Ionicons name="lock-closed-outline" size={20} color={theme === 'dark' ? '#f4f3f4' : '#888'} style={styles.inputIcon} />
            <TextInput
              placeholder="Mật khẩu cũ"
              secureTextEntry
              style={[styles.input, theme === 'dark' && styles.darkText]}
              placeholderTextColor={theme === 'dark' ? '#bbb' : '#888'}
            />
          </View>
          <View style={[styles.inputContainer, theme === 'dark' && styles.darkInputContainer]}>
            <Ionicons name="lock-open-outline" size={20} color={theme === 'dark' ? '#f4f3f4' : '#888'} style={styles.inputIcon} />
            <TextInput
              placeholder="Mật khẩu mới"
              secureTextEntry
              style={[styles.input, theme === 'dark' && styles.darkText]}
              placeholderTextColor={theme === 'dark' ? '#bbb' : '#888'}
            />
          </View>

          <View style={[styles.inputContainer, theme === 'dark' && styles.darkInputContainer]}>
            <Ionicons name="lock-closed-outline" size={20} color={theme === 'dark' ? '#f4f3f4' : '#888'} style={styles.inputIcon} />
            <TextInput
              placeholder="Xác nhận mật khẩu mới"
              secureTextEntry
              style={[styles.input, theme === 'dark' && styles.darkText]}
              placeholderTextColor={theme === 'dark' ? '#bbb' : '#888'}
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.cancelButton, theme === 'dark' && styles.darkCancelButton]}>
              <Text style={[styles.cancelText, theme === 'dark' && styles.darkText]}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, theme === 'dark' && styles.darkSaveButton]}>
              <Text style={[styles.saveText, theme === 'dark' && styles.darkText]}>LƯU THAY ĐỔI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 0, // Remove unnecessary bottom padding
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    
  },
  inputIcon: {
    marginLeft: 10,
    marginRight: 5,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#a5a5a5',
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  cancelText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  saveText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  darkSafeArea: {
    backgroundColor: '#1c1c1c',
  },
  darkFormContainer: {
    backgroundColor: '#2a2a2a',
  },
  darkInputContainer: {
    backgroundColor: '#3a3a3a',
    borderColor: '#555',
  },
  darkCancelButton: {
    backgroundColor: '#555',
  },
  darkSaveButton: {
    backgroundColor: '#0066cc',
  },
  darkText: {
    color: '#f4f3f4',
  },
  darkSafeArea: {
    backgroundColor: '#1c1c1c',
  },
  darkContainer: {
    backgroundColor: '#1c1c1c',
  },

});