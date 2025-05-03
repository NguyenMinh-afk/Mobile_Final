import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function LanguageScreen() {
  const currentLanguages = ['Tiếng Việt', 'Tiếng Anh'];
  const moreLanguages = ['Tiếng Nhật', 'Tiếng Pháp', 'Tiếng Ý', 'Tiếng Hàn', 'Tiếng Trung'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ngôn ngữ</Text>

      <Text style={styles.subtitle}>Current Language:</Text>
      {currentLanguages.map((lang, index) => (
        <TouchableOpacity key={index} style={styles.languageItem}>
          <Text>{lang}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.subtitle}>Add Language:</Text>
      {moreLanguages.map((lang, index) => (
        <TouchableOpacity key={index} style={styles.languageItem}>
          <Text>{lang}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: '600', marginTop: 15 },
  languageItem: { padding: 10, backgroundColor: '#f0f0f0', marginVertical: 5, borderRadius: 6 },
});
