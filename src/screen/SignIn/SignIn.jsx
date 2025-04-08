import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateSignIn } from "../../utils/Validation";
import { checkLogin } from "../../utils/CheckAccount";

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    const error = validateSignIn(password);
    if (error) {
      alert(error);
      return;
    }
  
    const role = checkLogin(username, password);
  
    if (!role) {
      alert("Thông tin đăng nhập sai, vui lòng nhập lại!");
      return;
    }
  
    alert(`Đăng nhập thành công! Vai trò: ${role}`);
    
    // Điều hướng đến LoginNavigator và truyền role
    navigation.replace("LoginNavigator", { role });
  };

  return (
    <ImageBackground source={require('../../assets/background.png')} style={styles.background} imageStyle={{ opacity: 0.7 }}>
      <View style={styles.frame}>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
          <View style={styles.passwordContainer}>
            <TextInput style={styles.passwordInput} placeholder="Password" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
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

// Component Button tái sử dụng
const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.signInButton} onPress={onPress}>
    <Text style={styles.signInButtonText}>{title}</Text>
  </TouchableOpacity>
);

// Component Divider tái sử dụng
const Divider = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.divider} />
    <Text style={styles.dividerText}>or</Text>
    <View style={styles.divider} />
  </View>
);

// Component Social Login tái sử dụng
const SocialLogin = () => (
  <View style={styles.socialSignInContainer}>
    <SocialButton image={require('../../assets/google_logo.png')} text="Sign in with Google" />
    <SocialButton image={require('../../assets/apple_logo.png')} text="Sign in with Apple" />
  </View>
);

// Component Social Button tái sử dụng
const SocialButton = ({ image, text }) => (
  <TouchableOpacity style={styles.socialSignInButton}>
    <Image source={image} style={styles.socialLogo} />
    <Text style={styles.socialSignInText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    backgroundColor: 'rgba(236, 234, 234, 0.8)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 10,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#000',
  },
  forgotPassword: {
    color: '#007BFF',
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  socialSignInContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  socialSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    width: '48%',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  socialLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialSignInText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 11,
  },
  normalText: {
    color: '#000',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default SignIn;
