import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const dashboardData = {
    totalUsers: 1500,
    newUsersThisMonth: 120,
    totalExercises: 500,
    exercisesThisMonth: 45,
    averageScore: 78.5,
    topUsersByExercises: [
      { username: 'user1', exercises: 50 },
      { username: 'user2', exercises: 45 },
      { username: 'user3', exercises: 40 },
    ],
    topUsersByScore: [
      { username: 'user1', score: 95 },
      { username: 'user2', score: 92 },
      { username: 'user3', score: 90 },
    ],
    topUsersByScoreThisMonth: [
      { username: 'user4', score: 93 },
      { username: 'user5', score: 91 },
      { username: 'user6', score: 89 },
    ],
    monthlyExerciseFrequency: [30, 45, 60, 50, 70, 90, 100, 80, 60, 50, 40, 30],
  };

  const renderHeader = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MQT</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Account')}
        >
          <MaterialCommunityIcons name="account-circle" size={28} color="#4A6572" />
        </TouchableOpacity>
      </View>

      {/* Dashboard Cards */}
      <View style={styles.grid}>
        {/* Row 1: Total accounts and New accounts */}
        <View style={styles.row}>
          <View style={[styles.card, styles.cardGreen]}>
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="account-group" size={28} color="#ffffff" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardValue}>{dashboardData.totalUsers}</Text>
              <Text style={styles.cardTitle}>Tổng số tài khoản</Text>
            </View>
          </View>
          <View style={[styles.card, styles.cardBlue]}>
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="account-plus" size={28} color="#ffffff" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardValue}>{dashboardData.newUsersThisMonth}</Text>
              <Text style={styles.cardTitle}>Tài khoản mới tháng này</Text>
            </View>
          </View>
        </View>

        {/* Row 2: Total exercises and Monthly exercises */}
        <View style={styles.row}>
          <View style={[styles.card, styles.cardOrange]}>
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="book-open-variant" size={28} color="#ffffff" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardValue}>{dashboardData.totalExercises}</Text>
              <Text style={styles.cardTitle}>Tổng số bài tập</Text>
            </View>
          </View>
          <View style={[styles.card, styles.cardPurple]}>
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="calendar-month" size={28} color="#ffffff" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardValue}>{dashboardData.exercisesThisMonth}</Text>
              <Text style={styles.cardTitle}>Bài tập trong tháng</Text>
            </View>
          </View>
        </View>

        {/* Row 3: Average score */}
        <View style={styles.row}>
          <View style={[styles.card, styles.cardPink, styles.fullWidthCard]}>
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="chart-line" size={28} color="#ffffff" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardValue}>{dashboardData.averageScore}</Text>
              <Text style={styles.cardTitle}>Điểm số trung bình</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Chart Section */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Tần Suất Làm Bài Trong Năm</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                data: dashboardData.monthlyExerciseFrequency,
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisSuffix=" bài"
          chartConfig={{
            backgroundColor: '#344955',
            backgroundGradientFrom: '#344955',
            backgroundGradientTo: '#4A6572',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#F9AA33',
              fill: '#ffffff',
            },
            propsForBackgroundLines: {
              strokeDasharray: '', // solid lines
              stroke: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            elevation: 4,
          }}
          bezier // Makes the line chart curve smoothly
          withInnerLines={false} // Removes inner grid lines
        />
      </View>
    </SafeAreaView>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="auto" />
      <FlatList
        ListHeaderComponent={renderHeader}
        data={[]}
        ListFooterComponent={
          <>
            {/* Top Users Tables */}
            <View style={styles.tablesContainer}>
              {/* Top Users by Exercises */}
              <View style={styles.tableSection}>
                <Text style={styles.sectionTitle}>
                  <MaterialCommunityIcons name="medal" size={22} color="#344955" />
                  {' '}
                  Top User Hoàn Thành Nhiều Bài Nhất
                </Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, styles.tableHeaderCell]}>Tên người dùng</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderCell]}>Số bài tập</Text>
                  </View>

                  {dashboardData.topUsersByExercises.map((item, index) => (
                    <View
                      key={item.username}
                      style={[
                        styles.tableRow,
                        index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                      ]}
                    >
                      <Text style={styles.tableCell}>{item.username}</Text>
                      <Text style={[styles.tableCell, styles.valueCell]}>{item.exercises}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Top Users by Score (Total) */}
              <View style={styles.tableSection}>
                <Text style={styles.sectionTitle}>
                  <MaterialCommunityIcons name="star" size={22} color="#344955" />
                  {' '}
                  Top User Điểm Cao Nhất (Tổng)
                </Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, styles.tableHeaderCell]}>Tên người dùng</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderCell]}>Điểm số</Text>
                  </View>

                  {dashboardData.topUsersByScore.map((item, index) => (
                    <View
                      key={item.username}
                      style={[
                        styles.tableRow,
                        index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                      ]}
                    >
                      <Text style={styles.tableCell}>{item.username}</Text>
                      <Text style={[styles.tableCell, styles.valueCell]}>{item.score}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Top Users by Score (Month) */}
              <View style={[styles.tableSection, { marginBottom: 30 }]}>
                <Text style={styles.sectionTitle}>
                  <MaterialCommunityIcons name="calendar-star" size={22} color="#344955" />
                  {' '}
                  Top User Điểm Cao Nhất (Tháng)
                </Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, styles.tableHeaderCell]}>Tên người dùng</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderCell]}>Điểm số</Text>
                  </View>

                  {dashboardData.topUsersByScoreThisMonth.map((item, index) => (
                    <View
                      key={item.username}
                      style={[
                        styles.tableRow,
                        index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                      ]}
                    >
                      <Text style={styles.tableCell}>{item.username}</Text>
                      <Text style={[styles.tableCell, styles.valueCell]}>{item.score}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#344955',
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f1f3f5',
  },
  grid: {
    flexDirection: 'column',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardGreen: {
    backgroundColor: '#4CAF50',
  },
  cardBlue: {
    backgroundColor: '#2196F3',
  },
  cardOrange: {
    backgroundColor: '#FF9800',
  },
  cardPurple: {
    backgroundColor: '#673AB7',
  },
  cardPink: {
    backgroundColor: '#E91E63',
  },
  cardIconContainer: {
    marginRight: 12,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  fullWidthCard: {
    flex: 1,
    marginHorizontal: 6,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  tablesContainer: {
    paddingHorizontal: 20,
  },
  tableSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#344955',
  },
  table: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  tableHeader: {
    backgroundColor: '#f1f3f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRowEven: {
    backgroundColor: '#fff',
  },
  tableRowOdd: {
    backgroundColor: '#f9f9ff',
  },
  tableCell: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#344955',
  },
  valueCell: {
    textAlign: 'right',
    fontWeight: '500',
    color: '#4A6572',
  },
});