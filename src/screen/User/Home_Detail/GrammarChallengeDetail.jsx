import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import challengeData from '../../../utils/grammarChallenge.json'; // Load JSON

export default function GrammarChallengeDetail() {
  const navigation = useNavigation();
  const [theme, setTheme] = useState('light'); // Track theme mode

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light');
    };

    loadTheme();
    const unsubscribe = navigation.addListener('focus', loadTheme);
    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff' },
      headerTitleStyle: { color: theme === 'dark' ? '#f4f3f4' : '#333' },
    });
  }, [theme]);

  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (questionId, option) => {
    if (!isSubmitted) {
      setAnswers(prev => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => {
    let score = 0;
    let newFeedback = {};

    challengeData.forEach(item => {
      newFeedback[item.id] = answers[item.id] === item.correctAnswer;
      if (newFeedback[item.id]) {
        score++;
      }
    });

    setFeedback(newFeedback);
    setIsSubmitted(true);

    Alert.alert('Kết quả', `Bạn đã trả lời đúng ${score}/${challengeData.length} câu!`, [{ text: 'OK' }]);
  };

  const renderQuestion = ({ item }) => (
    <View style={[styles.questionContainer, theme === 'dark' && styles.darkQuestionContainer]}>
      <Text style={[styles.questionText, theme === 'dark' && styles.darkText]}>{item.question}</Text>
      {item.options.map((option, index) => {
        const isSelected = answers[item.id] === option;
        const isCorrect = feedback && feedback[item.id] && option === item.correctAnswer;
        const isIncorrect = feedback && !feedback[item.id] && isSelected;

        return (
          <TouchableOpacity
            key={index}
            disabled={isSubmitted}
            style={[
              styles.optionButton,
              theme === 'dark' && styles.darkOptionButton,
              isSelected && (theme === 'dark' ? styles.darkSelectedOption : styles.selectedOption),
              feedback && (isCorrect ? (theme === 'dark' ? styles.darkCorrectAnswer : styles.correctAnswer) 
                : isIncorrect ? (theme === 'dark' ? styles.darkWrongAnswer : styles.wrongAnswer) : null),
            ]}
            onPress={() => handleSelectOption(item.id, option)}
          >
            <Text style={[styles.optionText, theme === 'dark' && styles.darkText]}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <View style={[styles.header, theme === 'dark' && styles.darkHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? '#f4f3f4' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerText, theme === 'dark' && styles.darkText]}>Grammar Challenge</Text>
        <View style={styles.placeholder} />
      </View>
      <FlatList data={challengeData} renderItem={renderQuestion} keyExtractor={item => item.id} contentContainerStyle={styles.list} />
      <TouchableOpacity
        style={[styles.submitButton, theme === 'dark' && styles.darkSubmitButton]}
        onPress={isSubmitted ? () => navigation.goBack() : handleSubmit}
      >
        <Text style={[styles.submitText, theme === 'dark' && styles.darkText]}>
          {isSubmitted ? 'Trở về trang chủ' : 'Nộp bài'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Updated styles for dark mode support
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB' },
  darkContainer: { backgroundColor: '#1c1c1c' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  darkHeader: { backgroundColor: '#2a2a2a', borderBottomColor: '#444' },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  darkText: { color: '#f4f3f4' },
  placeholder: { width: 24 },
  list: { padding: 20 },
  questionContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 20 },
  darkQuestionContainer: { backgroundColor: '#2a2a2a' },
  optionButton: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginVertical: 5, backgroundColor: '#f9f9f9' },
  darkOptionButton: { backgroundColor: '#3a3a3a', borderColor: '#777' },
  selectedOption: { backgroundColor: '#e6f0ff', borderColor: '#007AFF' },
  darkSelectedOption: { backgroundColor: '#4a90e2', borderColor: '#007AFF' },
  correctAnswer: { backgroundColor: 'green', borderColor: 'darkgreen' },
  darkCorrectAnswer: { backgroundColor: '#26a65b', borderColor: '#1e8449' },
  wrongAnswer: { backgroundColor: 'red', borderColor: 'darkred' },
  darkWrongAnswer: { backgroundColor: '#e74c3c', borderColor: '#c0392b' },
  submitButton: { backgroundColor: '#007AFF', paddingVertical: 15, borderRadius: 12, margin: 20, alignItems: 'center' },
  darkSubmitButton: { backgroundColor: '#555' },
  submitText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
});

