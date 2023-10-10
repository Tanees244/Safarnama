import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

const GuideHome = () => {

    const [text, setText] = useState('');
    const textInputRef = useRef(null);

    const handleTextChange = (newText) => {
        setText(newText);

    // Calculate the total height including the button and some padding
    const totalHeight = (newText.split('\n').length * 25) + 50; // Adjust the multiplier for desired padding

    // Set the TextInput's height
    if (textInputRef.current) {
      textInputRef.current.setNativeProps({
        height: Math.max(55, totalHeight), // Minimum height is 70
      });
    }
  };

  return (
    <View style={styles.Container}>

        <Text style={styles.Text}>
            Experience
        </Text>

      <View style={styles.Indicator}>
        <View style={styles.PageIndicatorActive} />
        <View style={styles.PageIndicatorActive} />
        <View style={styles.PageIndicator} />
        <View style={styles.PageIndicator} />
      </View>

      <View style={styles.InputContainer}>
        <View style={styles.InputHeading}>
            <Text style={styles.InputText}>Your Past Experience</Text>
        </View>
        <View style={styles.InputBox}>
            <TextInput
                placeholder='Enter Your Address'
                ref={textInputRef}
                multiline={true}
                style={styles.Input}
                onChangeText={handleTextChange}
            />  
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    top: 120,
  },
  Text: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    right: 75,
  },
  Indicator: {
    flexDirection: 'row',
    top: 30,
  },
  PageIndicator: {
    borderWidth: 1,
    borderRadius: 30,
    width: 80, 
    height: 15,
    borderColor: 'black',
    backgroundColor: '#CCCCCC',
    marginHorizontal: 2, 
  },
  PageIndicatorActive: {
    borderWidth: 1,
    borderRadius: 30,
    width: 80,
    height: 15,
    borderColor: 'white',
    backgroundColor: '#071B26',
    marginHorizontal: 5, 
  },
  InputContainer: {
    top : 50,
    alignItems: 'flex-start',
  },
});

export default GuideHome;
