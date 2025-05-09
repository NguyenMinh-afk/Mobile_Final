import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LessonsManagementScreen() {
  // Fake data
  const [lessons, setLessons] = useState([
    { 
      id: '1', 
      title: 'Basic Grammar 1',
      questionCount: 10,
      datePosted: '2024-04-29',
      author: 'Teacher John',
      isVisible: true 
    },
    { 
      id: '2', 
      title: 'Vocabulary Test',
      questionCount: 15,
      datePosted: '2024-04-28',
      author: 'Teacher Mary',
      isVisible: false 
    },
    // Add more fake data as needed
  ]);

  const [filter, setFilter] = useState('all'); // all, visible, hidden
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    const matchesFilter =
      filter === 'all' || 
      (filter === 'visible' && lesson.isVisible) || 
      (filter === 'hidden' && !lesson.isVisible);
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle visibility toggle
  const handleToggleVisibility = (id) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === id ? { ...lesson, isVisible: !lesson.isVisible } : lesson
      )
    );
    setMenuVisible(null);
  };

  // Handle delete
  const handleDelete = (id) => {
    setLessons((prevLessons) => prevLessons.filter(lesson => lesson.id !== id));
    setMenuVisible(null);
  };

  // Render each lesson
  const renderLesson = ({ item }) => (
    <View style={[styles.lessonCard, !item.isVisible && styles.hiddenLesson]}>
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonDetails}>Số câu hỏi: {item.questionCount}</Text>
        <Text style={styles.lessonDetails}>Ngày đăng: {item.datePosted}</Text>
        <Text style={styles.lessonDetails}>Người đăng: {item.author}</Text>
      </View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={(event) => {
          const { pageY, pageX } = event.nativeEvent;
          setMenuPosition({ x: 20, y: pageY }); // Adjust these values as needed
          setMenuVisible(menuVisible === item.id ? null : item.id);
        }}
      >
        <MaterialIcons name="more-vert" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={menuVisible === item.id}
        animationType="fade"
        onRequestClose={() => setMenuVisible(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1} 
          onPress={() => setMenuVisible(null)}
        >
          <View 
            style={[
              styles.dropdownMenu,
              {
                position: 'absolute',
                top: menuPosition.y,
                right: menuPosition.x,
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                console.log('View', item.id);
                setMenuVisible(null);
              }}
            >
              <MaterialIcons name="visibility" size={20} color="#333" />
              <Text style={styles.menuItemText}>View</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleToggleVisibility(item.id)}
            >
              <MaterialIcons 
                name={item.isVisible ? "visibility-off" : "visibility"} 
                size={20} 
                color="#333" 
              />
              <Text style={styles.menuItemText}>
                {item.isVisible ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleDelete(item.id)}
            >
              <MaterialIcons name="delete" size={20} color="#FF5252" />
              <Text style={[styles.menuItemText, styles.deleteText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchFilterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search lessons..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
            onPress={() => setFilter('all')}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'visible' && styles.activeFilter]}
            onPress={() => setFilter('visible')}
          >
            <Text style={styles.filterText}>Visible</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'hidden' && styles.activeFilter]}
            onPress={() => setFilter('hidden')}
          >
            <Text style={styles.filterText}>Hidden</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredLessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLesson}
        contentContainerStyle={styles.listContainer}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  filterButtons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginLeft: 5,
    backgroundColor: '#fff',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterText: {
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  hiddenLesson: {
    backgroundColor: '#f8f8f8',
    opacity: 0.7,
  },
  lessonInfo: {
    flex: 1,
    marginRight: 10,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  lessonDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  menuContainer: {
    position: 'relative',
    zIndex: 1,
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 150,
    position: 'absolute',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#333',
  },
  deleteText: {
    color: '#FF5252',
  },
  toggleButton: {
    backgroundColor: '#E3F2FD',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});