import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const notifications = [
  { id: '1', name: 'Nguyễn Văn A', time: '2 phút', type: 'exam', new: true },
  { id: '2', name: 'Nguyễn Văn B', time: '10 phút', type: 'exam', new: true },
  { id: '3', name: 'Nguyễn Văn D', time: '1 giờ', type: 'exam' },
  { id: '4', name: 'Nguyễn Văn A', time: '4 giờ', type: 'exam' },
  { id: '5', name: 'Nguyễn Văn A', time: '6 giờ', type: 'exam', new: true },
  { id: '6', name: 'System', time: '10:00 am', type: 'system', content: 'Hệ thống bảo trì…' },
];

export default function NotificationScreen() {
  const [selectedTab, setSelectedTab] = useState('Tất cả');

  const filteredNotifications = notifications.filter(n => {
    if (selectedTab === 'Hệ thống') return n.type === 'system';
    if (selectedTab === 'Đề') return n.type === 'exam';
    return true;
  });

  const renderItem = ({ item }) => (
    <View style={[
      styles.notificationItem,
      item.new && item.type !== 'system' ? styles.newNotification : null,
      item.type === 'system' ? styles.systemNotification : null,
    ]}>
      {item.type !== 'system' ? (
        <>
          <Image
            source={{ uri: 'https://placekitten.com/100/100' }}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>
              {item.name} <Text style={styles.message}>đã lưu đề thi của bạn.</Text>
            </Text>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={14} color="#888" style={styles.timeIcon} />
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
          {item.new && <View style={styles.newDot} />}
        </>
      ) : (
        <View style={styles.systemTextContainer}>
          <View style={styles.systemHeader}>
            <Ionicons name="alert-circle-outline" size={20} color="#b30000" style={styles.systemIcon} />
            <Text style={styles.systemTitle}>Thông báo từ hệ thống</Text>
          </View>
          <Text style={styles.systemMessage}>{item.content}</Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={14} color="#800000" style={styles.timeIcon} />
            <Text style={styles.systemTime}>{item.time}</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {['Tất cả', 'Hệ thống', 'Đề'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerText}>Xem thông báo trước đó</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  newNotification: {
    backgroundColor: '#e6f0ff',
    borderLeftWidth: 4,
    borderLeftColor: '#007BFF',
  },
  systemNotification: {
    backgroundColor: '#fff5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#ff3333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontWeight: 'normal',
    color: '#555',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeIcon: {
    marginRight: 4,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  newDot: {
    width: 10,
    height: 10,
    backgroundColor: '#ff3333',
    borderRadius: 5,
    marginLeft: 10,
  },
  systemTextContainer: {
    flex: 1,
  },
  systemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  systemIcon: {
    marginRight: 8,
  },
  systemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b30000',
  },
  systemMessage: {
    fontSize: 14,
    color: '#b30000',
    marginBottom: 4,
  },
  systemTime: {
    fontSize: 12,
    color: '#800000',
  },
  footerButton: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#007BFF',
    borderRadius: 12,
    margin: 20,
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});