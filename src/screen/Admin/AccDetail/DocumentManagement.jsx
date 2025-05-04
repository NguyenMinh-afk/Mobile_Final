import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DocumentManagement = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const documents = [
    { id: '1', title: 'Tài liệu: Từ vựng IELTS', updatedAt: '2025-05-04' },
    { id: '2', title: 'Tài liệu: Ngữ pháp TOEIC', updatedAt: '2025-05-03' },
    { id: '3', title: 'Tài liệu: Bài tập nghe', updatedAt: '2025-05-02' },
  ];

  const renderDocumentItem = ({ item }) => (
    <View style={[styles.item, isDarkMode && styles.darkItem]}>
      <Ionicons name="document-outline" size={22} color={isDarkMode ? '#60A5FA' : '#3B82F6'} style={styles.icon} />
      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, isDarkMode && styles.darkItemTitle]}>{item.title}</Text>
        <Text style={[styles.itemSubtitle, isDarkMode && styles.darkItemSubtitle]}>Cập nhật: {item.updatedAt}</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="pencil" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Quản lý tài liệu</Text>
      <TouchableOpacity style={[styles.addButton, isDarkMode && styles.darkAddButton]}>
        <Ionicons name="add" size={22} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Thêm tài liệu mới</Text>
      </TouchableOpacity>
      <FlatList
        data={documents}
        renderItem={renderDocumentItem}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={<Text style={[styles.emptyText, isDarkMode && styles.darkEmptyText]}>Không có tài liệu nào.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#1F2937',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1E40AF',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  darkTitle: {
    color: '#60A5FA',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  darkAddButton: {
    backgroundColor: '#2563EB',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  darkItem: {
    backgroundColor: '#2D3748',
    borderLeftColor: '#60A5FA',
  },
  icon: {
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  },
  darkItemTitle: {
    color: '#E5E7EB',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  darkItemSubtitle: {
    color: '#A0AEC0',
  },
  editButton: {
    backgroundColor: '#10B981',
    padding: 8,
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 20,
  },
  darkEmptyText: {
    color: '#A0AEC0',
  },
});

export default DocumentManagement;