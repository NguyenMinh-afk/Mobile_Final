import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



export default function SavedScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [theme, setTheme] = useState('light');
  const navigation = useNavigation();
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

  const renderItem = ({ item }) => {
    const toggleMenu = () => {
      setSelectedItemId(item.id);
      setMenuVisible(true);
    };

    const handleView = () => {
      console.log('Xem item:', item.title);
      setMenuVisible(false);
    };

    const handleDelete = () => {
      console.log('Xóa item:', item.title);
      setMenuVisible(false);
    };

    return (
      <TouchableOpacity style={[styles.item, theme === 'dark' && styles.darkItem]}>
      <View style={styles.itemContent}>
        <Text style={[styles.title, theme === 'dark' && styles.darkText]}>{item.title}</Text>
        <Text style={[styles.category, theme === 'dark' && styles.darkText]}>Danh mục: {item.category}</Text>
        <Text style={[styles.date, theme === 'dark' && styles.darkText]}>{item.date} {item.level}</Text>
      </View>
      <View style={styles.itemActions}>
        <View style={[styles.scoreBadge, theme === 'dark' && styles.darkScoreBadge]}>
          <Text style={[styles.score, theme === 'dark' && styles.darkText]}>{item.score}</Text>
        </View>
        <Ionicons name="bookmark" size={20} color={theme === 'dark' ? '#f4f3f4' : '#000'} style={styles.icon} />
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={theme === 'dark' ? '#f4f3f4' : '#000'} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* Menu Xem/Xóa */}
        <Modal
          transparent={true}
          visible={menuVisible && selectedItemId === item.id}
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setMenuVisible(false)}
          >
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItem} onPress={handleView}>
                <Ionicons name="eye-outline" size={20} color="#333" style={styles.menuIcon} />
                <Text style={styles.menuText}>Xem</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
                <Ionicons name="trash-outline" size={20} color="#FF0000" style={styles.menuIcon} />
                <Text style={[styles.menuText, { color: '#FF0000' }]}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, theme === 'dark' && styles.darkSafeArea]}>
      <View style={styles.container}>
        <View style={[styles.searchContainer, theme === 'dark' && styles.darkSearchContainer]}>
          <Ionicons name="search" size={18} color={theme === 'dark' ? '#f4f3f4' : '#888'} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, theme === 'dark' && styles.darkText]}
            placeholder="Tìm kiếm"
            placeholderTextColor={theme === 'dark' ? '#bbb' : '#888'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="filter" size={18} color={theme === 'dark' ? '#f4f3f4' : '#888'} style={styles.filterIcon} />
        </View>
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
      <StatusBar style={theme === 'dark' ? 'light' : 'auto'} />
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
    marginTop: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 120, // Điều chỉnh để menu xuất hiện gần biểu tượng ba chấm
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: 120,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  darkSafeArea: {
    backgroundColor: '#1c1c1c',
  },
  darkSearchContainer: {
    backgroundColor: '#2a2a2a',
  },
  darkText: {
    color: '#f4f3f4',
  },
  darkItem: {
    backgroundColor: '#2a2a2a',
  },
  darkScoreBadge: {
    backgroundColor: '#3a3a3a',
  },
  darkText: {
    color: '#f4f3f4',
  },

});