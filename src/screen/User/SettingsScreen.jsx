import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [theme, setTheme] = useState('light');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [motivationalMessages, setMotivationalMessages] = useState(true);
  const [listeningExercises, setListeningExercises] = useState(false);

  // Load previous settings
  useEffect(() => {
    const loadSettings = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');

      const savedSound = await AsyncStorage.getItem('soundEnabled');
      const savedAnimations = await AsyncStorage.getItem('animationsEnabled');
      const savedMessages = await AsyncStorage.getItem('motivationalMessages');
      const savedListening = await AsyncStorage.getItem('listeningExercises');

      if (savedSound !== null) setSoundEnabled(JSON.parse(savedSound));
      if (savedAnimations !== null) setAnimationsEnabled(JSON.parse(savedAnimations));
      if (savedMessages !== null) setMotivationalMessages(JSON.parse(savedMessages));
      if (savedListening !== null) setListeningExercises(JSON.parse(savedListening));
    };

    loadSettings();
  }, []);

  // Update Header Based on Dark Mode
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff' },
      headerTitleStyle: { color: theme === 'dark' ? '#f4f3f4' : '#333' },
    });
  }, [theme]);

  // Toggle Dark Mode
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <View style={[styles.settingsContainer, theme === 'dark' && styles.darkSettings]}>
        {/* Dark Mode Toggle */}
        <TouchableOpacity style={[styles.settingRow, theme === 'dark' && styles.darkSettingRow]}>
          <View style={styles.settingLabel}>
            <Ionicons name={theme === 'dark' ? "moon-outline" : "sunny-outline"} size={24} color={theme === 'dark' ? "#f4f3f4" : "#333"} style={styles.icon} />
            <Text style={[styles.settingText, theme === 'dark' && styles.darkText]}>
              Dark Mode ({theme === 'dark' ? 'Enabled' : 'Disabled'})
            </Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={theme === 'dark' ? '#ffffff' : '#f4f3f4'}
            style={styles.switch}
          />
        </TouchableOpacity>

        {/* Other Settings */}
        {[
          { key: "soundEnabled", label: "Sound effects", value: soundEnabled, setValue: setSoundEnabled },
          { key: "animationsEnabled", label: "Animations", value: animationsEnabled, setValue: setAnimationsEnabled },
          { key: "motivationalMessages", label: "Motivational messages", value: motivationalMessages, setValue: setMotivationalMessages },
          { key: "listeningExercises", label: "Listening exercises", value: listeningExercises, setValue: setListeningExercises }
        ].map(({ key, label, value, setValue }) => (
          <TouchableOpacity key={key} style={[styles.settingRow, theme === 'dark' && styles.darkSettingRow]}>
            <View style={styles.settingLabel}>
              <Ionicons name={key.includes("sound") ? "volume-high-outline" : key.includes("animation") ? "sparkles-outline" : key.includes("message") ? "heart-outline" : "ear-outline"} size={24} color={theme === 'dark' ? "#f4f3f4" : "#333"} style={styles.icon} />
              <Text style={[styles.settingText, theme === 'dark' && styles.darkText]}>{label}</Text>
            </View>
            <Switch
              value={value}
              onValueChange={(newValue) => {
                setValue(newValue);
                AsyncStorage.setItem(key, JSON.stringify(newValue)); // Persist each setting
              }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={value ? '#ffffff' : '#f4f3f4'}
              style={styles.switch}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4ff' },
  darkContainer: { backgroundColor: '#1c1c1c' },
  settingsContainer: { backgroundColor: '#ffffff', borderRadius: 15, padding: 15, elevation: 5 },
  darkSettings: { backgroundColor: '#2a2a2a' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 10, marginBottom: 10, backgroundColor: '#f8faff' },
  darkSettingRow: { backgroundColor: '#3a3a3a' },
  settingLabel: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingText: { fontSize: 16, color: '#333', fontWeight: '500' },
  darkText: { color: '#f4f3f4' },
  switch: { transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] },
});
