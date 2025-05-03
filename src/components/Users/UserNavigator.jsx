import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

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
import VocabularyDetail from '../../screen/User/Home_Detail/VocabularyDetail';
import GrammarDetail from '../../screen/User/Home_Detail/GrammarDetail';
import ListeningDetail from '../../screen/User/Home_Detail/ListeningDetail';
import SpeakingDetail from '../../screen/User/Home_Detail/SpeakingDetail';
import WritingDetail from '../../screen/User/Home_Detail/WritingDetail';
import ReadingDetail from '../../screen/User/Home_Detail/ReadingDetail';
import QuizzersDetail from '../../screen/User/Home_Detail/QuizzersDetail';
import ComingSoon from '../../screen/User/Home_Detail/ComingSoon';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Notification" component={Notificationscreen} options={{ title: 'Thông báo' }} />
    <Stack.Screen name="VocabularyDetail" component={VocabularyDetail} options={{ title: 'Chi tiết từ vựng', headerShown: false }} />
    <Stack.Screen name="GrammarDetail" component={GrammarDetail} options={{ title: 'Chi tiết từ vựng', headerShown: false }} />
    <Stack.Screen name="ListeningDetail" component={ListeningDetail} options={{ title: 'Chi tiết từ vựng', headerShown: false }} />
    <Stack.Screen name="SpeakingDetail" component={SpeakingDetail} options={{ title: 'Chi tiết từ vựng', headerShown: false }} />
    <Stack.Screen name="WritingDetail" component={WritingDetail} options={{ title: 'Chi tiết từ vựng', headerShown: false }} />
    <Stack.Screen name="ReadingDetail" component={ReadingDetail} options={{ title: 'Chi tiết từ vựng', headerShown: false }} />
    <Stack.Screen name="QuizzersDetail" component={QuizzersDetail} options={{ title: 'Chi tiết từ vựng', headerShown: false }} />
    <Stack.Screen name="ComingSoon" component={ComingSoon} options={{ title: 'Chi tiết từ vựng', headerShown: false }} />
  </Stack.Navigator>
);

// 👇 Menu Stack Navigator
const MenuStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="MenuMain" component={MenuScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ title: 'Thông tin cá nhân' }} />
    <Stack.Screen name="Language" component={LanguageScreen} options={{ title: 'Ngôn ngữ' }} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Đổi mật khẩu' }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt' }} />
    <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const UserNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'History') {
          iconName = focused ? 'time' : 'time-outline';
        } else if (route.name === 'Create') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'Saved') {
          iconName = focused ? 'bookmark' : 'bookmark-outline';
        } else if (route.name === 'Menu') {
          iconName = focused ? 'menu' : 'menu-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
    <Tab.Screen name="History" component={HistoryScreen} />
    <Tab.Screen name="Create" component={CreateScreen} />
    <Tab.Screen name="Saved" component={SavedScreen} />
    <Tab.Screen name="Menu" component={MenuStackNavigator} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default UserNavigator;
