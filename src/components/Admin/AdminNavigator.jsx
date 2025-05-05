import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../../screen/Admin/HomeScreen';
import AccountsManagementScreen from '../../screen/Admin/AccountsManagementScreen';
import LessonsManagementScreen from '../../screen/Admin/LessonsManagementScreen';
import RevenueScreen from '../../screen/Admin/RevenueScreen';
import AccountScreen from '../../screen/Admin/AccountScreen';
import ManageContent from '../../screen/Admin/AccDetail/ManageContent';
import SystemSettings from '../../screen/Admin/AccDetail/SystemSettings';
import ActivityLogs from '../../screen/Admin/AccDetail/ActivityLogs';
import LessonManagement from '../../screen/Admin/AccDetail/LessonManagement';
import DocumentManagement from '../../screen/Admin/AccDetail/DocumentManagement';
import ContentManagement from '../../screen/Admin/AccDetail/ContentManagement';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Account tab
const AccountStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AccountHome"
      component={AccountScreen}
      options={{ title: 'Tài khoản Admin', headerShown: false }}
    />
    <Stack.Screen
      name="ManageContent"
      component={ManageContent}
      options={{ title: 'Quản lý nội dung học' }}
    />
    <Stack.Screen
      name="SystemSettings"
      component={SystemSettings}
      options={{ title: 'Cài đặt hệ thống' }}
    />
    <Stack.Screen
      name="ActivityLogs"
      component={ActivityLogs}
      options={{ title: 'Xem nhật ký hoạt động' }}
    />
    <Stack.Screen
      name="LessonManagement"
      component={LessonManagement}
      options={{ title: 'Quản lý bài học' }}
    />
    <Stack.Screen
      name="DocumentManagement"
      component={DocumentManagement}
      options={{ title: 'Quản lý tài liệu' }}
    />
    <Stack.Screen
      name="ContentManagement"
      component={ContentManagement}
      options={{ title: 'Quản lý nội dung khác' }}
    />
  </Stack.Navigator>
);

const AdminNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') {
          iconName = focused ? 'grid' : 'grid-outline';
        } else if (route.name === 'Accounts Management') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'Lessons Management') {
          iconName = focused ? 'book' : 'book-outline';
        } else if (route.name === 'Revenue') {
          iconName = focused ? 'bar-chart' : 'bar-chart-outline';
        } else if (route.name === 'Account') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Dashboard" component={HomeScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Accounts Management" component={AccountsManagementScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Lessons Management" component={LessonsManagementScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Revenue" component={RevenueScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }}/>
  </Tab.Navigator>
);

export default AdminNavigator;