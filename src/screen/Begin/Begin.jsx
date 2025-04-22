import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const screens = [
  { image: require('../../assets/Begin/screen1.png'), title: "Confidence in your words", subtitle: "With conversation-based learning, you'll be talking from lesson one" },
  { image: require('../../assets/Begin/screen2.png'), title: "Take your time to learn", subtitle: "Develop a habit of learning and make it a part of your daily routine" },
  { image: require('../../assets/Begin/screen3.png'), title: "The lessons you need to learn", subtitle: "Using a variety of learning styles to learn and retain" }
];

const Begin = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={screens}
        keyExtractor={(item, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        renderItem={({ item }) => (
          <View style={styles.screenContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />

      {/* Chấm phân trang - Đặt ngoài ảnh */}
      <View style={styles.pagination}>
        {screens.map((_, i) => (
          <View key={i} style={[styles.dot, index === i ? styles.activeDot : null]} />
        ))}
      </View>

      {/* Tiêu đề & mô tả */}
      <Text style={styles.title}>{screens[index].title}</Text>
      <Text style={styles.subtitle}>{screens[index].subtitle}</Text>

      {/* Nút "Let's Start" */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('SignIn')}>
        <Text style={styles.buttonText}>Let's Start</Text>
      </TouchableOpacity>

      {/* Văn bản dưới nút */}
      <Text style={styles.footer}>Your first step to daily learning. We're here with you!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' },
  screenContainer: { width: width, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  image: { width: width * 0.6, height: height * 0.3, resizeMode: 'contain', marginBottom: 90 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 10, bottom: 150 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20, bottom: 150 },
  pagination: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20, position: 'absolute', bottom: 320 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#DDD', marginHorizontal: 5 },
  activeDot: { backgroundColor: '#FF9800' },
  button: { backgroundColor: '#C22749', paddingVertical: 16, paddingHorizontal: 130, borderRadius: 20, bottom: 90 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  footer: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 15, bottom: 80 }, // Căn dưới nút
});

export default Begin;
