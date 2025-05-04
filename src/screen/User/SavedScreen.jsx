import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

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
        <View style={styles.scoreBadge}>
          <Text style={styles.score}>{item.score}</Text>
        </View>
        <Ionicons name="bookmark" size={20} color="#000" style={styles.icon} />
        <Ionicons name="ellipsis-horizontal" size={20} color="#000" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="filter" size={18} color="#888" style={styles.filterIcon} />
        </View>
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
      <StatusBar style="auto" />
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    marginTop: 20, // Tăng khoảng cách từ mép trên
    borderRadius: 12,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
  },
  filterIcon: {
    marginLeft: 8,
  },
  list: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreBadge: {
    backgroundColor: '#E6F0FF',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  score: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  icon: {
    marginLeft: 8,
  },
});