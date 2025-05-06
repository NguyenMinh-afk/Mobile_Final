// Forgot.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { sendOTP } from '../../utils/CheckAccount';

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      alert('Vui lòng nhập email!');
      return;
    }

    setLoading(true);
    try {
      const result = await sendOTP(email);
      if (result.success) {
        alert(result.message);
        navigation.navigate('Forgot1', { email });
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
        <Text style={styles.promptText}>Enter the Email associated with your account:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
        />
        <CustomButton 
          title={loading ? "Đang gửi..." : "Continue"} 
          onPress={handlePasswordReset}
          disabled={loading}
        />
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
    backgroundColor: 'rgba(236, 234, 234, 0.8)',
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
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  continueButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Forgot;
