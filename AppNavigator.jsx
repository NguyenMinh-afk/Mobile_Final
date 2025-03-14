import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, StyleSheet } from 'react-native';
import Begin from './screen/Begin';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import Forgot from './screen/Forgot';
import Forgot1 from './screen/Forgot1';
import Forgot2 from './screen/Forgot2';
const Stack = createStackNavigator();

// Component tiêu đề tuỳ chỉnh
const HeaderTitle = ({ title }) => <Text style={styles.headerText}>{title}</Text>;

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Begin">
      <Stack.Screen name="Begin" component={Begin} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerTitle: () => <HeaderTitle title="Sign In" /> }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: () => <HeaderTitle title="Sign Up" /> }} />
      <Stack.Screen name="Forgot" component={Forgot} options={{ headerTitle: () => <HeaderTitle title="Forgot Password" /> }} />
      <Stack.Screen name="Forgot1" component={Forgot1} options={{ headerTitle: () => <HeaderTitle title="Forgot Password Step 2" /> }} />
      <Stack.Screen name="Forgot2" component={Forgot2} options={{ headerTitle: () => <HeaderTitle title="Reset Password" /> }} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default AppNavigator;
