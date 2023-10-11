import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';

const GuideHome = () => {
  const [text, setText] = useState('');
  const textInputRef = useRef(null);

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
  const inputBoxWidth = inputContainerWidth - 40; // Subtract padding

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Experience</Text>

      <View style={styles.indicator}>
        <View style={styles.pageIndicatorActive} />
        <View style={styles.pageIndicatorActive} />
        <View style={styles.pageIndicator} />
        <View style={styles.pageIndicator} />
      </View>

      <View style={[styles.inputContainer, { width: inputContainerWidth }]}>
        <Text style={styles.inputHeading}>Your Past Experience</Text>
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
        <Text style={styles.inputHeading}>Motivation to become a guide</Text>
        <View style={[styles.inputBox, { width: inputBoxWidth }]}>
          <TextInput
            ref={textInputRef}
            multiline={true}
            style={styles.input}
            onChangeText={handleTextChange}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.5} 
            style={styles.buttonText}
           >
            <Text style={styles.Text1}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 80,
  },
  text: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
    right: 60,
  },
  indicator: {
    flexDirection: 'row',
    marginTop: 20,
  },
  pageIndicator: {
    borderWidth: 1,
    borderRadius: 30,
    width: 80,
    height: 15,
    borderColor: 'black',
    backgroundColor: '#D9D9D9',
    marginHorizontal: 2,
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
});

export default GuideHome;
