import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import các màn hình
import HomeScreen from '../../screen/User/HomeScreen';
import AccountScreen from '../../screen/User/AccountScreen';
import HistoryScreen from '../../screen/User/HistoryScreen';
import CreateScreen from '../../screen/User/CreateScreen';
import NotificationScreen from '../../screen/User/NotificationScreen';

const Tab = createBottomTabNavigator();

const UserNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        // Cài đặt biểu tượng dựa trên tên màn hình
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'History') {
          iconName = focused ? 'time' : 'time-outline';
        } else if (route.name === 'Create') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'Notifications') {
          iconName = focused ? 'notifications' : 'notifications-outline';
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
    {/* Màn hình Home */}
    <Tab.Screen name="Home" component={HomeScreen} />

    {/* Màn hình History */}
    <Tab.Screen name="History" component={HistoryScreen} />

    {/* Màn hình Create */}
    <Tab.Screen name="Create" component={CreateScreen} />

    {/* Màn hình Notifications */}
    <Tab.Screen name="Notifications" component={NotificationScreen} />

    {/* Màn hình Account */}
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

export default UserNavigator;
