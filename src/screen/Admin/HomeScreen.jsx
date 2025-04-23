import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
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

      {/* Lưới bảng hiển thị các card */}
      <View style={styles.grid}>
        {/* Dòng 1: Tổng số tài khoản và Tài khoản mới trong tháng */}
        <View style={styles.row}>
          <View style={[styles.card, styles.cardGreen]}>
            <Text style={styles.cardTitle}>Tổng số tài khoản</Text>
            <Text style={styles.cardValue}>{dashboardData.totalUsers}</Text>
          </View>
          <View style={[styles.card, styles.cardBlue]}>
            <Text style={styles.cardTitle}>Tài khoản mới trong tháng</Text>
            <Text style={styles.cardValue}>{dashboardData.newUsersThisMonth}</Text>
          </View>
        </View>

        {/* Dòng 2: Tổng số bài tập và Bài tập đăng trong tháng */}
        <View style={styles.row}>
          <View style={[styles.card, styles.cardOrange]}>
            <Text style={styles.cardTitle}>Tổng số bài tập</Text>
            <Text style={styles.cardValue}>{dashboardData.totalExercises}</Text>
          </View>
          <View style={[styles.card, styles.cardPurple]}>
            <Text style={styles.cardTitle}>Bài tập đăng trong tháng</Text>
            <Text style={styles.cardValue}>{dashboardData.exercisesThisMonth}</Text>
          </View>
        </View>

        {/* Dòng 3: Điểm số trung bình */}
        <View style={styles.row}>
          <View style={[styles.card, styles.cardPink, styles.fullWidthCard]}>
            <Text style={styles.cardTitle}>Điểm số trung bình</Text>
            <Text style={styles.cardValue}>{dashboardData.averageScore}</Text>
          </View>
        </View>
      </View>

      {/* Biểu đồ tần suất làm bài */}
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
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </SafeAreaView>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={dashboardData.topUsersByExercises}
      keyExtractor={(item) => item.username}
      renderItem={({ item }) => (
        <Text style={styles.listItem}>
          {item.username}: {item.exercises} bài
        </Text>
      )}
      ListFooterComponent={
        <>
          {/* Bảng hiển thị danh sách */}
          <View style={styles.table}>
            {/* Tiêu đề bảng */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.tableHeaderCell]}>Username</Text>
              <Text style={[styles.tableCell, styles.tableHeaderCell]}>Exercises</Text>
            </View>

            {/* Dữ liệu bảng: Top User Làm Nhiều Bài Nhất */}
            {dashboardData.topUsersByExercises.map((item, index) => (
              <View
                key={item.username}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                ]}
              >
                <Text style={styles.tableCell}>{item.username}</Text>
                <Text style={styles.tableCell}>{item.exercises}</Text>
              </View>
            ))}

            {/* Tiêu đề bảng: Top User Điểm Cao Nhất (Tổng) */}
            <Text style={styles.sectionTitle}>Top User Điểm Cao Nhất (Tổng)</Text>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.tableHeaderCell]}>Username</Text>
              <Text style={[styles.tableCell, styles.tableHeaderCell]}>Score</Text>
            </View>

            {/* Dữ liệu bảng: Top User Điểm Cao Nhất (Tổng) */}
            {dashboardData.topUsersByScore.map((item, index) => (
              <View
                key={item.username}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                ]}
              >
                <Text style={styles.tableCell}>{item.username}</Text>
                <Text style={styles.tableCell}>{item.score}</Text>
              </View>
            ))}

            {/* Tiêu đề bảng: Top User Điểm Cao Nhất (Tháng) */}
            <Text style={styles.sectionTitle}>Top User Điểm Cao Nhất (Tháng)</Text>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.tableHeaderCell]}>Username</Text>
              <Text style={[styles.tableCell, styles.tableHeaderCell]}>Score</Text>
            </View>

            {/* Dữ liệu bảng: Top User Điểm Cao Nhất (Tháng) */}
            {dashboardData.topUsersByScoreThisMonth.map((item, index) => (
              <View
                key={item.username}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                ]}
              >
                <Text style={styles.tableCell}>{item.username}</Text>
                <Text style={styles.tableCell}>{item.score}</Text>
              </View>
            ))}
          </View>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
    backgroundColor: '#9C27B0',
  },
  cardPink: {
    backgroundColor: '#E91E63',
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  listItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  grid: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  fullWidthCard: {
    flex: 1,
    marginHorizontal: 5,
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRowEven: {
    backgroundColor: '#fff',
  },
  tableRowOdd: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#555',
  },
});
