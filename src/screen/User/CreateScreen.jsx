import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';

const CreateScreen = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [accountType, setAccountType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionContent, setQuestionContent] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Upload Image */}
      <View style={styles.imageUploadContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.uploadImage}
        />
        <TouchableOpacity>
          <Text style={styles.addImageText}>Thêm từ máy</Text>
        </TouchableOpacity>
      </View>

      {/* Basic Info */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>

        <Text style={styles.label}>Tên đề thi *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên đề thi"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Danh mục *</Text>
        <TextInput
          style={styles.input}
          placeholder="Chọn danh mục"
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Mô tả bổ sung"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      {/* Account Type */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Loại tài khoản</Text>
        <TouchableOpacity onPress={() => setAccountType('free')} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, accountType === 'free' && styles.checkboxSelected]} />
          <Text style={styles.checkboxLabel}>Miễn phí</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAccountType('premium')} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, accountType === 'premium' && styles.checkboxSelected]} />
          <Text style={styles.checkboxLabel}>Dành cho tài khoản nâng cấp</Text>
        </TouchableOpacity>
        <Text style={styles.hintText}>(Chọn loại tài khoản để tiếp tục.)</Text>
      </View>

      {/* Difficulty */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Độ khó</Text>
        <TouchableOpacity onPress={() => setDifficulty('easy')} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, difficulty === 'easy' && styles.checkboxSelected]} />
          <Text style={styles.checkboxLabel}>Dễ (Easy)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDifficulty('medium')} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, difficulty === 'medium' && styles.checkboxSelected]} />
          <Text style={styles.checkboxLabel}>Trung bình (Medium)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDifficulty('hard')} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, difficulty === 'hard' && styles.checkboxSelected]} />
          <Text style={styles.checkboxLabel}>Khó (Hard)</Text>
        </TouchableOpacity>
      </View>

      {/* Question Content */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Soạn câu hỏi</Text>
        <TextInput
          style={[styles.input, { height: 120 }]}
          placeholder="Viết nội dung câu hỏi và câu trả lời, câu trả lời đúng sẽ được đánh dấu bằng dấu * vào đây"
          value={questionContent}
          onChangeText={setQuestionContent}
          multiline
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>XÁC NHẬN TẠO ĐỀ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  imageUploadContainer: {
    backgroundColor: '#fff',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  uploadImage: {
    width: 50,
    height: 50,
    tintColor: '#ccc',
  },
  addImageText: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: '#007bff',
    fontWeight: '600',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#aaa',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: '#8e44ad',
    borderColor: '#8e44ad',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  hintText: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  submitButton: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  submitButtonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
});

export default CreateScreen;
