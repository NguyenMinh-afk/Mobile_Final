import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ExerciseItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>Danh mục: {item.category}</Text>
        <View style={styles.footer}>
          <Image source={{ uri: item.authorAvatar }} style={styles.avatar} />
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <View style={styles.easyTag}>
            <Text style={styles.easyText}>Easy</Text>
          </View>
        </View>
      </View>
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
});

export default ExerciseItem;
