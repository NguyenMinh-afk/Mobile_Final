import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../../assets/User/user_img.png';
import Banner1 from '../../../assets/User/home_banner0.png';
import Banner2 from '../../../assets/User/home_banner2.png';
import Banner3 from '../../../assets/User/home_banner3.png';
import LessonImage1 from '../../../assets/User/lesson_image1.png';
import LessonImage2 from '../../../assets/User/lesson_image2.png';
import GoalImage from '../../../assets/User/goal_image.png';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
