import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
    <View style={[styles.notificationItem, item.new && item.type !== 'system' ? styles.newNotification : item.type === 'system' ? styles.systemNotification : null]}>
      {item.type !== 'system' ? (
        <>
          <Image
            source={{ uri: 'https://placekitten.com/100/100' }}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name} <Text style={styles.message}>đã lưu đề thi của bạn.</Text></Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </>
      ) : (
        <View style={styles.systemTextContainer}>
          <Text style={styles.systemTitle}>Thông báo từ hệ thống</Text>
          <Text style={styles.systemMessage}>{item.content}</Text>
          <Text style={styles.systemTime}>{item.time}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {['Tất cả', 'Hệ thống', 'Đề'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} style={[styles.tabButton, selectedTab === tab && styles.activeTab]}>
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerText}>Xem thông báo trước đó</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 0, backgroundColor: '#fff' },
  tabs: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 10,},
  tabButton: { padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' , marginHorizontal: 5},
  activeTab: { backgroundColor: '#007BFF', borderColor: '#007BFF' },
  tabText: { color: '#000' },
  activeTabText: { color: '#fff' },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  newNotification: { backgroundColor: '#e6f0ff' },
  systemNotification: { backgroundColor: '#ffcccc' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  textContainer: { flex: 1 },
  name: { fontWeight: 'bold' },
  message: { fontWeight: 'normal' },
  time: { fontSize: 12, color: '#888' },
  systemTextContainer: { flex: 1 },
  systemTitle: { fontWeight: 'bold', color: '#b30000' },
  systemMessage: { color: '#b30000' },
  systemTime: { fontSize: 12, color: '#800000' },
  footerButton: { alignItems: 'center', padding: 15, backgroundColor: '#eee', borderRadius: 12, margin: 10,width: '80%', alignSelf: 'center' },
  footerText: { color: '#007BFF' },
});
