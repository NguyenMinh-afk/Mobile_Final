import React, { useEffect, useContext, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

const LoadingScreen = ({ navigation }) => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(true); // State để kiểm soát hiển thị
  const minLoadingTime = 3000; // Thời gian hiển thị tối thiểu (3 giây)

  useEffect(() => {
    let timer;

    // Đảm bảo hiển thị ít nhất 3 giây
    timer = setTimeout(() => {
      console.log('⏳ Hết thời gian 3 giây, kiểm tra trạng thái');
      setIsVisible(false); // Ẩn loading sau 3 giây
    }, minLoadingTime);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Chỉ điều hướng khi isVisible là false và isLoading là false
    if (!isVisible && !isLoading) {
      if (isLoggedIn) {
        const role = user?.role || 'user';
        console.log('⏳ Chuyển hướng đến LoginNavigator với role:', role);
        navigation.replace('LoginNavigator', { role });
      } else {
        console.log('⏳ Chuyển hướng đến Begin');
        navigation.replace('Begin');
      }
    }
  }, [isVisible, isLoading, isLoggedIn, user, navigation]);

  // Chỉ render LoadingScreen khi isVisible là true
  if (!isVisible) {
    return null; // Không render gì khi đã sẵn sàng chuyển hướng
  }

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