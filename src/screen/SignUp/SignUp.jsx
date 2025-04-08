import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordInput from '../../components/PasswordInput'; // Import component mới
import { validateSignUp } from "../../utils/Validation";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Trạng thái chung cho cả hai ô mật khẩu

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Khi nhấn, cả hai ô mật khẩu sẽ cùng hiển thị hoặc ẩn
  };

  const handleSignUp = () => {
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Agree Terms:", agreeTerms);

    if (!agreeTerms) {
        alert("You must agree to the Privacy Policy and Terms of Service.");
        return;
    }

    const error = validateSignUp(username, email, password, confirmPassword);
    if (error) {
        alert(error);
        return;
    }

    alert("🎉 Sign Up Successful! Welcome!");
    navigation.replace('SignIn');
};

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
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
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          {/* Sử dụng component PasswordInput cho cả hai ô mật khẩu */}
          <PasswordInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
          
          <View style={styles.agreeTermsContainer}>
            <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)}>
              <FontAwesome
                name={agreeTerms ? 'check-square-o' : 'square-o'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text style={styles.agreeTermsText}>
              I agree to the <Text style={styles.linkText}>Privacy Policy</Text> and{' '}
              <Text style={styles.linkText}>Terms of Service</Text>.
            </Text>
          </View>

          <TouchableOpacity
              style={[styles.signUpButton, { backgroundColor: agreeTerms ? '#007BFF' : '#ccc' }]}
              onPress={handleSignUp}
              disabled={!agreeTerms}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

          <View style={styles.logInContainer}>
            <Text style={styles.normalText}>
              Already have an account?{' '}
              <Text style={styles.linkText} onPress={() => navigation.replace('SignIn')}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

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
  agreeTermsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  agreeTermsText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#000',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  logInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  normalText: {
    color: '#000',
  },
});

export default SignUp;
