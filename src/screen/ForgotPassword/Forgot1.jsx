import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { verifyOTP, sendOTP } from '../../utils/CheckAccount';

const Forgot1 = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirmOtp = async () => {
    if (!otp) {
      alert('Vui lòng nhập mã OTP!');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOTP(email, otp);
      if (result.success) {
        alert(result.message);
        navigation.navigate('Forgot2', { email });
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const result = await sendOTP(email);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
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
          <TouchableOpacity onPress={handleResendOtp} disabled={loading}>
            <Text style={styles.resendText}>Gửi lại mã</Text>
          </TouchableOpacity>
          <CustomButton 
            title={loading ? "Đang xử lý..." : "Confirm"} 
            onPress={handleConfirmOtp}
            disabled={loading}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

// Component nút bấm tái sử dụng
const CustomButton = ({ title, onPress, disabled }) => (
  <TouchableOpacity style={styles.continueButton} onPress={onPress} disabled={disabled}>
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