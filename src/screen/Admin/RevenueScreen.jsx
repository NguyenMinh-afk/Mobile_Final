import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RevenueScreen() {
  // State for time filter
  const [timeFilter, setTimeFilter] = useState('month'); // week, month, year, quarter
  const [selectedYear, setSelectedYear] = useState(2023);
  const [yearSelectorVisible, setYearSelectorVisible] = useState(false);
  
  // Available years for selection
  const availableYears = [2021, 2022, 2023, 2024, 2025];

  // Comprehensive fake data for different time periods
  const revenueData = {
    // Weekly data (last 6 weeks)
    week: {
      totalRevenue: 5000,
      revenueByType: {
        exercises: 2000,
        premium: 2500,
        materials: 500
      },
      chartData: [
        { label: 'W1', amount: 700 },
        { label: 'W2', amount: 850 },
        { label: 'W3', amount: 900 },
        { label: 'W4', amount: 750 },
        { label: 'W5', amount: 800 },
        { label: 'W6', amount: 1000 }
      ],
      userMetrics: {
        paidUsers: 150,
        conversionRate: 12,
        popularPackage: 'Premium Weekly'
      },
      kpis: {
        arpu: 33,
        regionRevenue: {
          Asia: 3000,
          Europe: 1200,
          America: 800
        }
      }
    },
    
    // Monthly data (6 months)
    month: {
      totalRevenue: 20000,
      revenueByType: {
        exercises: 8000,
        premium: 10000,
        materials: 2000
      },
      chartData: [
        { label: 'Jan', amount: 1500 },
        { label: 'Feb', amount: 1800 },
        { label: 'Mar', amount: 2200 },
        { label: 'Apr', amount: 2000 },
        { label: 'May', amount: 2500 },
        { label: 'Jun', amount: 2800 }
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
    },
    
    // Quarterly data (4 quarters)
    quarter: {
      totalRevenue: 60000,
      revenueByType: {
        exercises: 24000,
        premium: 30000,
        materials: 6000
      },
      chartData: [
        { label: 'Q1', amount: 13500 },
        { label: 'Q2', amount: 15000 },
        { label: 'Q3', amount: 16000 },
        { label: 'Q4', amount: 15500 }
      ],
      userMetrics: {
        paidUsers: 750,
        conversionRate: 17,
        popularPackage: 'Premium Quarterly'
      },
      kpis: {
        arpu: 80,
        regionRevenue: {
          Asia: 36000,
          Europe: 15000,
          America: 9000
        }
      }
    },
    
    // Yearly data (last 5 years)
    year: {
      totalRevenue: 240000,
      revenueByType: {
        exercises: 96000,
        premium: 120000,
        materials: 24000
      },
      chartData: [
        { label: '2021', amount: 40000 },
        { label: '2022', amount: 50000 },
        { label: '2023', amount: 60000 },
        { label: '2024', amount: 70000 },
        { label: '2025', amount: 20000 }  // Current year partial data
      ],
      userMetrics: {
        paidUsers: 2000,
        conversionRate: 20,
        popularPackage: 'Premium Annual'
      },
      kpis: {
        arpu: 120,
        regionRevenue: {
          Asia: 144000,
          Europe: 60000,
          America: 36000
        }
      }
    }
  };

  // Function to get data based on selected time filter
  const getFilteredData = () => {
    return revenueData[timeFilter];
  };

  // Get current filtered data
  const currentData = getFilteredData();

  // Prepare data for pie chart based on current filter
  const pieChartData = [
    {
      name: 'Exercises',
      revenue: currentData.revenueByType.exercises,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Premium',
      revenue: currentData.revenueByType.premium,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Materials',
      revenue: currentData.revenueByType.materials,
      color: '#FFCE56',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    }
  ];

  // Function to toggle year selector modal
  const toggleYearSelector = () => {
    setYearSelectorVisible(!yearSelectorVisible);
  };

  // Year Selector Modal
  const YearSelectorModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={yearSelectorVisible}
      onRequestClose={() => setYearSelectorVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Year</Text>
          {availableYears.map((year) => (
            <TouchableOpacity
              key={year}
              style={[
                styles.yearOption,
                selectedYear === year && styles.selectedYearOption
              ]}
              onPress={() => {
                setSelectedYear(year);
                setYearSelectorVisible(false);
              }}
            >
              <Text style={[
                styles.yearOptionText,
                selectedYear === year && styles.selectedYearOptionText
              ]}>
                {year}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setYearSelectorVisible(false)}
          >
            <Text style={styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Time Filter */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'week' && styles.activeFilter]}
            onPress={() => setTimeFilter('week')}
          >
            <Text style={[styles.filterText, timeFilter === 'week' && styles.activeFilterText]}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'month' && styles.activeFilter]}
            onPress={() => setTimeFilter('month')}
          >
            <Text style={[styles.filterText, timeFilter === 'month' && styles.activeFilterText]}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'quarter' && styles.activeFilter]}
            onPress={() => setTimeFilter('quarter')}
          >
            <Text style={[styles.filterText, timeFilter === 'quarter' && styles.activeFilterText]}>Quarter</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, timeFilter === 'year' && styles.activeFilter]}
            onPress={() => setTimeFilter('year')}
          >
            <Text style={[styles.filterText, timeFilter === 'year' && styles.activeFilterText]}>Year</Text>
          </TouchableOpacity>
        </View>

        {/* Year Selector */}
        <TouchableOpacity 
          style={styles.yearSelector}
          onPress={toggleYearSelector}
        >
          <Text style={styles.yearSelectorText}>Year: {selectedYear}</Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="#2196F3" />
        </TouchableOpacity>

        {/* Total Revenue Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Revenue</Text>
          <Text style={styles.totalRevenue}>${currentData.totalRevenue.toLocaleString()}</Text>
          <Text style={styles.periodText}>
            {timeFilter === 'week' ? 'Last 6 Weeks' : 
             timeFilter === 'month' ? 'Last 6 Months' : 
             timeFilter === 'quarter' ? 'Last 4 Quarters' : 'Annual View'} - {selectedYear}
          </Text>
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

        {/* Revenue Trend Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Revenue Trend</Text>
          <LineChart
            data={{
              labels: currentData.chartData.map(item => item.label),
              datasets: [{
                data: currentData.chartData.map(item => item.amount)
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
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#36A2EB"
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
              <Text style={styles.metricValue}>{currentData.userMetrics.paidUsers}</Text>
              <Text style={styles.metricLabel}>Paid Users</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{currentData.userMetrics.conversionRate}%</Text>
              <Text style={styles.metricLabel}>Conversion Rate</Text>
            </View>
          </View>
          <Text style={styles.popularPackage}>
            Most Popular: {currentData.userMetrics.popularPackage}
          </Text>
        </View>

        {/* KPIs */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key Performance Indicators</Text>
          <Text style={styles.kpiText}>ARPU: ${currentData.kpis.arpu}</Text>
          <Text style={styles.kpiTitle}>Revenue by Region:</Text>
          {Object.entries(currentData.kpis.regionRevenue).map(([region, amount]) => (
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
      
      {/* Year Selector Modal */}
      <YearSelectorModal />
      
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
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterText: {
    color: '#333',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  yearSelectorText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
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
  periodText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  yearOption: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    width: '100%',
    alignItems: 'center',
  },
  selectedYearOption: {
    backgroundColor: '#2196F3',
  },
  yearOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedYearOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeModalButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  closeModalButtonText: {
    fontSize: 16,
    color: '#333',
  },
});