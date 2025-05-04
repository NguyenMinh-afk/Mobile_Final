import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const ReadingDetail = () => {
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
  const [activeTab, setActiveTab] = useState('intro');
  const navigation = useNavigation();

  const lessons = [
    { id: '1', title: 'Reading Lesson 1: Self-Discovery' },
    { id: '2', title: 'Reading Lesson 2: Mindfulness in Words' },
    { id: '3', title: 'Reading Lesson 3: The Power of Gratitude' },
    { id: '4', title: 'Reading Lesson 4: Inner Growth' },
    { id: '5', title: 'Reading Lesson 5: Positive Thinking' },
    { id: '6', title: 'Reading Lesson 6: Embracing Change' },
  ];

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <ImageBackground
        source={require('../../../assets/User/Listening_bg.png')}
        style={styles.headerImage} // No theme-based darkening
      >
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? '#fff' : 'black'} />
          </TouchableOpacity>
        </View>
      </ImageBackground>


      {/* Tab selector */}
      <View style={[styles.tabWrapper, theme === 'dark' && styles.darkTabWrapper]}>
        <View style={[styles.tabContainer, theme === 'dark' && styles.darkTabContainer]}>
          {['intro', 'lesson', 'post'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab, theme === 'dark' && styles.darkTab]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText, theme === 'dark' && styles.darkText]}>
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
            <Text style={[styles.sectionTitle,theme === 'dark' && styles.darkText]}>Mô tả:</Text>
            <Text style={[styles.descriptionText, theme === 'dark' && styles.darkText]}>  
            Bằng cách lắng nghe những câu chuyện ý nghĩa về hành trình chữa lành và phát triển cá nhân, bạn sẽ từng bước cải thiện khả năng nghe tiếng Anh một cách tự nhiên. Mỗi bài học là một cơ hội để bạn thực hành chánh niệm, cảm nhận sâu sắc những thông điệp tích cực và kết nối với nội tâm của mình. Khi lắng nghe, bạn không chỉ học cách hiểu ngôn ngữ mà còn khám phá những giá trị mới, giúp bạn trưởng thành hơn trong cả tâm hồn lẫn kỹ năng nghe.</Text>
          </View>
        )}

        {activeTab === 'lesson' && (
          <FlatList
            data={lessons}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.lessonItem}>
                <Text style={[styles.lessonText,theme === 'dark' && styles.darkText]}>{item.title}</Text>
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
      <View style={[styles.footer, theme === 'dark' && styles.darkFooter]}>
        <TouchableOpacity style={[styles.iconButton, theme === 'dark' && styles.darkIconButton]}>
          <Ionicons name="share-social-outline" size={24} color={theme === 'dark' ? '#fff' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, theme === 'dark' && styles.darkActionButton]}>
          <Text style={[styles.actionText, theme === 'dark' && styles.darkText]}>Học ngay</Text>
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
  darkContainer: {
    backgroundColor: '#1c1c1c',
  },

  darkTabContainer: {
    backgroundColor: '#2a2a2a',
  },
  darkTab: {
    backgroundColor: '#3a3a3a',
  },
  darkText: {
    color: '#f4f3f4',
  },
  darkFooter: {
    backgroundColor: '#2a2a2a',
  },
  darkIconButton: {
    borderColor: '#fff',
  },
  darkActionButton: {
    backgroundColor: '#444',
    borderColor: '#fff',
  },

});

export default ReadingDetail;
