import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Avatar from '../../assets/User/user_img.png';
import Banner1 from '../../assets/User/home_banner0.png';
import Banner2 from '../../assets/User/home_banner2.png';
import Banner3 from '../../assets/User/home_banner3.png';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={Avatar} style={styles.avatar} />
          <TextInput placeholder="Search" style={styles.searchInput} />
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}> {/* 👈 Navigate on press */}
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

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

        <View style={styles.miniTitle}>
          <Text style={styles.sectionTitle}>Your Insights</Text>
          <Text>View all</Text>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.insightsRow}>
          <View style={styles.insightsRow}>
            <View style={styles.insightItem}>
              <TouchableOpacity style={styles.insightCircle}>
                <Text style={styles.insightText}>📘</Text>
              </TouchableOpacity>
              <Text style={styles.insightTitle}>Vocabulary</Text>
              <Text style={styles.insightSub}>Start Learning</Text>
            </View>

            <View style={styles.insightItem}>
              <TouchableOpacity style={styles.insightCircle}>
                <Text style={styles.insightText}>✏️</Text>
              </TouchableOpacity>
              <Text style={styles.insightTitle}>Grammar</Text>
              <Text style={styles.insightSub}>Practice Grammar</Text>
            </View>

            <View style={styles.insightItem}>
              <TouchableOpacity style={styles.insightCircle}>
                <Text style={styles.insightText}>🎧</Text>
              </TouchableOpacity>
              <Text style={styles.insightTitle}>Listening</Text>
              <Text style={styles.insightSub}>Practice Listening</Text>
            </View>

            <View style={styles.insightItem}>
              <TouchableOpacity style={styles.insightCircle}>
                <Text style={styles.insightText}>🗣️</Text>
              </TouchableOpacity>
              <Text style={styles.insightTitle}>Speaking</Text>
              <Text style={styles.insightSub}>Practice Speaking</Text>
            </View>

            <View style={styles.insightItem}>
              <TouchableOpacity style={styles.insightCircle}>
                <Text style={styles.insightText}>🖊️</Text>
              </TouchableOpacity>
              <Text style={styles.insightTitle}>Writing</Text>
              <Text style={styles.insightSub}>Practice Writing</Text>
            </View>

            <View style={styles.insightItem}>
              <TouchableOpacity style={styles.insightCircle}>
                <Text style={styles.insightText}>🐞</Text>
              </TouchableOpacity>
              <Text style={styles.insightTitle}>Reading</Text>
              <Text style={styles.insightSub}>Practice Reading</Text>
            </View>

            <View style={styles.insightItem}>
              <TouchableOpacity style={styles.insightCircle}>
                <Text style={styles.insightText}>❓</Text>
              </TouchableOpacity>
              <Text style={styles.insightTitle}>Quizzes</Text>
              <Text style={styles.insightSub}>Practice Quizzes</Text>
            </View>

            <View style={styles.insightItem}>
              <TouchableOpacity style={styles.insightCircle}>
                <Text style={styles.insightText}>🚫</Text>
              </TouchableOpacity>
              <Text style={styles.insightTitle}>Coming soon</Text>
              <Text style={styles.insightSub}>Coming soon</Text>
            </View>
          </View>
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Featured Lessons</Text>
          <Text>View all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.lessonRow}>
          <View style={styles.lessonBoxBlue}>
            <Text style={styles.lessonTitle}>Grammar Quiz</Text>
            <Text>Business English</Text>
            <Text>2 hours</Text>
          </View>
          <View style={styles.lessonBoxYellow}>
            <Text style={styles.lessonTitle}>Online Phrase</Text>
            <Text>Business English</Text>
            <Text>2 hours</Text>
          </View>
          </ScrollView>
        

        <View style={styles.goalBox}>
          <Text style={styles.goalTitle}>Set Weekly Goal!</Text>
          <Text>Who set a weekly goal are more likely to stay motivated</Text>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  banner: {
    width: width - 32,
    height: 150,
    borderRadius: 12,
    marginRight: 10,
  },
  insightBox: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  insightSub: {
    fontSize: 12,
    color: '#666',
  },
  lessonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  lessonBoxBlue: {
    backgroundColor: '#e0f7fa',
    width: 200,
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginRight: 8,
  },
  lessonBoxYellow: {
    backgroundColor: '#fff3e0',
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginLeft: 8,
  },
  lessonTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  goalBox: {
    backgroundColor: '#fff3e0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
  goalTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  insightsRow: {
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  insightItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: 80,
  },
  insightCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  insightText: {
    fontSize: 22,
  },
  insightTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  insightSub: {
    fontSize: 10,
    color: '#777',
    textAlign: 'center',
  },
  bannerScroll: {
    marginBottom: 20,
    borderRadius: 12,
  },
  miniTitle:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
