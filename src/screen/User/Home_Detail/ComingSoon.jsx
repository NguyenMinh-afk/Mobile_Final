import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';


const ComingSoonDetail = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState('light'); // Default theme

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');
    };

    loadTheme();

    // Listen for theme updates when navigating back
    const unsubscribe = navigation.addListener('focus', loadTheme);
    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff' },
      headerTitleStyle: { color: theme === 'dark' ? '#f4f3f4' : '#333' },
    });
  }, [theme]);

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? '#f4f3f4' : 'black'} />
        </TouchableOpacity>
      </View>

      {/* Central Image */}
      <View style={styles.imageWrapper}>
        <Image source={require('../../../assets/User/woah.gif')} style={styles.image} />
      </View>

      {/* Title & Description */}
      <Text style={[styles.title, theme === 'dark' && styles.darkText]}>Coming Soon!</Text>
      <Text style={[styles.description, theme === 'dark' && styles.darkText]}>
        We're working on something amazing. Stay tuned for exciting new lessons and content!
      </Text>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="share-social-outline" size={24} color={theme === 'dark' ? '#f4f3f4' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, theme === 'dark' && styles.darkActionButton]}>
          <Text style={[styles.actionText, theme === 'dark' && styles.darkText]}>Notify Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F7FB', padding: 20 },
  darkContainer: { backgroundColor: '#1c1c1c' },
  header: { position: 'absolute', top: 50, left: 20 },
  imageWrapper: { marginBottom: 20},
  image: { width: 250, height: 250, resizeMode: 'contain', borderWidth: 2, borderColor: '#007bff', borderRadius: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  description: { fontSize: 16, color: '#555', textAlign: 'center', paddingHorizontal: 20 },
  darkText: { color: '#f4f3f4' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  iconButton: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: 'black', alignItems: 'center', justifyContent: 'center' },
  actionButton: { flex: 1, marginLeft: 15, backgroundColor: '#007bff', paddingVertical: 14, borderRadius: 20, alignItems: 'center' },
  darkActionButton: { backgroundColor: '#555' },
  actionText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
});

export default ComingSoonDetail;