import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import quizData from '../../../utils/quizData.json'; // Load quiz JSON

export default function DailyQuizDetail() {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null); // Track correctness after submission
  const [isSubmitted, setIsSubmitted] = useState(false); // Prevent further selection

  const handleSelectOption = (questionId, option) => {
    if (!isSubmitted) {
      setAnswers(prev => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => {
    let score = 0;
    let newFeedback = {};

    quizData.forEach(item => {
      newFeedback[item.id] = answers[item.id] === item.correctAnswer;
      if (newFeedback[item.id]) {
        score++;
      }
    });

    setFeedback(newFeedback); // Update feedback after submission
    setIsSubmitted(true); // Prevent further interaction

    Alert.alert(
      'Kết quả',
      `Bạn đã trả lời đúng ${score}/${quizData.length} câu!`,
      [{ text: 'OK', onPress: () => {} }] // No immediate navigation
    );
  };

  const renderQuestion = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.question}</Text>
      {item.options.map((option, index) => {
        const isSelected = answers[item.id] === option;
        const isCorrect = feedback && feedback[item.id] && option === item.correctAnswer;
        const isIncorrect = feedback && !feedback[item.id] && isSelected;

        return (
          <TouchableOpacity
            key={index}
            disabled={isSubmitted} // Disable after submission
            style={[
              styles.optionButton,
              isSelected && styles.selectedOption, // Default selection color
              feedback && (isCorrect ? styles.correctAnswer : isIncorrect ? styles.wrongAnswer : null),
            ]}
            onPress={() => handleSelectOption(item.id, option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Daily Vocabulary Quiz</Text>
        <View style={styles.placeholder} />
      </View>
      <FlatList
        data={quizData}
        renderItem={renderQuestion}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={isSubmitted ? () => navigation.goBack() : handleSubmit}
      >
        <Text style={styles.submitText}>
          {isSubmitted ? 'Trở về trang chủ' : 'Nộp bài'}
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

// Using original styles
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
  correctAnswer: {
    backgroundColor: 'green',
    borderColor: 'darkgreen',
  },
  wrongAnswer: {
    backgroundColor: 'red',
    borderColor: 'darkred',
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