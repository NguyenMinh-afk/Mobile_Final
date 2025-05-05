import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CourseDetail2 = () => {
  const navigation = useNavigation();
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

  return (
    <SafeAreaView style={[styles.safeArea, theme === 'dark' && styles.darkSafeArea]}>
          <ScrollView contentContainerStyle={[styles.container, theme === 'dark' && styles.darkContainer]}>
            {/* Header */}
            <View style={[styles.header]}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, theme === 'dark' && styles.darkText]}>Khóa học Advanced Business English</Text>
        </View>

        {/* Course Info */}
        <View style={[styles.courseInfo, theme === 'dark' && styles.darkCourseInfo]}>
        <Text style={[styles.courseTitle, theme === 'dark' && styles.darkText]}>Khóa học Advanced Business English</Text>
          <Text style={styles.courseDescription}>
            Khóa học này dành cho người học nâng cao, tập trung vào tiếng Anh thương mại, kỹ năng đàm phán, viết email chuyên nghiệp, và giao tiếp trong môi trường kinh doanh quốc tế.
          </Text>
          <View style={styles.courseDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={18} color="#6A5AE0" />
              <Text style={[styles.detailText,theme === 'dark' && styles.darkText]}>Thời lượng: 12 tuần</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="bar-chart-outline" size={18} color="#6A5AE0" />
              <Text style={[styles.detailText,theme === 'dark' && styles.darkText]}>Cấp độ: Nâng cao</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={18} color="#6A5AE0" />
              <Text style={[styles.detailText,theme === 'dark' && styles.darkText]}>Số lượng bài học: 40</Text>
            </View>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>BẮT ĐẦU HỌC</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    backgroundColor: '#6A5AE0',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  courseInfo: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  courseDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  courseDetails: {
    marginTop: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  startButton: {
    marginTop: 30,
    backgroundColor: '#6A5AE0',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkSafeArea: {
    backgroundColor: '#1c1c1c',
  },
  darkContainer: {
    backgroundColor: '#1c1c1c',
  },
  darkHeader: {
    backgroundColor: '#2a2a2a',
  },
  darkCourseInfo: {
    backgroundColor: '#2a2a2a',
  },
  darkText: {
    color: '#f4f3f4',
  },

});

export default CourseDetail2;