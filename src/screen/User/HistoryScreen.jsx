import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ExerciseItem from '../../components/Users/Items/ExerciseItem';

const HistoryScreen = () => {
  const [activeTab, setActiveTab] = useState('done');
  const [searchText, setSearchText] = useState('');

  const doneExercises = [
    {
      id: '1',
      title: 'Food and Drink',
      category: 'Vocabulary',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      score: '16/20',
      image: 'https://link_to_image',
    },
    // thêm dữ liệu khác nếu cần
  ];

  const createdExercises = [
    {
      id: '1',
      title: 'Food and Drink',
      category: 'Vocabulary',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      image: 'https://link_to_image',
    },
    {
      id: '2',
      title: 'Travel and Tourism',
      category: 'Vocabulary',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      image: 'https://link_to_image',
    },
    // thêm dữ liệu khác
  ];

  const filteredData = (activeTab === 'done' ? doneExercises : createdExercises).filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('done')} style={[styles.tab, activeTab === 'done' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'done' && styles.activeTabText]}>Lịch sử làm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('created')} style={[styles.tab, activeTab === 'created' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'created' && styles.activeTabText]}>Lịch sử tạo</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Tìm kiếm"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExerciseItem item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eee' },
  tabContainer: { flexDirection: 'row', marginTop: 10, backgroundColor: '#f2f2f2' },
  tab: { flex: 1, padding: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#007bff' },
  tabText: { color: '#888', fontWeight: 'bold' },
  activeTabText: { color: '#007bff' },
  searchContainer: { paddingHorizontal: 10, marginVertical: 10 },
  searchInput: { backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, height: 40 },
});

export default HistoryScreen;
