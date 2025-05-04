import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [theme, setTheme] = useState('auto');
  const [motivationalMessages, setMotivationalMessages] = useState(true);
  const [listeningExercises, setListeningExercises] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLabel}>
            <Ionicons name="volume-high-outline" size={24} color="#333" style={styles.icon} />
            <Text style={styles.settingText}>Sound effects</Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={soundEnabled ? '#ffffff' : '#f4f3f4'}
            style={styles.switch}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLabel}>
            <Ionicons name="sparkles-outline" size={24} color="#333" style={styles.icon} />
            <Text style={styles.settingText}>Animations</Text>
          </View>
          <Switch
            value={animationsEnabled}
            onValueChange={setAnimationsEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={animationsEnabled ? '#ffffff' : '#f4f3f4'}
            style={styles.switch}
          />
        </TouchableOpacity>

        <View style={styles.settingRow}>
          <View style={styles.settingLabel}>
            <Ionicons name="moon-outline" size={24} color="#333" style={styles.icon} />
            <Text style={styles.settingText}>Chế độ tối</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={theme}
              onValueChange={setTheme}
              style={styles.picker}
              dropdownIconColor="#333"
            >
              <Picker.Item label="Tự động" value="auto" />
              <Picker.Item label="Sáng" value="light" />
              <Picker.Item label="Tối" value="dark" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLabel}>
            <Ionicons name="heart-outline" size={24} color="#333" style={styles.icon} />
            <Text style={styles.settingText}>Motivational messages</Text>
          </View>
          <Switch
            value={motivationalMessages}
            onValueChange={setMotivationalMessages}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={motivationalMessages ? '#ffffff' : '#f4f3f4'}
            style={styles.switch}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLabel}>
            <Ionicons name="ear-outline" size={24} color="#333" style={styles.icon} />
            <Text style={styles.settingText}>Listening exercises</Text>
          </View>
          <Switch
            value={listeningExercises}
            onValueChange={setListeningExercises}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={listeningExercises ? '#ffffff' : '#f4f3f4'}
            style={styles.switch}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4ff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 30,
    marginTop: 20,
  },
  settingsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f8faff',
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  pickerContainer: {
    position: 'relative',
    width: 150,
  },
  picker: {
    height: 40,
    width: '100',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    paddingHorizontal: 10,
  },
  pickerItem: {
    fontSize: 16,
    color: '#333',
  },
});