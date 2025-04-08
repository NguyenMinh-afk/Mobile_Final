import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Forgot2 = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordUpdate = () => {
    if (password === confirmPassword) {
      alert('Password updated successfully');
      // Pop 3 màn hình: Forgot2, Forgot1, Forgot → quay về SignIn ban đầu
      navigation.pop(1);
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/background.png')} 
      style={styles.background} 
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <Text style={styles.promptText}>Update your account password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#aaa"
        />
        <CustomButton title="Confirm" onPress={handlePasswordUpdate} />
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
    marginBottom: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Forgot2;
