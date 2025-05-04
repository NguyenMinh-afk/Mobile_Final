import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SubscriptionScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const navigation = useNavigation();

  const handleUpdatePlan = () => {
    // Điều hướng đến PaymentScreen và truyền selectedPlan
    navigation.navigate('Payment', { selectedPlan });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Subscription</Text>
        </View>

        {/* Illustration */}
        <View style={styles.imageContainer}>
          <Ionicons name="card-outline" size={100} color="#6A5AE0" />
        </View>

        {/* Title */}
        <Text style={styles.mainTitle}>Vui lòng chọn gói đăng ký để tiếp tục</Text>

        {/* Description */}
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#6A5AE0" />
            <Text style={styles.featureText}>
              Hàng trăm bài học từ cơ bản đến nâng cao.
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#6A5AE0" />
            <Text style={styles.featureText}>
              Học văn hóa, du lịch và kinh doanh qua các khóa học đặc biệt.
            </Text>
          </View>
        </View>

        {/* Plans */}
        <TouchableOpacity
          style={[styles.planContainer, selectedPlan === 'monthly' && styles.selectedPlan]}
          onPress={() => setSelectedPlan('monthly')}
        >
          <View style={styles.planDetails}>
            <Text style={styles.planTitle}>Gói hàng tháng</Text>
            <Text style={styles.planPrice}>$12.12/Tháng</Text>
            <Text style={styles.planSub}>Sau đó $124.12/tháng, hủy bất cứ lúc nào</Text>
          </View>
          <View style={styles.trialBadge}>
            <Text style={styles.trialText}>Thử miễn phí 1 tuần</Text>
          </View>
          {selectedPlan === 'monthly' && (
            <Ionicons name="checkmark" size={24} color="#fff" style={styles.checkmark} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.planContainer, selectedPlan === 'annually' && styles.selectedPlan]}
          onPress={() => setSelectedPlan('annually')}
        >
          <View style={styles.planDetails}>
            <Text style={styles.planTitle}>Gói hàng năm</Text>
            <Text style={styles.planPrice}>$124.12/Tháng</Text>
            <Text style={styles.planSub}>Sau đó $124.12/tháng, hủy bất cứ lúc nào</Text>
          </View>
          <View style={styles.trialBadge}>
            <Text style={styles.trialText}>Thử miễn phí 1 tuần</Text>
          </View>
          {selectedPlan === 'annually' && (
            <Ionicons name="checkmark" size={24} color="#fff" style={styles.checkmark} />
          )}
        </TouchableOpacity>

        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePlan}>
          <View style={styles.buttonContent}>
            <Text style={styles.updateButtonText}>CẬP NHẬT GÓI</Text>
          </View>
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
    alignItems: 'center',
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
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  mainTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#333',
  },
  features: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    marginLeft: 10,
    color: '#555',
    fontSize: 15,
  },
  planContainer: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlan: {
    borderWidth: 2,
    borderColor: '#6A5AE0',
    backgroundColor: '#e0eaff',
  },
  planDetails: {
    flex: 1,
  },
  planTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  planPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  planSub: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  trialBadge: {
    backgroundColor: '#FF7A00',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  trialText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  checkmark: {
    marginLeft: 10,
  },
  updateButton: {
    marginTop: 30,
    width: '85%',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#6A5AE0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContent: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;