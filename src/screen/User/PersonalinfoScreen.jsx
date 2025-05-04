import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function PersonalInfoScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [facebookConnect, setFacebookConnect] = useState(false);
  const [googleConnect, setGoogleConnect] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [theme, setTheme] = useState('light');
  // Tải dữ liệu từ AsyncStorage khi màn hình được mở
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');
    };
  
    loadTheme();
  }, []);
  
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff' },
      headerTitleStyle: { color: theme === 'dark' ? '#f4f3f4' : '#333' },
    });
  }, [theme]);
  

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedUsername = await AsyncStorage.getItem('userUsername');
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedFacebookConnect = await AsyncStorage.getItem('facebookConnect');
        const storedGoogleConnect = await AsyncStorage.getItem('googleConnect');

        if (storedName) setName(storedName);
        if (storedUsername) setUsername(storedUsername);
        if (storedEmail) setEmail(storedEmail);
        if (storedFacebookConnect) setFacebookConnect(storedFacebookConnect === 'true');
        if (storedGoogleConnect) setGoogleConnect(storedGoogleConnect === 'true');
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    };

    loadUserData();
  }, []);

  // Lưu dữ liệu vào AsyncStorage
  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userUsername', username);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('facebookConnect', facebookConnect.toString());
      await AsyncStorage.setItem('googleConnect', googleConnect.toString());

      Alert.alert('Thành công', 'Thông tin đã được lưu thành công!');
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi lưu thông tin.');
    }
  };

  // Xử lý chọn tệp (giả lập, vì React Native không có API chọn tệp trực tiếp)
  const handleChooseFile = () => {
    // Giả lập chọn tệp, bạn có thể tích hợp thư viện như react-native-document-picker để chọn tệp thực tế
    setSelectedFile('avatar.jpg');
  };

  return (
    <SafeAreaView style={[styles.safeArea, theme === 'dark' && styles.darkSafeArea]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.formContainer, theme === 'dark' && styles.darkFormContainer]}>
          <TouchableOpacity style={[styles.fileButton, theme === 'dark' && styles.darkFileButton]}>
            <Ionicons name="image-outline" size={20} color={theme === 'dark' ? '#f4f3f4' : '#007AFF'} style={styles.fileIcon} />
            <Text style={[styles.fileButtonText, theme === 'dark' && styles.darkText]}>CHỌN TỆP</Text>
          </TouchableOpacity>

          <Text style={[styles.fileHint, theme === 'dark' && styles.darkText]}>
            {selectedFile ? `Đã chọn: ${selectedFile}` : 'Chưa chọn tệp'} {"\n"}
            Kích thước tối đa hình ảnh: 1 MB
          </Text>


          <View style={[styles.inputContainer, theme === 'dark' && styles.darkInputContainer]}>
            <Ionicons name="person-outline" size={20} color={theme === 'dark' ? '#f4f3f4' : '#888'} style={styles.inputIcon} />
            <TextInput
              placeholder="Họ và tên"
              style={[styles.input, theme === 'dark' && styles.darkText]}
              placeholderTextColor={theme === 'dark' ? '#bbb' : '#888'}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={[styles.inputContainer, theme === 'dark' && styles.darkInputContainer]}>
            <Ionicons name="at-outline" size={20} color={theme === 'dark' ? '#f4f3f4' : '#888'} style={styles.inputIcon} />
            <TextInput
              placeholder="Tên người dùng"
              style={[styles.input, theme === 'dark' && styles.darkText]}
              placeholderTextColor={theme === 'dark' ? '#bbb' : '#888'}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={[styles.inputContainer, theme === 'dark' && styles.darkInputContainer]}>
            <Ionicons name="mail-outline" size={20} color={theme === 'dark' ? '#f4f3f4' : '#888'} style={styles.inputIcon} />
            <TextInput
              placeholder="Email"
              style={[styles.input, theme === 'dark' && styles.darkText]}
              placeholderTextColor={theme === 'dark' ? '#bbb' : '#888'}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={[styles.switchRow, theme === 'dark' && styles.darkSwitchRow]}>
            <Text style={[styles.switchLabel, theme === 'dark' && styles.darkText]}>Kết nối Facebook</Text>
            <Switch
              trackColor={{ false: theme === 'dark' ? '#555' : '#ddd', true: '#007AFF' }}
              thumbColor={theme === 'dark' ? '#f4f3f4' : '#fff'}
              value={facebookConnect}
              onValueChange={setFacebookConnect}
            />
          </View>

          <View style={[styles.switchRow, theme === 'dark' && styles.darkSwitchRow]}>
            <Text style={[styles.switchLabel, theme === 'dark' && styles.darkText]}>Kết nối Google</Text>
            <Switch
              trackColor={{ false: theme === 'dark' ? '#555' : '#ddd', true: '#007AFF' }}
              thumbColor={theme === 'dark' ? '#f4f3f4' : '#fff'}
              value={googleConnect}
              onValueChange={setGoogleConnect}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveUserData}>
            <Ionicons name="save-outline" size={18} color="#fff" style={styles.saveIcon} />
            <Text style={styles.saveText}>LƯU THAY ĐỔI</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={18} color="#fff" style={styles.deleteIcon} />
            <Text style={styles.deleteText}>XÓA TÀI KHOẢN CỦA TÔI</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fileIcon: {
    marginRight: 8,
  },
  fileButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fileHint: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  saveIcon: {
    marginRight: 8,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#80bcdc',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteIcon: {
    marginRight: 8,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  darkSafeArea: {
    backgroundColor: '#1c1c1c',
  },
  darkFormContainer: {
    backgroundColor: '#2a2a2a',
  },
  darkFileButton: {
    backgroundColor: '#3a3a3a',
  },
  darkText: {
    color: '#f4f3f4',
  },
  darkInputContainer: {
    backgroundColor: '#2a2a2a',
    borderColor: '#555',
  },
  darkSwitchRow: {
    backgroundColor: '#2a2a2a',
  },
});