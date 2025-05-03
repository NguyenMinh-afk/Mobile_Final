import React from 'react';
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

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FB' }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={Avatar} style={styles.avatar} />
          <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
              <TextInput placeholder="Search" style={styles.searchInput} />
              <TouchableOpacity onPress={() => console.log('Filter pressed')}>
                <Ionicons name="filter-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <View>
              <Ionicons name="notifications-outline" size={24} color="black" />
              {/* Hiển thị chấm đỏ nếu có thông báo */}
              <View style={styles.notificationDot} />
            </View>
          </TouchableOpacity>
        </View>


        {/* Banners */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={true} style={styles.bannerScroll}>
          <Image source={Banner1} style={styles.banner} />
          <Image source={Banner2} style={styles.banner} />
          <Image source={Banner3} style={styles.banner} />
        </ScrollView>

        {/* Your Insights */}
        <View style={styles.miniTitle}>
          <Text style={styles.sectionTitle}>Your Insights</Text>
          <TouchableOpacity onPress={() => console.log('Navigating to Insights')}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.insightsRow}>
          {[
            { emoji: '📘', title: 'Vocabulary', sub: 'Start Learning', navigateTo: 'VocabularyDetail' },
            { emoji: '✏️', title: 'Grammar', sub: 'Practice Grammar', navigateTo: 'GrammarDetail' },
            { emoji: '🎧', title: 'Listening', sub: 'Practice Listening', navigateTo: 'ListeningDetail' },
            { emoji: '🗣️', title: 'Speaking', sub: 'Practice Speaking', navigateTo: 'SpeakingDetail' },
            { emoji: '🖊️', title: 'Writing', sub: 'Practice Writing', navigateTo: 'WritingDetail' },
            { emoji: '🐞', title: 'Reading', sub: 'Practice Reading', navigateTo: 'ReadingDetail' },
            { emoji: '❓', title: 'Quizzes', sub: 'Practice Quizzes', navigateTo: 'QuizzersDetail' },
            { emoji: '🚫', title: 'Coming soon', sub: 'Coming soon', navigateTo: 'ComingSoon' },
          ].map((item, index) => (
            <View key={index} style={styles.insightItem}>
              <TouchableOpacity 
                style={styles.insightCircle} 
                onPress={() => item.navigateTo && navigation.navigate(item.navigateTo)}
              >
                <Text style={styles.insightText}>{item.emoji}</Text>
              </TouchableOpacity>
              <Text style={styles.insightTitle}>{item.title}</Text>
              <Text style={styles.insightSub}>{item.sub}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Featured Lessons */}
        <View style={styles.miniTitle}>
          <Text style={styles.sectionTitle}>Featured Lessons</Text>
          <TouchableOpacity onPress={() => console.log('Navigating to Lessons')}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.lessonRow}>
          {[LessonImage1, LessonImage2].map((image, index) => (
            <View key={index} style={index % 2 === 0 ? styles.lessonBoxBlue : styles.lessonBoxYellow}>
              <Image source={image} style={styles.lessonImage} />
              <View style={styles.lessonContent}>
                <Text style={styles.lessonTitle}>Lesson {index + 1}</Text>
                <Text style={styles.text}>Business English</Text>
                <View style={styles.lessonFooter}>
                  <Ionicons name="time-outline" size={14} color="#000" />
                  <Text style={styles.lessonTime}>2 hours</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Weekly Goal */}
        <View style={styles.goalBox}>
          <Image source={GoalImage} style={styles.goalImage} />
          <Text style={styles.goalTitle}>Set Weekly Goal!</Text>
          <Text style={styles.text}>Who set a weekly goal are more likely to stay motivated</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F5F7FB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  searchInput: { flex: 1, height: 40, backgroundColor: '#EAEAEA', borderRadius: 22, marginHorizontal: 14, paddingHorizontal: 14, paddingLeft: -40 },
  bannerScroll: { marginBottom: 20 },
  banner: { width: width - 50, height: 170, borderRadius: 16, marginRight: 12 },
  miniTitle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  viewAllText: { fontSize: 14, color: '#007AFF', textDecorationLine: 'underline' },
  insightsRow: { flexDirection: 'row', paddingHorizontal: 10, marginTop: 15 },
  insightItem: { alignItems: 'center', marginHorizontal: 12, width: 90 },
  insightCircle: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  insightText: { fontSize: 26 },
  insightTitle: { fontSize: 15, fontWeight: '600', textAlign: 'center' },
  insightSub: { fontSize: 12, color: '#777', textAlign: 'center' },
  lessonRow: { flexDirection: 'row', marginBottom: 25, marginTop: 15, paddingHorizontal: 18 },
  lessonBoxBlue: { backgroundColor: '#D0EAFD', width: 230, padding: 22, borderRadius: 16, marginRight: 12, flexDirection: 'row-reverse', alignItems: 'center' },
  lessonBoxYellow: { backgroundColor: '#FCE8A5', width: 230, padding: 22, borderRadius: 16, marginLeft: 12, flexDirection: 'row-reverse', alignItems: 'center' },
  lessonImage: { width: 90, height: 90, marginLeft: 12, right: 10 },
  lessonContent: { flex: 1, flexDirection: 'column', alignItems: 'flex-start' },
  lessonTitle: { fontWeight: 'bold', fontSize: 17, marginBottom: 4 },
  lessonText: { fontSize: 15, color: '#000' },
  lessonFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  lessonTime: { fontSize: 14, color: '#000', marginLeft: 8 },
  goalBox: { backgroundColor: '#FFF0D5', padding: 18, borderRadius: 16, marginBottom: 45, marginTop: 25, alignItems: 'center' },
  goalImage: { width: 90, height: 90, marginBottom: 10 },
  goalTitle: { fontWeight: 'bold', marginBottom: 6, fontSize: 18 },
  text: { fontSize: 15, color: '#000', textAlign: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAEAEA', borderRadius: 20, paddingHorizontal: 14, width: '75%', alignSelf: 'center' },
  notificationDot: { width: 10, height: 10, backgroundColor: 'red', borderRadius: 5, position: 'absolute', top: 0, right: 0 },
});
