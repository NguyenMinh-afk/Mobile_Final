import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../assets/User/user_img.png';
import Banner1 from '../../assets/User/home_banner0.png';
import Banner2 from '../../assets/User/home_banner2.png';
import Banner3 from '../../assets/User/home_banner3.png';
import LessonImage1 from '../../assets/User/lesson_image1.png';
import LessonImage2 from '../../assets/User/lesson_image2.png';
import GoalImage from '../../assets/User/goal_image.png';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
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
  const insights = [
    { emoji: '📘', title: 'Vocabulary', sub: 'Start Learning', navigateTo: 'VocabularyDetail' },
    { emoji: '✏️', title: 'Grammar', sub: 'Practice Grammar', navigateTo: 'GrammarDetail' },
    { emoji: '🎧', title: 'Listening', sub: 'Practice Listening', navigateTo: 'ListeningDetail' },
    { emoji: '🗣️', title: 'Speaking', sub: 'Practice Speaking', navigateTo: 'SpeakingDetail' },
    { emoji: '🖊️', title: 'Writing', sub: 'Practice Writing', navigateTo: 'WritingDetail' },
    { emoji: '🐞', title: 'Reading', sub: 'Practice Reading', navigateTo: 'ReadingDetail' },
    { emoji: '❓', title: 'Quizzes', sub: 'Practice Quizzes', navigateTo: 'QuizzersDetail' },
    { emoji: '🚫', title: 'Coming soon', sub: 'Coming soon', navigateTo: 'ComingSoon' },
  ];

  const lessons = [
    { image: LessonImage1, title: 'Lesson 1', category: 'Business English', time: '2 hours' },
    { image: LessonImage2, title: 'Lesson 2', category: 'Business English', time: '2 hours' },
  ];

  const dailyChallenges = [
    { id: '1', title: 'Daily Vocabulary Quiz', points: '50 points', navigateTo: 'DailyQuizDetail' },
    { id: '2', title: 'Grammar Challenge', points: '75 points', navigateTo: 'GrammarChallengeDetail' },
  ];

  const recommendedCourses = [
    { id: '1', title: 'Beginner English', level: 'Beginner', duration: '10 hours', image: LessonImage1, navigateTo: 'CourseDetail1' },
    { id: '2', title: 'Advanced Business English', level: 'Advanced', duration: '15 hours', image: LessonImage2, navigateTo: 'CourseDetail2' },
  ];

  // Filter data based on search query
  const filteredInsights = insights.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLessons = lessons.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDailyChallenges = dailyChallenges.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecommendedCourses = recommendedCourses.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.safeArea, theme === 'dark' && styles.darkSafeArea]}>
      <ScrollView style={[styles.container, theme === 'dark' && styles.darkContainer]}>
        {/* Header */}
        <View style={[styles.header, theme === 'dark' && styles.darkHeader]}>
          <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo')}>
            <Image source={Avatar} style={styles.avatar} />
          </TouchableOpacity>
          <View style={[styles.searchContainer, theme === 'dark' && styles.darkSearchContainer]}>
            <Ionicons name="search-outline" size={20} color={theme === 'dark' ? '#bbb' : '#888'} style={styles.searchIcon} />
            <TextInput
              placeholder="Tìm kiếm"
              style={[styles.searchInput, theme === 'dark' && styles.darkText]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme === 'dark' ? '#777' : '#888'}
            />
            <TouchableOpacity onPress={() => console.log('Filter pressed')}>
              <Ionicons name="filter-outline" size={24} color={theme === 'dark' ? '#bbb' : '#333'} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <View style={styles.notificationContainer}>
              <Ionicons name="notifications-outline" size={24} color={theme === 'dark' ? '#bbb' : '#333'} />
              <View style={styles.notificationDot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Banners */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          style={styles.bannerScroll}
        >
          <Image source={Banner1} style={styles.banner} />
          <Image source={Banner2} style={styles.banner} />
          <Image source={Banner3} style={styles.banner} />
        </ScrollView>

        {/* Your Insights */}
        {filteredInsights.length > 0 && (
          <View style={[styles.sectionContainer, theme === 'dark' && styles.darkSectionContainer]}>
          <View style={[styles.sectionHeader, theme === 'dark' && styles.darkSectionHeader]}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}>Your Insights</Text>
            <TouchableOpacity onPress={() => console.log('Navigating to Insights')}>
              <Text style={[styles.viewAllText]}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.insightsRow}
          >
            {filteredInsights.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.insightItem, theme === 'dark' && styles.darkInsightItem]}
                onPress={() => item.navigateTo && navigation.navigate(item.navigateTo)}
              >
                <View style={[styles.insightCircle, theme === 'dark' && styles.darkInsightCircle]}>
                  <Text style={[styles.insightText, theme === 'dark' && styles.darkText]}>{item.emoji}</Text>
                </View>
                <Text style={[styles.insightTitle, theme === 'dark' && styles.darkText]}>{item.title}</Text>
                <Text style={[styles.insightSub, theme === 'dark' && styles.darkText]}>{item.sub}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        )}

        {/* Featured Lessons */}
        {filteredLessons.length > 0 && (
          <View>
            <View style={[styles.sectionHeader, theme === 'dark' && styles.darkSectionHeader]}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}>Featured Lessons</Text>
              <TouchableOpacity onPress={() => console.log('Navigating to Lessons')}>
                <Text style={styles.viewAllText}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lessonRow}
            >
              {filteredLessons.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.lessonBox,
                    index % 2 === 0 ? styles.lessonBoxBlue : styles.lessonBoxYellow,
                  ]}
                  onPress={() => console.log(`Navigating to lesson: ${item.title}`)}
                >
                  <Image source={item.image} style={styles.lessonImage} />
                  <View style={styles.lessonContent}>
                    <Text style={styles.lessonTitle}>{item.title}</Text>
                    <Text style={styles.text}>{item.category}</Text>
                    <View style={styles.lessonFooter}>
                      <Ionicons name="time-outline" size={14} color="#333" />
                      <Text style={styles.lessonTime}>{item.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Daily Challenges */}
        {filteredDailyChallenges.length > 0 && (
          <View>
            <View style={[styles.sectionHeader, theme === 'dark' && styles.darkSectionHeader]}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}>Daily Challenges</Text>
              <TouchableOpacity onPress={() => console.log('Navigating to DailyChallenges')}>
                <Text style={styles.viewAllText}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.challengeRow}
            >
              {filteredDailyChallenges.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.challengeBox}
                  onPress={() => item.navigateTo && navigation.navigate(item.navigateTo)}
                >
                  <View style={styles.challengeContent}>
                    <Text style={styles.challengeTitle}>{item.title}</Text>
                    <Text style={styles.challengePoints}>{item.points}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recommended Courses */}
        {filteredRecommendedCourses.length > 0 && (
          <View>
            <View style={[styles.sectionHeader, theme === 'dark' && styles.darkSectionHeader]}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}>Recommended Courses</Text>
              <TouchableOpacity onPress={() => console.log('Navigating to RecommendedCourses')}>
                <Text style={styles.viewAllText}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.courseRow}
            >
              {filteredRecommendedCourses.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.courseBox}
                  onPress={() => item.navigateTo && navigation.navigate(item.navigateTo)}
                >
                  <Image source={item.image} style={styles.courseImage} />
                  <View style={styles.courseContent}>
                    <Text style={styles.courseTitle}>{item.title}</Text>
                    <Text style={styles.courseLevel}>{item.level}</Text>
                    <View style={styles.courseFooter}>
                      <Ionicons name="time-outline" size={14} color="#333" />
                      <Text style={styles.courseTime}>{item.duration}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Weekly Goal */}
        <TouchableOpacity style={styles.goalBox}>
          <Image source={GoalImage} style={styles.goalImage} />
          <Text style={styles.goalTitle}>Đặt mục tiêu hàng tuần!</Text>
          <Text style={styles.text}>
            Những người đặt mục tiêu hàng tuần sẽ có động lực học tập hơn
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    padding: 15,
    backgroundColor: '#F5F7FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#6A5AE0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    width: '65%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationDot: {
    width: 10,
    height: 10,
    backgroundColor: '#FF4444',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bannerScroll: {
    marginBottom: 20,
  },
  banner: {
    width: width - 40,
    height: 180,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#6A5AE0',
    fontWeight: '600',
  },
  insightsRow: {
    paddingHorizontal: 5,
  },
  insightItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: 90,
  },
  insightCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  insightText: {
    fontSize: 28,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  insightSub: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  lessonRow: {
    paddingHorizontal: 5,
  },
  lessonBox: {
    width: 250,
    padding: 15,
    borderRadius: 20,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonBoxBlue: {
    backgroundColor: '#D0EAFD',
  },
  lessonBoxYellow: {
    backgroundColor: '#FCE8A5',
  },
  lessonImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginLeft: 10,
  },
  lessonContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  lessonTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  lessonText: {
    fontSize: 14,
    color: '#555',
  },
  lessonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  lessonTime: {
    fontSize: 13,
    color: '#333',
    marginLeft: 6,
  },
  challengeRow: {
    paddingHorizontal: 5,
  },
  challengeBox: {
    backgroundColor: '#CFF4E3',
    width: 200,
    padding: 15,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeContent: {
    alignItems: 'center',
  },
  challengeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  challengePoints: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
  },
  courseRow: {
    paddingHorizontal: 5,
  },
  courseBox: {
    backgroundColor: '#D0EAFD',
    width: 250,
    padding: 15,
    borderRadius: 20,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 10,
  },
  courseContent: {
    flex: 1,
    flexDirection: 'column',
  },
  courseTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  courseLevel: {
    fontSize: 14,
    color: '#555',
  },
  courseFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  courseTime: {
    fontSize: 13,
    color: '#333',
    marginLeft: 6,
  },
  goalBox: {
    backgroundColor: '#FFF0D5',
    padding: 20,
    borderRadius: 20,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  goalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  darkSafeArea: {
    backgroundColor: '#1c1c1c',
  },
  darkContainer: {
    backgroundColor: '#1c1c1c',
  },
  darkHeader: {
    backgroundColor: '#1c1c1c',
  },
  darkSearchContainer: {
    backgroundColor: '#2a2a2a',
  },
  darkText: {
    color: '#f4f3f4',
  },

  darkInsightCircle: {
    backgroundColor: '#3a3a3a',
  },

});