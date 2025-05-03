import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; // For icons like bookmark and more options

export default function SavedScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const savedItems = [
    { id: '1', title: 'Food and Drink', category: 'Vocabulary', score: '16/20', date: '20/04/2025', level: 'Easy' },
    { id: '2', title: 'Travel and Tourism', category: 'Vocabulary', score: '20/25', date: '20/04/2025', level: 'Easy' },
    { id: '3', title: 'Tenses', category: 'Grammar', score: '09/10', date: '20/04/2025', level: 'Easy' },
    { id: '4', title: 'Hobbies and Interests', category: 'Speaking', score: '06/10', date: '20/04/2025', level: 'Easy' },
  ];

  // Filter items based on search query
  const filteredItems = savedItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>Danh mục: {item.category}</Text>
        <Text style={styles.date}>{item.date} {item.level}</Text>
      </View>
      <View style={styles.itemActions}>
        <Text style={styles.score}>{item.score}</Text>
        <Ionicons name="bookmark" size={24} color="#000" style={styles.icon} />
        <Ionicons name="ellipsis-horizontal" size={24} color="#000" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="filter" size={20} color="#888" style={styles.filterIcon} />
      </View>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterIcon: {
    marginLeft: 10,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#e6f0ff',
    borderRadius: 12,
  },
  icon: {
    marginHorizontal: 5,
  },
});