import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import các màn hình
import HomeScreen from '../../screen/User/HomeScreen';
import HistoryScreen from '../../screen/User/HistoryScreen';
import CreateScreen from '../../screen/User/CreateScreen';
import SavedScreen from '../../screen/User/SavedScreen';
import MenuScreen from '../../screen/User/MenuScreen';

const Tab = createBottomTabNavigator();

const UserNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        // Set icons based on screen names
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
    {/* Home screen */}
    <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>

    {/* History screen */}
    <Tab.Screen name="History" component={HistoryScreen} />

    {/* Create screen */}
    <Tab.Screen name="Create" component={CreateScreen} />

    {/* Saved screen */}
    <Tab.Screen name="Saved" component={SavedScreen} />

    {/* Menu screen */}
    <Tab.Screen name="Menu" component={MenuScreen} />
  </Tab.Navigator>
);

export default UserNavigator;
