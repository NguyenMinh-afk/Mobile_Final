
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect , View,Text} from 'react';
import { useNavigation } from '@react-navigation/native';


// Import main screens
import HomeScreen from '../../screen/User/HomeScreen';
import HistoryScreen from '../../screen/User/HistoryScreen';
import CreateScreen from '../../screen/User/CreateScreen';
import SavedScreen from '../../screen/User/SavedScreen';
import MenuScreen from '../../screen/User/MenuScreen';
import Notificationscreen from '../../screen/User/NotificationScreen';

// Import menu sub-screens
import PersonalInfoScreen from '../../screen/User/PersonalinfoScreen';
import LanguageScreen from '../../screen/User/LanguageScreen';
import ChangePasswordScreen from '../../screen/User/ChangePasswordScreen';
import SettingsScreen from '../../screen/User/SettingsScreen';
import SubscriptionScreen from '../../screen/User/SubscriptionScreen'; 
import PaymentScreen from '../../screen/User/Payment/PaymentScreen';
import VocabularyDetail from '../../screen/User/Home_Detail/VocabularyDetail';
import GrammarDetail from '../../screen/User/Home_Detail/GrammarDetail';
import ListeningDetail from '../../screen/User/Home_Detail/ListeningDetail';
import SpeakingDetail from '../../screen/User/Home_Detail/SpeakingDetail';
import WritingDetail from '../../screen/User/Home_Detail/WritingDetail';
import ReadingDetail from '../../screen/User/Home_Detail/ReadingDetail';
import QuizzersDetail from '../../screen/User/Home_Detail/QuizzersDetail';
import ComingSoon from '../../screen/User/Home_Detail/ComingSoon';
import DailyQuizDetail from '../../screen/User/Home_Detail/DailyQuizDetail';
import GrammarChallengeDetail from '../../screen/User/Home_Detail/GrammarChallengeDetail';
import CourseDetail1 from '../../screen/User/Home_Detail/CourseDetail1'; // Thêm màn hình thực
import CourseDetail2 from '../../screen/User/Home_Detail/CourseDetail2'; // Thêm màn hình thực

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// Home Stack Navigator
const HomeStackNavigator = () => {
  const [theme, setTheme] = useState('light'); // Initialize theme

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');
    };
  
    loadTheme();
  }, []);
  

  // Prevent UI flicker while loading theme
  if (theme === null) {
    return null;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff' },
        headerTitleStyle: { color: theme === 'dark' ? '#f4f3f4' : '#333' },
      }}
    >
    <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Notification" component={Notificationscreen} options={{ title: 'Thông báo' }} />
    <Stack.Screen name="VocabularyDetail" component={VocabularyDetail} options={{ title: 'Chi tiết từ vựng', headerShown: false }} />
    <Stack.Screen name="GrammarDetail" component={GrammarDetail} options={{ title: 'Chi tiết ngữ pháp', headerShown: false }} />
    <Stack.Screen name="ListeningDetail" component={ListeningDetail} options={{ title: 'Chi tiết nghe', headerShown: false }} />
    <Stack.Screen name="SpeakingDetail" component={SpeakingDetail} options={{ title: 'Chi tiết nói', headerShown: false }} />
    <Stack.Screen name="WritingDetail" component={WritingDetail} options={{ title: 'Chi tiết viết', headerShown: false }} />
    <Stack.Screen name="ReadingDetail" component={ReadingDetail} options={{ title: 'Chi tiết đọc', headerShown: false }} />
    <Stack.Screen name="QuizzersDetail" component={QuizzersDetail} options={{ title: 'Chi tiết bài kiểm tra', headerShown: false }} />
    <Stack.Screen name="ComingSoon" component={ComingSoon} options={{ title: 'Sắp ra mắt', headerShown: false }} />
    <Stack.Screen name="DailyQuizDetail" component={DailyQuizDetail} options={{ title: 'Thử thách từ vựng hàng ngày', headerShown: false }} />
    <Stack.Screen name="GrammarChallengeDetail" component={GrammarChallengeDetail} options={{ title: 'Thử thách ngữ pháp', headerShown: false }} />
    <Stack.Screen name="CourseDetail1" component={CourseDetail1} options={{ title: 'Khóa học Beginner English', headerShown: false }} />
    <Stack.Screen name="CourseDetail2" component={CourseDetail2} options={{ title: 'Khóa học Advanced Business English', headerShown: false }} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ title: 'Thông tin cá nhân' }} />
  </Stack.Navigator>
  );
}

// History Stack Navigator
const HistoryStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="HistoryMain" component={HistoryScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Create Stack Navigator
const CreateStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="CreateMain" component={CreateScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Saved Stack Navigator
const SavedStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="SavedMain" component={SavedScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Menu Stack Navigator
const MenuStackNavigator = () => {
  const [theme, setTheme] = useState('light');// Initialize as null to wait for AsyncStorage

  // Load theme from AsyncStorage when app starts
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');
    };
  
    loadTheme();
  }, []);

  // Prevent UI flicker while loading theme
  if (theme === null) {
    return null;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff' },
        headerTitleStyle: { color: theme === 'dark' ? '#f4f3f4' : '#333' },
      }}
    >
    <Stack.Screen name="MenuMain" component={MenuScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ title: 'Thông tin cá nhân' }} />
    <Stack.Screen name="Language" component={LanguageScreen} options={{ title: 'Ngôn ngữ' }} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Đổi mật khẩu' }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt' }} />
    <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
  );
}

const UserNavigator = () => {

  const [theme, setTheme] = useState('light');// Initialize as null to wait for AsyncStorage

  // Load theme from AsyncStorage when app starts
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');
    };
  
    loadTheme();
  }, []);

  // Prevent UI flicker while loading theme

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            History: focused ? 'time' : 'time-outline',
            Create: focused ? 'add-circle' : 'add-circle-outline',
            Saved: focused ? 'bookmark' : 'bookmark-outline',
            Menu: focused ? 'menu' : 'menu-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff' },
        tabBarActiveTintColor: theme === 'dark' ? '#81b0ff' : 'blue',
        tabBarInactiveTintColor: theme === 'dark' ? '#767577' : 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="History" component={HistoryStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Create" component={CreateStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Saved" component={SavedStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Menu" component={MenuStackNavigator} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default UserNavigator;