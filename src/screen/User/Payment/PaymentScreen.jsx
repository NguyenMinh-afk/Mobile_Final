import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedPlan } = route.params; // Nhận gói đã chọn từ SubscriptionScreen

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thanh toán</Text>
        </View>

        {/* Plan Info */}
        <View style={styles.planInfo}>
          <Text style={styles.planTitle}>{planDetails[selectedPlan].title}</Text>
          <Text style={styles.planPrice}>{planDetails[selectedPlan].price}</Text>
          <Text style={styles.planSub}>Thử miễn phí 1 tuần, hủy bất cứ lúc nào</Text>
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <TouchableOpacity style={styles.paymentMethod}>
          <Ionicons name="card-outline" size={24} color="#6A5AE0" />
          <Text style={styles.paymentText}>Thẻ tín dụng/Thẻ ghi nợ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentMethod}>
          <Ionicons name="logo-paypal" size={24} color="#6A5AE0" />
          <Text style={styles.paymentText}>PayPal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentMethod}>
          <Ionicons name="wallet-outline" size={24} color="#6A5AE0" />
          <Text style={styles.paymentText}>Ví điện tử (Momo, ZaloPay)</Text>
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
});

export default PaymentScreen;