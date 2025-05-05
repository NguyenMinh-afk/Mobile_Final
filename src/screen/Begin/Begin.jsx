import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Begin = () => {
  const navigation = useNavigation(); // Hook điều hướng

  return (
    <ImageBackground source={require('../../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <AuthButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} style={styles.signUpButton} textStyle={styles.signUpText} />
        <AuthButton title="Sign In" onPress={() => navigation.navigate('SignIn')} style={styles.signInButton} textStyle={styles.signInText} />
      </View>
    </ImageBackground>
  );
};


// Component nút tái sử dụng
const AuthButton = ({ title, onPress, style, textStyle }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Text style={textStyle}>{title}</Text>
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
  container: {
    alignItems: 'center',
    marginTop: 160,
  },
  signUpButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 75,
    borderRadius: 30,
    marginBottom: 10,
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 75,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  signInText: {
    color: '#007BFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Begin;
