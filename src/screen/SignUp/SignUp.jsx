import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PasswordInput from '../../components/PasswordInput';
import { validateSignUp } from "../../utils/Validation";
import { sendOTP } from "../../utils/CheckAccount";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const checkFields = () => username && email && password && confirmPassword && agreeTerms;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    if (!agreeTerms) {
      Alert.alert("Error", "You must agree to the Privacy Policy and Terms of Service.");
      return;
    }

    const error = validateSignUp(username, email, password, confirmPassword);
    if (error) {
      Alert.alert("Error", error);
      return;
    }

    try {
      // Gửi OTP tới email của người dùng
      const response = await sendOTP(email);

      if (response.success) {
        Alert.alert("Success", "OTP has been sent to your email!");
        console.log("Navigating to VerifyOTP with:", { username, email, password }); // Thêm log
        navigation.navigate('VerifyOTP', {
          username: username,
          email: email,
          password: password,
        });
      } else {
        Alert.alert("Error", response.message || "Could not send OTP.");
      }
    } catch (err) {
      console.error("Error in handleSignUp:", err); // Log lỗi
      Alert.alert("Error", err.message || "An error occurred while sending OTP.");
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
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
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
            style={[styles.signUpButton, { backgroundColor: checkFields() ? '#007BFF' : '#ccc' }]}
            onPress={handleSignUp}
            disabled={!checkFields()}
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