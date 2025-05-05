import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SystemSettings = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotifications, setIsNotifications] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <View style={styles.settingContent}>
          <Ionicons name="moon-outline" size={22} color="#3B82F6" style={styles.icon} />
          <Text style={styles.settingText}>Chế độ tối</Text>
        </View>
        <Switch
          onValueChange={setIsDarkMode}
          value={isDarkMode}
          trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
          thumbColor={isDarkMode ? '#FFFFFF' : '#F9FAFB'}
        />
      </View>
      <View style={styles.settingItem}>
        <View style={styles.settingContent}>
          <Ionicons name="notifications-outline" size={22} color="#3B82F6" style={styles.icon} />
          <Text style={styles.settingText}>Thông báo</Text>
        </View>
        <Switch
          onValueChange={setIsNotifications}
          value={isNotifications}
          trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
          thumbColor={isNotifications ? '#FFFFFF' : '#F9FAFB'}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Lưu cấu hình</Text>
        <Ionicons name="save-outline" size={22} color="#FFFFFF" style={styles.buttonIconRight} />
      </TouchableOpacity>
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
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIconRight: {
    marginLeft: 10,
  },
});

export default SystemSettings;