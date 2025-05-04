import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = () => {
  const [theme, setTheme] = useState('light');
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedPlan } = route.params; // Nhận gói đã chọn từ SubscriptionScreen
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');
    };

    loadTheme();

    const themeListener = setInterval(async () => {
      const newTheme = await AsyncStorage.getItem('theme');
      if (newTheme !== theme) {
        setTheme(newTheme);
      }
    }, 500);

    return () => clearInterval(themeListener);
  }, [theme]);
  
  const planDetails = {
    monthly: { title: 'Gói hàng tháng', price: '$12.12/Tháng' },
    annually: { title: 'Gói hàng năm', price: '$124.12/Tháng' },
  };

  const handlePayment = () => {
    // Giả lập thanh toán thành công
    alert('Thanh toán thành công!');
    navigation.navigate('MenuMain'); // Quay lại màn hình chính sau khi thanh toán
  };

  return (
    <SafeAreaView style={[styles.safeArea, theme === 'dark' && styles.darkSafeArea]}>
      <ScrollView contentContainerStyle={[styles.container, theme === 'dark' && styles.darkContainer]}>
        {/* Header */}
        <View style={[styles.header, theme === 'dark' && styles.darkHeader]}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, theme === 'dark' && styles.darkText]}>Thanh toán</Text>
        </View>

        {/* Plan Info */}
        <View style={[styles.planInfo, theme === 'dark' && styles.darkPlanInfo]}>
          <Text style={[styles.planTitle, theme === 'dark' && styles.darkText]}>{planDetails[selectedPlan].title}</Text>
          <Text style={[styles.planPrice, theme === 'dark' && styles.darkText]}>{planDetails[selectedPlan].price}</Text>
          <Text style={[styles.planSub, theme === 'dark' && styles.darkText]}>Thử miễn phí 1 tuần, hủy bất cứ lúc nào</Text>
        </View>


        {/* Payment Methods */}
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}>Phương thức thanh toán</Text>
        <TouchableOpacity style={[styles.paymentMethod, theme === 'dark' && styles.darkPaymentMethod]}>
          <Ionicons name="card-outline" size={24} color={theme === 'dark' ? '#fff' : '#6A5AE0'} />
          <Text style={[styles.paymentText, theme === 'dark' && styles.darkText]}>Thẻ tín dụng/Thẻ ghi nợ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.paymentMethod, theme === 'dark' && styles.darkPaymentMethod]}>
          <Ionicons name="logo-paypal" size={24} color={theme === 'dark' ? '#fff' : '#6A5AE0'} />
          <Text style={[styles.paymentText, theme === 'dark' && styles.darkText]}>PayPal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.paymentMethod, theme === 'dark' && styles.darkPaymentMethod]}>
          <Ionicons name="wallet-outline" size={24} color={theme === 'dark' ? '#fff' : '#6A5AE0'} />
          <Text style={[styles.paymentText, theme === 'dark' && styles.darkText]}>Ví điện tử (Momo, ZaloPay)</Text>
        </TouchableOpacity>


        {/* Confirm Payment Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
          <Text style={styles.confirmButtonText}>XÁC NHẬN THANH TOÁN</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    backgroundColor: '#6A5AE0',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  planInfo: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A5AE0',
    marginTop: 5,
  },
  planSub: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 30,
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    marginTop: 30,
    backgroundColor: '#6A5AE0',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkSafeArea: {
    backgroundColor: '#1c1c1c',
  },
  darkContainer: {
    backgroundColor: '#1c1c1c',
  },
  darkHeader: {
    backgroundColor: '#2a2a2a',
  },
  darkPlanInfo: {
    backgroundColor: '#2a2a2a',
  },
  darkText: {
    color: '#f4f3f4',
  },
  darkPaymentMethod: {
    backgroundColor: '#2a2a2a',
  },

});

export default PaymentScreen;