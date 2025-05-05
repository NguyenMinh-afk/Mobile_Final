import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActivityLogs = () => {
  const logs = [
    { id: '1', action: 'Người dùng đăng nhập', time: '2025-05-04 09:15 AM' },
    { id: '2', action: 'Bài học được cập nhật', time: '2025-05-04 10:00 AM' },
    { id: '3', action: 'Nội dung đã xuất bản', time: '2025-05-04 11:30 AM' },
  ];

  const renderLogItem = ({ item }) => (
    <View style={styles.logItem}>
      <Ionicons name="time-outline" size={22} color="#3B82F6" style={styles.icon} />
      <View style={styles.logContent}>
        <Text style={styles.logAction}>{item.action}</Text>
        <Text style={styles.logTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={logs}
        renderItem={renderLogItem}
        keyExtractor={item => item.id}
        style={styles.logList}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có nhật ký hoạt động.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1E40AF',
    textAlign: 'center',
    marginBottom: 25,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  logList: {
    width: '100%',
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    marginRight: 12,
  },
  logContent: {
    flex: 1,
  },
  logAction: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  },
  logTime: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ActivityLogs;