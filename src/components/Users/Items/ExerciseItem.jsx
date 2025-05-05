import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExerciseItem = ({ item, onPress, onBookmarkPress, isSaved }) => {
  const [theme, setTheme] = useState('light');
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
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleView = () => {
    console.log('Xem');
    setMenuVisible(false);
  };

  const handleDelete = () => {
    console.log('Xóa');
    setMenuVisible(false);
  };

  return (
    <TouchableOpacity style={[styles.container, theme === 'dark' && styles.darkContainer]} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={[styles.infoContainer, theme === 'dark' && styles.darkInfoContainer]}>
        <Text style={[styles.title, theme === 'dark' && styles.darkText]}>{item.title}</Text>
        <Text style={[styles.category, theme === 'dark' && styles.darkText]}>Danh mục: {item.category}</Text>
        <View style={styles.footer}>
          <Image source={{ uri: item.authorAvatar }} style={styles.avatar} />
          <Text style={[styles.author, theme === 'dark' && styles.darkText]}>{item.author}</Text>
          <Text style={[styles.date, theme === 'dark' && styles.darkText]}>{item.date}</Text>
          <View style={[styles.easyTag, theme === 'dark' && styles.darkEasyTag]}>
            <Text style={[styles.easyText, theme === 'dark' && styles.darkText]}>Easy</Text>
          </View>
        </View>
      </View>

      {/* Hiển thị tổng số câu hỏi */}
      {item.totalQuestions && (
        <View style={styles.questionTag}>
          <Text style={styles.questionText}>{item.totalQuestions} câu</Text>
        </View>
      )}

      {/* Biểu tượng dấu trang */}
      <TouchableOpacity style={styles.bookmarkButton} onPress={onBookmarkPress}>
        <Ionicons
          name={isSaved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={isSaved ? '#007BFF' : 'black'}
        />
      </TouchableOpacity>

      {/* Biểu tượng ba chấm và menu */}
      <TouchableOpacity style={styles.moreButton} onPress={toggleMenu}>
        <Ionicons name="ellipsis-vertical" size={20} color="black" />
      </TouchableOpacity>

      {/* Menu Xem/Xóa */}
      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={[styles.menuContainer, theme === 'dark' && styles.darkMenuContainer]}>
            <TouchableOpacity style={styles.menuItem} onPress={handleView}>
              <Ionicons name="eye-outline" size={20} color={theme === 'dark' ? '#fff' : '#333'} style={styles.menuIcon} />
              <Text style={[styles.menuText, theme === 'dark' && styles.darkText]}>Xem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={20} color={theme === 'dark' ? '#FF5555' : '#FF000'} style={styles.menuIcon} />
              <Text style={[styles.menuText, theme === 'dark' && styles.darkText, { color: theme === 'dark' ? '#FF5555' : '#FF0000' }]}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {item.score && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{item.score}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  infoContainer: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  category: {
    color: '#888',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  avatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  author: {
    fontSize: 10,
    color: '#444',
  },
  date: {
    fontSize: 10,
    color: '#999',
    marginLeft: 8,
  },
  easyTag: {
    backgroundColor: '#e0f7fa',
    borderRadius: 4,
    paddingHorizontal: 4,
    marginLeft: 8,
  },
  easyText: {
    fontSize: 10,
    color: '#00acc1',
  },
  scoreContainer: {
    backgroundColor: '#007BFF',
    padding: 6,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  scoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  questionTag: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
    bottom: 25,
    left: 5,
  },
  questionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 25,
    right: 80,
  },
  moreButton: {
    position: 'absolute',
    top: 50,
    right: 10,
    transform: [{ rotate: '90deg' }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 150, // Điều chỉnh để menu xuất hiện gần biểu tượng ba chấm
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
  darkContainer: {
    backgroundColor: '#2a2a2a',
  },
  darkInfoContainer: {
    backgroundColor: '#2a2a2a',
  },
  darkEasyTag: {
    backgroundColor: '#444',
  },
  darkText: {
    color: '#f4f3f4',
  },
  darkMenuContainer: {
    backgroundColor: '#2a2a2a', // Darker background for dark mode
    borderColor: '#555', // Adjust border if needed
  },

});

export default ExerciseItem;