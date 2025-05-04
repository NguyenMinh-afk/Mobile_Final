import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or react-native-vector-icons
import { useNavigation } from '@react-navigation/native';

const SubscriptionScreen = () => {
    const [selectedPlan, setSelectedPlan] = useState('monthly');
    const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
      </View>

      {/* Illustration */}
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={styles.image}
      />

      {/* Title */}
      <Text style={styles.mainTitle}>To continue, please select a subscription</Text>

      {/* Description */}
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#6A5AE0" />
          <Text style={styles.featureText}>
            There are hundreds of lessons from beginner to advanced.
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#6A5AE0" />
          <Text style={styles.featureText}>
            The study of culture, travel, and business through special courses
          </Text>
        </View>
      </View>

      {/* Plans */}
      <TouchableOpacity
        style={[styles.planContainer, selectedPlan === 'monthly' && styles.selectedPlan]}
        onPress={() => setSelectedPlan('monthly')}
      >
        <View>
          <Text style={styles.planTitle}>Monthly</Text>
          <Text style={styles.planPrice}>$12.12/ Month</Text>
          <Text style={styles.planSub}>then $124.12 per month cancel anytime</Text>
        </View>
        <View style={styles.trialBadge}>
          <Text style={styles.trialText}>1 week free trial</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.planContainer, selectedPlan === 'annually' && styles.selectedPlan]}
        onPress={() => setSelectedPlan('annually')}
      >
        <View>
          <Text style={styles.planTitle}>Annually</Text>
          <Text style={styles.planPrice}>$124.12/ Month</Text>
          <Text style={styles.planSub}>then $124.12 per month cancel anytime</Text>
        </View>
        <View style={styles.trialBadge}>
          <Text style={styles.trialText}>1 week free trial</Text>
        </View>
      </TouchableOpacity>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Plan</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#6A5AE0',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    marginTop: 20,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  mainTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 30,
    color: '#000',
  },
  features: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 8,
    color: '#555',
    fontSize: 14,
  },
  planContainer: {
    marginTop: 20,
    width: '85%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedPlan: {
    backgroundColor: '#60A991',
  },
  planTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#000',
  },
  planSub: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  trialBadge: {
    backgroundColor: '#FF7A00',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  trialText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  updateButton: {
    marginTop: 30,
    width: '85%',
    backgroundColor: '#6A5AE0',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;
