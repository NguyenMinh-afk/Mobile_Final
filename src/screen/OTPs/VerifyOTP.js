import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { verifyOTP, signupComplete } from "../../utils/CheckAccount";

const VerifyOTP = ({ route, navigation }) => {
  const { username, email, password } = route.params; // Nhận dữ liệu từ màn hình trước
  const [otp, setOTP] = useState('');

  const handleVerifyOTP = async () => {
    try {
      const response = await verifyOTP(email, otp);
      if (response.success) {
        // Nếu OTP đúng, tạo tài khoản
        await signupComplete(username, email, password);
        alert("Account verified and created successfully!");

        navigation.replace("SignIn");
      } else {
        alert(response.message || "Invalid OTP.");
      }
    } catch (err) {
      alert(err.message || "Error verifying OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOTP}
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
  },
  verifyButtonText: { color: '#fff', fontSize: 18 },
});

export default VerifyOTP;
