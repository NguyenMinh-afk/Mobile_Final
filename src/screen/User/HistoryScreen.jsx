import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExerciseItem from '../../components/Users/Items/ExerciseItem';
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('done');
  const [searchText, setSearchText] = useState('');
  const [savedItems, setSavedItems] = useState([]); // Danh sách các bài tập đã lưu

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
    {
      id: '2',
      title: 'Travel and Tourism',
      category: 'Vocabulary',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      score: '20/25',
      image: 'https://link_to_image',
    },
    {
      id: '3',
      title: 'Tenses',
      category: 'Grammar',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      score: '09/10',
      image: 'https://link_to_image',
    },
    {
      id: '4',
      title: 'Hobbies and Interests',
      category: 'Speaking',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      score: '06/10',
      image: 'https://link_to_image',
    },
    {
      id: '5',
      title: 'Prepositions',
      category: 'Grammar',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      score: '11/15',
      image: 'https://link_to_image',
    },
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
      totalQuestions: 20,
    },
    {
      id: '2',
      title: 'Travel and Tourism',
      category: 'Vocabulary',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      image: 'https://link_to_image',
      totalQuestions: 25,
    },
    {
      id: '3',
      title: 'Tenses',
      category: 'Grammar',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      image: 'https://link_to_image',
      totalQuestions: 10,
    },
    {
      id: '4',
      title: 'Hobbies and Interests',
      category: 'Speaking',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      image: 'https://link_to_image',
      totalQuestions: 10,
    },
    {
      id: '5',
      title: 'Prepositions',
      category: 'Grammar',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      image: 'https://link_to_image',
      totalQuestions: 15,
    },
    {
      id: '6',
      title: 'Education and Learning',
      category: 'Reading',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      image: 'https://link_to_image',
      totalQuestions: 20,
    },
    {
      id: '7',
      title: 'Travel and Tourism',
      category: 'Vocabulary',
      author: 'Nguyễn Văn A',
      authorAvatar: 'https://i.pravatar.cc/300',
      date: '20/04/2025',
      image: 'https://link_to_image',
      totalQuestions: 30,
    },
  ];

  const filteredData = (activeTab === 'done' ? doneExercises : createdExercises).filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleBookmark = (item) => {
    const isSaved = savedItems.some(savedItem => savedItem.id === item.id);
    let updatedSavedItems;

    if (isSaved) {
      updatedSavedItems = savedItems.filter(savedItem => savedItem.id !== item.id);
    } else {
      updatedSavedItems = [...savedItems, item];
    }

    setSavedItems(updatedSavedItems);
    navigation.setParams({ savedItems: updatedSavedItems });
  };

  const renderItem = ({ item }) => (
    <ExerciseItem
      item={item}
      onBookmarkPress={() => toggleBookmark(item)}
      isSaved={savedItems.some(savedItem => savedItem.id === item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            placeholder="Tìm kiếm"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Filter pressed')}>
            <Ionicons name="filter-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: '#f2f2f2',
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabText: {
    color: '#888',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#007bff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  filterButton: {
    marginLeft: 'auto',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default HistoryScreen;