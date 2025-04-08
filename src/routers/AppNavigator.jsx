import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, StyleSheet } from 'react-native';

// Import các màn hình
import LoadingScreen from '../screen/Loading/LoadingScreen';
import Begin from '../screen/Begin/Begin';
import SignIn from '../screen/SignIn/SignIn';
import SignUp from '../screen/SignUp/SignUp';
import Forgot from '../screen/ForgotPassword/Forgot';
import Forgot1 from '../screen/ForgotPassword/Forgot1';
import Forgot2 from '../screen/ForgotPassword/Forgot2';
import LoginNavigator from './LoginNavigator'; // LoginNavigator kiểm tra vai trò

const Stack = createStackNavigator();

// Component tiêu đề tuỳ chỉnh
const HeaderTitle = ({ title }) => <Text style={styles.headerText}>{title}</Text>;

// Hàm bọc logic cho SignIn
const SignInScreen = (props) => (
  <SignIn
    {...props}
    onLoginSuccess={(role) =>
      props.navigation.replace("LoginNavigator", { role })
    }
  />
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Loading">
      {/* Màn hình Loading */}
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false }}
      />

      {/* Màn hình khởi đầu */}
      <Stack.Screen
        name="Begin"
        component={Begin}
        options={{ headerShown: false }}
      />

      {/* Màn hình Đăng nhập */}
      <Stack.Screen
        name="SignIn"
        component={SignInScreen} // Sử dụng hàm đã tách
        options={{ headerTitle: () => <HeaderTitle title="Sign In" /> }}
      />

      {/* Màn hình Đăng ký */}
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitle: () => <HeaderTitle title="Sign Up" /> }}
      />

      {/* Các bước quên mật khẩu */}
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{ headerTitle: () => <HeaderTitle title="Forgot Password" /> }}
      />
      <Stack.Screen
        name="Forgot1"
        component={Forgot1}
        options={{ headerTitle: () => <HeaderTitle title="Forgot Password Step 2" /> }}
      />
      <Stack.Screen
        name="Forgot2"
        component={Forgot2}
        options={{ headerTitle: () => <HeaderTitle title="Reset Password" /> }}
      />

      {/* Điều hướng Login dựa trên vai trò */}
      <Stack.Screen
        name="LoginNavigator"
        component={LoginNavigator}
        options={{ headerShown: false }}
      />
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
