import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RevenueScreen() {
  // State for time filter
  const [timeFilter, setTimeFilter] = useState('month'); // week, month, year

  // Fake data
  const revenueData = {
    totalRevenue: 20000,
    revenueByType: {
      exercises: 8000,
      premium: 10000,
      materials: 2000
    },
    monthlyRevenue: [
      { month: 'Jan', amount: 1500 },
      { month: 'Feb', amount: 1800 },
      { month: 'Mar', amount: 2200 },
      { month: 'Apr', amount: 2000 },
      { month: 'May', amount: 2500 },
      { month: 'Jun', amount: 2800 }
    ],
    userMetrics: {
      paidUsers: 500,
      conversionRate: 15,
      popularPackage: 'Premium Monthly'
    },
    kpis: {
      arpu: 40,
      regionRevenue: {
        Asia: 12000,
        Europe: 5000,
        America: 3000
      }
    }
  };

  // Prepare data for pie chart
  const pieChartData = [
    {
      name: 'Exercises',
      revenue: revenueData.revenueByType.exercises,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Premium',
      revenue: revenueData.revenueByType.premium,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Materials',
      revenue: revenueData.revenueByType.materials,
      color: '#FFCE56',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Time Filter */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'week' && styles.activeFilter]}
            onPress={() => setTimeFilter('week')}
          >
            <Text style={styles.filterText}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'month' && styles.activeFilter]}
            onPress={() => setTimeFilter('month')}
          >
            <Text style={styles.filterText}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'year' && styles.activeFilter]}
            onPress={() => setTimeFilter('year')}
          >
            <Text style={styles.filterText}>Year</Text>
          </TouchableOpacity>
        </View>

        {/* Total Revenue Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Revenue</Text>
          <Text style={styles.totalRevenue}>${revenueData.totalRevenue.toLocaleString()}</Text>
        </View>

        {/* Revenue by Type */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Revenue by Type</Text>
          <PieChart
            data={pieChartData}
            width={Dimensions.get('window').width - 40}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="revenue"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>

        {/* Monthly Revenue Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Revenue Trend</Text>
          <LineChart
            data={{
              labels: revenueData.monthlyRevenue.map(item => item.month),
              datasets: [{
                data: revenueData.monthlyRevenue.map(item => item.amount)
              }]
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>

        {/* User Metrics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Metrics</Text>
          <View style={styles.metricsContainer}>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{revenueData.userMetrics.paidUsers}</Text>
              <Text style={styles.metricLabel}>Paid Users</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{revenueData.userMetrics.conversionRate}%</Text>
              <Text style={styles.metricLabel}>Conversion Rate</Text>
            </View>
          </View>
          <Text style={styles.popularPackage}>
            Most Popular: {revenueData.userMetrics.popularPackage}
          </Text>
        </View>

        {/* KPIs */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key Performance Indicators</Text>
          <Text style={styles.kpiText}>ARPU: ${revenueData.kpis.arpu}</Text>
          <Text style={styles.kpiTitle}>Revenue by Region:</Text>
          {Object.entries(revenueData.kpis.regionRevenue).map(([region, amount]) => (
            <Text key={region} style={styles.kpiText}>
              {region}: ${amount.toLocaleString()}
            </Text>
          ))}
        </View>

        {/* Export Button */}
        <TouchableOpacity style={styles.exportButton}>
          <MaterialIcons name="file-download" size={24} color="white" />
          <Text style={styles.exportButtonText}>Export Report</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterText: {
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  totalRevenue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
  },
  popularPackage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  kpiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  kpiText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  exportButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  exportButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
