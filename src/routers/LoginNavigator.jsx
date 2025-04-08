import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminNavigator from '../components/Admin/AdminNavigator';
import UserNavigator from '../components/Users/UserNavigator';

const Stack = createStackNavigator();

const LoginNavigator = ({ route }) => {
  const role = route?.params?.role || null;

  return (
    <Stack.Navigator>
      {!role ? null : role === 'admin' ? (
        <Stack.Screen name="AdminNavigator" component={AdminNavigator} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="UserNavigator" component={UserNavigator} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default LoginNavigator;
