import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Image } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Chờ 3 giây rồi chuyển sang màn hình Begin
    const timer = setTimeout(() => {
      navigation.replace('Begin');
    }, 3000);

    return () => clearTimeout(timer); // Xóa timer khi component bị unmount
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/loading.png')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.overlay}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" style={styles.indicator} />
          <Text style={styles.text}>Loading App...</Text>
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
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    opacity: 0.7,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  indicator: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default LoadingScreen;