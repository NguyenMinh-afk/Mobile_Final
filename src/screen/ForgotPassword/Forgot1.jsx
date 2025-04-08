import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Forgot1 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleConfirmOtp = () => {
    if (otp.trim() === '') {
      alert('Please enter the OTP code.');
      return;
    }
    alert(`OTP code confirmed: ${otp}`);
    navigation.replace('Forgot2'); // Chuyển đến Forgot2.tsx sau khi xác nhận OTP
  };

  const handlePasswordReset = () => {
    alert(`Password reset request sent for account: ${email}`);
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <Text style={styles.promptText}>
          OTP code has been sent to the Email associated with this account:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="OTP Code"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
          placeholderTextColor="#aaa"
        />
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={handlePasswordReset}>
            <Text style={styles.resendText}>Resend code</Text>
          </TouchableOpacity>
          <CustomButton title="Confirm" onPress={handleConfirmOtp} />
        </View>
      </View>
    </ImageBackground>
  );
};

// Component nút bấm tái sử dụng
const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.continueButton} onPress={onPress}>
    <Text style={styles.continueButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    opacity: 0.9,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '85%',
  },
  promptText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  continueButton: {
    width: '40%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: -25,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    color: '#007BFF',
    fontSize: 14,
    marginBottom: 30, // Adjust this value to move the text up
  },
});

export default Forgot1;