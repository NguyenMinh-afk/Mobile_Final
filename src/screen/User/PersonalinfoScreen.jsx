import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';

export default function PersonalInfoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thông tin cá nhân</Text>
      <TouchableOpacity style={styles.fileButton}>
        <Text style={styles.fileButtonText}>CHOOSE FILE</Text>
      </TouchableOpacity>
      <Text>No file selected{"\n"}maximum image size is 1 MB</Text>

      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />

      <View style={styles.switchRow}>
        <Text>Facebook Connect</Text>
        <Switch />
      </View>
      <View style={styles.switchRow}>
        <Text>Google Connect</Text>
        <Switch value />
      </View>

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>DELETE MY ACCOUNT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
  fileButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  fileButtonText: { color: '#007BFF', textAlign: 'center' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  deleteButton: { marginTop: 20 },
  deleteText: { color: 'red', textAlign: 'center' },
});
