import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import PasswordInput from '../../components/PasswordInput';
import { validateSignUp } from "../../utils/Validation";
import { sendOTP, verifyOTP, signupComplete } from "../../utils/CheckAccount";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const checkFields = () => username && email && password && confirmPassword && agreeTerms;

  const handleSendOtp = async () => {
    if (!agreeTerms) {
      Alert.alert("Lỗi", "Bạn phải đồng ý với Điều khoản và Chính sách bảo mật.");
      return;
    }

    const error = validateSignUp(username, email, password, confirmPassword);
    if (error) {
      Alert.alert("Lỗi", error);
      return;
    }

    try {
      const response = await sendOTP(email);
      if (response.success) {
        Alert.alert("Thành công", "OTP đã được gửi tới email của bạn!");
        setIsOtpSent(true);
      } else {
        Alert.alert("Lỗi", response.message || "Không thể gửi OTP.");
      }
    } catch (err) {
      Alert.alert("Lỗi", err.message || "Đã xảy ra lỗi khi gửi OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOTP(email, otp);
      if (response.success) {
        await signupComplete(username, email, password);
        Alert.alert("Thành công", "Tài khoản đã được tạo!");
        navigation.replace("SignIn");
      } else {
        Alert.alert("Lỗi", response.message || "OTP không hợp lệ.");
      }
    } catch (err) {
      Alert.alert("Lỗi", err.message || "Đã xảy ra lỗi khi xác minh OTP.");
    }
  };

  return (
    <ImageBackground source={require('../../assets/background.png')} style={styles.background} imageStyle={{ opacity: 0.7 }}>
      <View style={styles.frame}>
        <View style={styles.container}>
          {!isOtpSent ? (
            <>
              <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
              <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
              <PasswordInput placeholder="Password" value={password} onChangeText={setPassword} />
              <PasswordInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} />
              <CheckBox
                title="I agree to the Privacy Policy and Terms of Service."
                checked={agreeTerms}
                onPress={() => setAgreeTerms(!agreeTerms)}
                containerStyle={styles.checkBoxContainer}
              />
              <TouchableOpacity style={[styles.signUpButton, { backgroundColor: checkFields() ? '#007BFF' : '#ccc' }]} onPress={handleSendOtp} disabled={!checkFields()}>
                <Text style={styles.signUpButtonText}>Send OTP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput style={styles.input} placeholder="Enter OTP" value={otp} onChangeText={setOtp} keyboardType="numeric" />
              <TouchableOpacity style={[styles.signUpButton, { backgroundColor: otp ? '#007BFF' : '#ccc' }]} onPress={handleVerifyOtp} disabled={!otp}>
                <Text style={styles.signUpButtonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  frame: { backgroundColor: 'rgba(236, 234, 234, 0.8)', borderRadius: 20, padding: 20, width: '90%', alignSelf: 'center' },
  container: { width: '100%', alignItems: 'center' },
  input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  checkBoxContainer: { backgroundColor: 'transparent', borderWidth: 0 },
  signUpButton: { width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginBottom: 20 },
  signUpButtonText: { color: '#fff', fontSize: 18 },
});

export default SignUp;
