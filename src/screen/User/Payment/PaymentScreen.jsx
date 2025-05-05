import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = () => {
  const [theme, setTheme] = useState('light');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Trạng thái phương thức thanh toán được chọn
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
    walletPhone: '',
  }); // Thông tin thanh toán

  const navigation = useNavigation();
  const route = useRoute();
  const { selectedPlan } = route.params; // Nhận gói đã chọn từ SubscriptionScreen

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');
    };

    loadTheme();

    const unsubscribe = navigation.addListener('focus', loadTheme);
    return () => unsubscribe();
  }, [navigation]);

  const planDetails = {
    monthly: { title: 'Gói hàng tháng', price: '$12.12/Tháng' },
    annually: { title: 'Gói hàng năm', price: '$124.12/Tháng' },
  };

  // Xử lý chọn phương thức thanh toán
  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  // Xử lý khi nhấn "XÁC NHẬN THANH TOÁN"
  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod) {
      Alert.alert('Lỗi', 'Vui lòng chọn một phương thức thanh toán.');
      return;
    }
    setModalVisible(true); // Hiển thị modal để nhập thông tin
  };

  // Xử lý xác nhận thông tin thanh toán trong modal
  const handleSubmitPayment = () => {
    // Giả lập kiểm tra thông tin thanh toán
    if (selectedPaymentMethod === 'card' && (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv)) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin thẻ.');
      return;
    }
    if (selectedPaymentMethod === 'paypal' && !paymentInfo.paypalEmail) {
      Alert.alert('Lỗi', 'Vui lòng nhập email PayPal.');
      return;
    }
    if (selectedPaymentMethod === 'wallet' && !paymentInfo.walletPhone) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại ví điện tử.');
      return;
    }

    // Giả lập thanh toán thành công
    Alert.alert('Thành công', 'Thanh toán thành công!');
    setModalVisible(false);
    navigation.navigate('MenuMain');
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
        <TouchableOpacity
          style={[
            styles.paymentMethod,
            theme === 'dark' && styles.darkPaymentMethod,
            selectedPaymentMethod === 'card' && styles.selectedPaymentMethod,
          ]}
          onPress={() => handleSelectPaymentMethod('card')}
        >
          <Ionicons name="card-outline" size={24} color={theme === 'dark' ? '#fff' : '#6A5AE0'} />
          <Text style={[styles.paymentText, theme === 'dark' && styles.darkText]}>Thẻ tín dụng/Thẻ ghi nợ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentMethod,
            theme === 'dark' && styles.darkPaymentMethod,
            selectedPaymentMethod === 'paypal' && styles.selectedPaymentMethod,
          ]}
          onPress={() => handleSelectPaymentMethod('paypal')}
        >
          <Ionicons name="logo-paypal" size={24} color={theme === 'dark' ? '#fff' : '#6A5AE0'} />
          <Text style={[styles.paymentText, theme === 'dark' && styles.darkText]}>PayPal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentMethod,
            theme === 'dark' && styles.darkPaymentMethod,
            selectedPaymentMethod === 'wallet' && styles.selectedPaymentMethod,
          ]}
          onPress={() => handleSelectPaymentMethod('wallet')}
        >
          <Ionicons name="wallet-outline" size={24} color={theme === 'dark' ? '#fff' : '#6A5AE0'} />
          <Text style={[styles.paymentText, theme === 'dark' && styles.darkText]}>Ví điện tử (Momo, ZaloPay)</Text>
        </TouchableOpacity>

        {/* Confirm Payment Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
          <Text style={styles.confirmButtonText}>XÁC NHẬN THANH TOÁN</Text>
        </TouchableOpacity>

        {/* Modal để nhập thông tin thanh toán */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, theme === 'dark' && styles.darkModalContent]}>
              <Text style={[styles.modalTitle, theme === 'dark' && styles.darkText]}>Nhập thông tin thanh toán</Text>

              {/* Form nhập thông tin dựa trên phương thức thanh toán */}
              {selectedPaymentMethod === 'card' && (
                <>
                  <TextInput
                    style={[styles.input, theme === 'dark' && styles.darkInput]}
                    placeholder="Số thẻ (16 chữ số)"
                    placeholderTextColor={theme === 'dark' ? '#888' : '#999'}
                    value={paymentInfo.cardNumber}
                    onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cardNumber: text })}
                    keyboardType="numeric"
                    maxLength={16}
                  />
                  <TextInput
                    style={[styles.input, theme === 'dark' && styles.darkInput]}
                    placeholder="Ngày hết hạn (MM/YY)"
                    placeholderTextColor={theme === 'dark' ? '#888' : '#999'}
                    value={paymentInfo.expiryDate}
                    onChangeText={(text) => setPaymentInfo({ ...paymentInfo, expiryDate: text })}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  <TextInput
                    style={[styles.input, theme === 'dark' && styles.darkInput]}
                    placeholder="CVV (3 chữ số)"
                    placeholderTextColor={theme === 'dark' ? '#888' : '#999'}
                    value={paymentInfo.cvv}
                    onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cvv: text })}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </>
              )}

              {selectedPaymentMethod === 'paypal' && (
                <TextInput
                  style={[styles.input, theme === 'dark' && styles.darkInput]}
                  placeholder="Email PayPal"
                  placeholderTextColor={theme === 'dark' ? '#888' : '#999'}
                  value={paymentInfo.paypalEmail}
                  onChangeText={(text) => setPaymentInfo({ ...paymentInfo, paypalEmail: text })}
                  keyboardType="email-address"
                />
              )}

              {selectedPaymentMethod === 'wallet' && (
                <TextInput
                  style={[styles.input, theme === 'dark' && styles.darkInput]}
                  placeholder="Số điện thoại ví điện tử"
                  placeholderTextColor={theme === 'dark' ? '#888' : '#999'}
                  value={paymentInfo.walletPhone}
                  onChangeText={(text) => setPaymentInfo({ ...paymentInfo, walletPhone: text })}
                  keyboardType="phone-pad"
                />
              )}

              {/* Nút xác nhận trong modal */}
              <TouchableOpacity style={styles.modalConfirmButton} onPress={handleSubmitPayment}>
                <Text style={styles.modalConfirmButtonText}>Xác nhận</Text>
              </TouchableOpacity>

              {/* Nút hủy trong modal */}
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  selectedPaymentMethod: {
    backgroundColor: '#e0d7ff',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  modalConfirmButton: {
    backgroundColor: '#6A5AE0',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  modalConfirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  modalCancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  darkModalContent: {
    backgroundColor: '#2a2a2a',
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#f4f3f4',
  },
});

export default PaymentScreen;