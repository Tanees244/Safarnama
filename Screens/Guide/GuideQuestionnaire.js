import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';

const GuideQuestionnaire = () => {
  const [answers, setAnswers] = useState(['', '', '']); // Initialize with empty strings for 3 questions
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();
  
  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const handleTextChange = (index, newText) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = newText;
    setAnswers(updatedAnswers);
  };

  const route = useRoute();
  const { guideId } = route.params;

  const handleApply = async () => {
    if (isChecked) {
      try {
        const response = await axios.post(
          "http://192.168.0.105:8000/api/authRoutes/guide_questionnaire",
          {
            guideId,
            answers,
          }
        );

        if (response.status === 200) {
          console.log(response.data);
          navigation.navigate("GuideHomeScreen");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      alert('Please accept the terms and conditions before applying.');
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth * 0.4;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Questionnaire</Text>

        <View style={styles.questionsContainer}>
          {answers.map((answer, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.questionText}>{`Question #${index + 1}:`}</Text>
              <TextInput
                style={styles.answerInput}
                multiline
                value={answer}
                onChangeText={(text) => handleTextChange(index, text)}
              />
            </View>
          ))}
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            title='Privacy Policy'
            checked={isChecked}
            onPress={handleCheckBox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title='Terms & Condition'
            checked={isChecked}
            onPress={handleCheckBox}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { width: buttonWidth }]}
          onPress={handleApply}
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionsContainer: {
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#319BD6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GuideQuestionnaire;
