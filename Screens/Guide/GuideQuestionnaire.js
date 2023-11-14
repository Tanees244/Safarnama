//done
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';


const GuideQuestionnaire = () => {
  const [text, setText] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const textInputRef = useRef(null);
  const navigation = useNavigation();
  
  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const handleTextChange = (newText) => {
    setText(newText);
    const totalHeight = (newText.split('\n').length * 25) + 50;

    if (textInputRef.current) {
      textInputRef.current.setNativeProps({
        height: Math.max(55, totalHeight),
      });
    }
  };
 


  const screenWidth = Dimensions.get('window').width;
  const inputContainerWidth = screenWidth * 0.9;
  const buttonWidth = screenWidth * 0.4;
  const inputBoxWidth = inputContainerWidth - 40; // Subtract padding

  const navigateToGuideHomeScreen = () => {
    if (isChecked) {
        navigation.navigate('GuideHomeScreen'); // Replace with your screen name
      } else {
        // Show an error message or alert if the checkboxes are not checked
        alert('Please accept the terms and conditions before applying.');
      }
    };

  return (
    <View style={styles.Container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Safarnama</Text>
    </View>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.text}>Questionnaire</Text>

        <View style={styles.indicator}>
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicatorActive} />
        </View>

        <View style={[styles.inputContainer, { width: inputContainerWidth }]}>
          <Text style={styles.inputHeading}>Question#1</Text>
          <View style={[styles.inputBox, { width: inputBoxWidth }]}>
            <TextInput
              ref={textInputRef}
              multiline={true}
              style={styles.input}
              onChangeText={handleTextChange}
            />
          </View>
        </View>

        <View style={[styles.inputContainer, { width: inputContainerWidth }]}>
          <Text style={styles.inputHeading}>Question#2</Text>
          <View style={[styles.inputBox, { width: inputBoxWidth }]}>
            <TextInput
              ref={textInputRef}
              multiline={true}
              style={styles.input}
              onChangeText={handleTextChange}
            />
          </View>
        </View>
        <View style={[styles.inputContainer, { width: inputContainerWidth }]}>
          <Text style={styles.inputHeading}>Question#3</Text>
          <View style={[styles.inputBox, { width: inputBoxWidth }]}>
            <TextInput
              ref={textInputRef}
              multiline={true}
              style={styles.input}
              onChangeText={handleTextChange}
            />
          </View>
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
        <View>
          <TouchableOpacity activeOpacity={0.5}
          onPress={navigateToGuideHomeScreen} 
              style={[styles.buttonText, { width: buttonWidth }]}>
              <Text style={styles.TextDesign}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Container: {
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: '#1a1a1a',
    shadowColor: 'black',
    elevation: 20,
    zIndex: -1,
  },
  headerText: {
    textAlign: 'center',
    top: 60,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  text: {
    fontSize: 32,
    color: '#319BD6',
    fontFamily: 'Poppins-Bold',
    marginTop: 30,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
  },
  indicator: {
    flexDirection: 'row',
    marginTop: 20,
  },
  pageIndicatorActive: {
    borderWidth: 1,
    borderRadius: 30,
    width: 80,
    height: 15,
    borderColor: 'white',
    backgroundColor: '#071B40',
    marginHorizontal: 5,
  },
  inputContainer: {
    marginTop: 30,
    alignItems: 'flex-start',
  },
  inputHeading: {
    fontSize: 20,
  },
  inputBox: {
    marginTop: 10,
    backgroundColor:  '#D9D9D9',
    height: 140,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',

  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  buttonText: {
    marginTop: 30,
    flexDirection: 'row',
    borderRadius: 38,
    backgroundColor: '#319BD6',
    justifyContent: 'center',
   

  },
  TextDesign: {
    fontSize: 20,
    fontWeight: '900',
    padding: 10,
    color: 'white',
  },

});

export default GuideQuestionnaire;
