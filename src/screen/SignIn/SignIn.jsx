import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground,
  Image, Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../contexts/AuthContext';
import { validateSignIn } from '../../utils/Validation';
import { checkLogin } from '../../utils/CheckAccount';

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const error = validateSignIn(password);
    if (error) {
      Alert.alert('Lỗi', error);
      return;
    }

    try {
      const response = await checkLogin(username, password);
      if (response.success) {
        const userData = { username, role: response.role };

        if (rememberMe) {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        }

        setIsLoggedIn(true);
        setUser(userData);

        Alert.alert('Thành công', `Đăng nhập thành công! Vai trò: ${response.role}`);
        navigation.replace('LoginNavigator', { role: response.role });
      } else {
        Alert.alert('Lỗi', response.message || 'Thông tin đăng nhập không chính xác.');
      }
    } catch (err) {
      Alert.alert('Lỗi', err.message || 'Đã xảy ra lỗi khi đăng nhập.');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}
      imageStyle={{ opacity: 0.7 }}
    >
      <View style={styles.frame}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.rememberForgotContainer}>
            <View style={styles.rememberMeContainer}>
              <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
                <FontAwesome name={rememberMe ? 'check-square-o' : 'square-o'} size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.rememberMeText}>Remember for 30 days</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <Text style={styles.forgotPassword}>Forgot password</Text>
            </TouchableOpacity>
          </View>
          <CustomButton title="Sign In" onPress={handleSignIn} />
          <Divider />
          <SocialLogin />
          <View style={styles.signUpContainer}>
            <Text style={styles.normalText}>
              Don't have an account?{' '}
              <Text style={styles.linkText} onPress={() => navigation.replace('SignUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
