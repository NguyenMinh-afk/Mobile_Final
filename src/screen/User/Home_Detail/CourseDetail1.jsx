import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CourseDetail1 = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Khóa học Beginner English</Text>
        </View>

        {/* Course Info */}
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>Khóa học Beginner English</Text>
          <Text style={styles.courseDescription}>
            Khóa học này dành cho người mới bắt đầu, tập trung vào từ vựng cơ bản, ngữ pháp, và kỹ năng giao tiếp hàng ngày. Phù hợp với người muốn xây dựng nền tảng tiếng Anh vững chắc.
          </Text>
          <View style={styles.courseDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={18} color="#6A5AE0" />
              <Text style={styles.detailText}>Thời lượng: 10 tuần</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="bar-chart-outline" size={18} color="#6A5AE0" />
              <Text style={styles.detailText}>Cấp độ: Sơ cấp</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={18} color="#6A5AE0" />
              <Text style={styles.detailText}>Số lượng bài học: 30</Text>
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
});

export default CourseDetail1;