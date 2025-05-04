import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const QuizzersDetail = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const navigation = useNavigation();

  const lessons = [
    { id: '1', title: 'Quizzers Lesson 1: Self-Discovery' },
    { id: '2', title: 'Quizzers Lesson 2: Mindfulness in Words' },
    { id: '3', title: 'Quizzers Lesson 3: The Power of Gratitude' },
    { id: '4', title: 'Quizzers Lesson 4: Inner Growth' },
    { id: '5', title: 'Quizzers Lesson 5: Positive Thinking' },
    { id: '6', title: 'Quizzers Lesson 6: Embracing Change' },
  ];

  return (
    <View style={styles.container}>
      {/* Background Header */}
      <ImageBackground
        source={require('../../../assets/User/Quizzers_bg.png')}
        style={styles.headerImage}
      >
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Tab selector */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          {['intro', 'lesson', 'post'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab === 'intro' ? 'Giới thiệu' : tab === 'lesson' ? 'Bài học' : 'Bài đăng'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === 'intro' && (
          <View>
            <Text style={styles.sectionTitle}>Mô tả:</Text>
            <Text style={styles.descriptionText}>
            Mỗi bài kiểm tra nhỏ (Quizzers) là một bước tiến trong hành trình chữa lành và phát triển bản thân. Thông qua việc trả lời các câu hỏi tiếng Anh về sự phát triển cá nhân, bạn sẽ thực hành tư duy tích cực, nuôi dưỡng lòng biết ơn và khám phá những khía cạnh mới của chính mình. Các bài kiểm tra được thiết kế để vừa giúp bạn ôn luyện kiến thức, vừa khơi dậy sự kết nối với nội tâm, biến việc học thành một trải nghiệm đầy ý nghĩa và thú vị.
            </Text>
          </View>
        )}

        {activeTab === 'lesson' && (
          <FlatList
            data={lessons}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.lessonItem}>
                <Text style={styles.lessonText}>{item.title}</Text>
              </View>
            )}
            ListFooterComponent={
              <TouchableOpacity style={styles.viewAll}>
                <Text style={styles.viewAllText}>Xem tất cả</Text>
              </TouchableOpacity>
            }
          />
        )}

        {activeTab === 'post' && (
          <View style={styles.emptyPost}>
            <Ionicons name="document-text-outline" size={24} color="#333" />
          </View>
        )}
      </View>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="share-social-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Học ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  tabWrapper: {
    alignItems: 'center',
    marginTop: -20,
    zIndex: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFEBC9',
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 20,
    width: '90%',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#555',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  lessonItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lessonText: {
    fontSize: 15,
    color: '#333',
  },
  viewAll: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  viewAllText: {
    color: '#007bff',
    fontWeight: '500',
  },
  emptyPost: {
    alignItems: 'center',
    marginTop: 40,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F7FB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    flex: 1,
    marginLeft: 15,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default QuizzersDetail;
