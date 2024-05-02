import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';

const GuideQuestionnaire = () => {
  const [answers, setAnswers] = useState(['', '', '']); // Initialize with empty strings for 3 questions
  const [isChecked, setIsChecked] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const navigation = useNavigation();

  const handleCheckBox1 = () => {
    setShowPrivacyPolicyModal(true);
    setIsChecked(!isChecked);
  };
  const handleCheckBox2 = () => {
    setShowTermsModal(true);
    setIsChecked(!isChecked);
  };
  

  const handleTextChange = (index, newText) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = newText;
    setAnswers(updatedAnswers);
  };

  const route = useRoute();
  const { guideId } = route.params;

  useEffect(() => {
    // Function to shuffle an array using Fisher-Yates (aka Knuth) Shuffle algorithm
    const shuffle = (array) => {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    const questionBank = [
      { id: 1, text: "What is the highest peak in Northern Pakistan?" },
      { id: 2, text: "Which river flows through Hunza Valley?" },
      { id: 3, text: "Name the famous mountain pass located in the Karakoram Range." },
      { id: 4, text: "Which city is known as the Gateway to the Northern Areas of Pakistan?" },
      { id: 5, text: "What is the altitude of Fairy Meadows, a popular tourist destination in Northern Pakistan?" },
      { id: 6, text: "Which lake in Northern Pakistan is famous for its turquoise-colored waters?" },
      { id: 7, text: "Name the famous ancient fort located in Skardu, Baltistan." },
      { id: 8, text: "What is the main attraction of the Deosai National Park?" },
      { id: 9, text: "Which valley is known as the Switzerland of the East?" },
      { id: 10, text:"Name the highest paved international border crossing in the world, located in Northern Pakistan." },
    ];

    const shuffledQuestions = shuffle(questionBank).slice(0, 3);
    setSelectedQuestions(shuffledQuestions);
  }, []);

  const handleApply = async () => {
    if (isChecked) {
      try {
        const response = await axios.post(
          "http://192.168.100.12:8000/api/guideRoutes/guide_questionnaire",
          {
            guideId,
            answers,
          }
        );

        if (response.status === 200) {
          console.log(response.data);
          navigation.navigate("Login");
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Questionnaire</Text>

        <View style={styles.indicator}>
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicatorActive} />
        </View>

        <View style={styles.questionsContainer}>
          {selectedQuestions.map((question, index) => (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.questionText}>{`${question.text}`}</Text>
              <TextInput
                style={styles.inputBox}
                multiline
                value={answers[index]}
                onChangeText={(text) => handleTextChange(index, text)}
              />
            </View>
          ))}
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            title='Privacy Policy'
            checked={isChecked}
            onPress={handleCheckBox1}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title='Terms & Condition'
            checked={isChecked}
            onPress={handleCheckBox2}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { width: buttonWidth }]}
          onPress={handleApply}
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Privacy Policy Modal */}
      <Modal
        visible={showPrivacyPolicyModal}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setShowPrivacyPolicyModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            <Text style={styles.modalText}>
              {/* Add your privacy policy text here */}
              Safarnama is dedicated to safeguarding the privacy and security of our guides. When you apply to become a guide with Safarnama, we collect certain personal information to assess your eligibility and suitability for the position. This information may include your name, contact details, address, educational background, and work experience. We use this information solely for employment-related purposes, such as evaluating qualifications and communicating with applicants. Safarnama takes measures to protect the personal information provided by guides and does not share it with third parties unless required by law or necessary for employment purposes. By applying to become a guide, you consent to the collection, use, and processing of your personal information as described in this privacy policy.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPrivacyPolicyModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Terms & Conditions Modal */}
      <Modal
        visible={showTermsModal}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setShowTermsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Terms & Conditions</Text>
            <Text style={styles.modalText}>
            By applying to become a guide with Safarnama, you agree to the following terms and conditions. You must be legally eligible to work in the country where you seek employment with Safarnama. You certify that all information provided in your application is accurate and truthful. You agree to maintain the confidentiality of any sensitive information obtained during the application process. As a guide, you commit to conducting yourself professionally and ethically, complying with all applicable laws and regulations. Safarnama reserves the right to terminate your employment as a guide at any time, with or without cause. By accepting these terms and conditions, you acknowledge your understanding of the obligations and responsibilities associated with being a guide with Safarnama.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowTermsModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    height: 140,
    backgroundColor: "#1a1a1a",
    shadowColor: "black",
    elevation: 20,
    zIndex: -1,
  },
  headerText: {
    textAlign: "center",
    top: 60,
    color: "white",
    fontSize: 30,
    fontFamily: "Poppins-Bold",
  },
  heading: {
    fontSize: 32,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginTop: 30,
    marginBottom: 20,
  },
  indicator: {
    flexDirection: "row",
    marginTop: 20,
  },
  pageIndicator: {
    borderWidth: 1,
    borderRadius: 30,
    width: 80,
    height: 15,
    borderColor: "black",
    backgroundColor: "#D9D9D9",
    marginHorizontal: 2,
  },
  pageIndicatorActive: {
    borderWidth: 1,
    borderRadius: 30,
    width: 80,
    height: 15,
    borderColor: "white",
    backgroundColor: "#071B40",
    marginHorizontal: 5,
  },
  questionsContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  questionText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    marginBottom: 0,
  },
  inputBox: {
    marginTop: 10,
    backgroundColor: "#D9D9D9",
    height: 80,
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 30,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    textAlign:'justify',

    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#319BD6',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GuideQuestionnaire;
