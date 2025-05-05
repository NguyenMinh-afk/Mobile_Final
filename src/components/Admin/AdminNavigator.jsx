import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../../screen/Admin/HomeScreen';
import AccountsManagementScreen from '../../screen/Admin/AccountsManagementScreen';
import LessonsManagementScreen from '../../screen/Admin/LessonsManagementScreen';
import RevenueScreen from '../../screen/Admin/RevenueScreen';
import AccountScreen from '../../screen/Admin/AccountScreen';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
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
