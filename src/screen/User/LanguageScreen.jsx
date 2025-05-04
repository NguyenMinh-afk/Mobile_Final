import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LanguageScreen() {
  const currentLanguages = ['Tiếng Việt', 'Tiếng Anh'];
  const moreLanguages = ['Tiếng Nhật', 'Tiếng Pháp', 'Tiếng Ý', 'Tiếng Hàn', 'Tiếng Trung'];
  const [selectedLanguages, setSelectedLanguages] = useState(['Tiếng Việt']); // Khởi tạo với ngôn ngữ mặc định

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
      ]}
      onPress={() => toggleLanguage(item)}
    >
      <Text style={styles.languageText}>{item}</Text>
      {selectedLanguages.includes(item) && (
        <Ionicons name="checkmark" size={18} color="#fff" style={styles.checkmark} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Text style={styles.subtitle}>Ngôn ngữ hiện tại:</Text>
        <FlatList
          data={currentLanguages}
          renderItem={renderLanguageItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />

        <Text style={styles.subtitle}>Thêm ngôn ngữ:</Text>
        <FlatList
          data={moreLanguages}
          renderItem={renderLanguageItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveLanguages}>
          <Text style={styles.saveText}>LƯU THAY ĐỔI</Text>
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
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    marginBottom: 20,
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
  selectedLanguageItem: {
    backgroundColor: '#007AFF',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  checkmark: {
    marginLeft: 10,
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
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});