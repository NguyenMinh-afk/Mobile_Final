import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const challengeData = [
  {
    id: '1',
    question: 'Choose the correct form: "She ___ to school every day."',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 'goes',
  },
  {
    id: '2',
    question: 'What is the past tense of "write"?',
    options: ['Wrote', 'Writed', 'Writing', 'Writen'],
    correctAnswer: 'Wrote',
  },
  {
    id: '3',
    question: 'Which sentence is correct?',
    options: [
      'I am go to the park.',
      'I am going to the park.',
      'I am goes to the park.',
      'I am gone to the park.',
    ],
    correctAnswer: 'I am going to the park.',
  },
];

export default function GrammarChallengeDetail() {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({}); // Lưu trữ đáp án người dùng chọn

  const handleSelectOption = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    let score = 0;
    challengeData.forEach(item => {
      if (answers[item.id] === item.correctAnswer) {
        score++;
      }
    });
    Alert.alert(
      'Kết quả',
      `Bạn đã trả lời đúng ${score}/${challengeData.length} câu!`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const renderQuestion = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.question}</Text>
      {item.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            answers[item.id] === option && styles.selectedOption,
          ]}
          onPress={() => handleSelectOption(item.id, option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Grammar Challenge</Text>
        <View style={styles.placeholder} />
      </View>
      <FlatList
        data={challengeData}
        renderItem={renderQuestion}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Nộp bài</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  list: {
    padding: 20,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
  },
  selectedOption: {
    backgroundColor: '#e6f0ff',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 12,
    margin: 20,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});