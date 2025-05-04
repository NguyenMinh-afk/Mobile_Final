import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>

      <View style={styles.settingRow}>
        <Text>Sound effects</Text>
        <Switch value />
      </View>

      <View style={styles.settingRow}>
        <Text>Animations</Text>
        <Switch value />
      </View>

      <View style={styles.settingRow}>
        <Text>Dark mode</Text>
        <Picker style={{ height: 40, flex: 1 }} selectedValue="Auto">
          <Picker.Item label="Auto" value="auto" />
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>
      </View>

      <View style={styles.settingRow}>
        <Text>Motivational messages</Text>
        <Switch value />
      </View>

      <View style={styles.settingRow}>
        <Text>Listening exercises</Text>
        <Switch />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
});
