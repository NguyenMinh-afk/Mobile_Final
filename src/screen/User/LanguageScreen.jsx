import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LanguageScreen() {
  const currentLanguages = ['Tiếng Việt', 'Tiếng Anh'];
  const moreLanguages = ['Tiếng Nhật', 'Tiếng Pháp', 'Tiếng Ý', 'Tiếng Hàn', 'Tiếng Trung'];
  const [selectedLanguages, setSelectedLanguages] = useState(['Tiếng Việt']); // Khởi tạo với ngôn ngữ mặc định
  const [theme, setTheme] = useState('light'); // Khởi tạo theme mặc định

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

  const toggleLanguage = (language) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const saveLanguages = () => {
    // Logic để lưu ngôn ngữ đã chọn (ví dụ: vào AsyncStorage hoặc gửi lên server)
    console.log('Ngôn ngữ đã chọn:', selectedLanguages);
    alert('Ngôn ngữ đã được lưu!');
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguages.includes(item) && styles.selectedLanguageItem,
        theme === 'dark' && styles.darkLanguageItem,
      ]}
      onPress={() => toggleLanguage(item)}
    >
      <Text style={[styles.languageText, theme === 'dark' && styles.darkText]}>{item}</Text>
      {selectedLanguages.includes(item) && (
        <Ionicons name="checkmark" size={18} color={theme === 'dark' ? '#6A5AE0' : '#fff'} style={styles.checkmark} />
      )}
    </TouchableOpacity>
  );


  return (
    <SafeAreaView  style={[styles.safeArea, theme === 'dark' && styles.darkSafeArea]}>
    <View style={styles.container}>
      <Text style={[styles.subtitle, theme === 'dark' && styles.darkText]}>Ngôn ngữ hiện tại:</Text>
        <FlatList
          data={currentLanguages}
          renderItem={renderLanguageItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />

        <Text style={[styles.subtitle, theme === 'dark' && styles.darkText]}>Thêm ngôn ngữ:</Text>

        <FlatList
          data={moreLanguages}
          renderItem={renderLanguageItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />

        <TouchableOpacity style={[styles.saveButton, theme === 'dark' && styles.darkSaveButton]} onPress={() => alert('Ngôn ngữ đã được lưu!')}>
          <Text style={[styles.saveText, theme === 'dark' && styles.darkText]}>LƯU THAY ĐỔI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  darkSafeArea: {
    backgroundColor: '#1c1c1c',
  },
  container: {
    padding: 20,
    flex: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 20,
    marginBottom: 10,
  },
  darkText: {
    color: '#f4f3f4',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkLanguageItem: {
    backgroundColor: '#2a2a2a',
  },
  selectedLanguageItem: {
    backgroundColor: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  darkSaveButton: {
    backgroundColor: '#444',
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  checkmark: {
    marginLeft: 10,
  },
});
