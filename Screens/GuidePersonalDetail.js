import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image,TouchableOpacity } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import GuideDocument from './GuideDocument';


const GuidePersonalDetail = () => {
  
  const navigation = useNavigation();

  const handleUploadDocuments = () => {
    navigation.navigate(GuideDocument);
  };

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
    <ScrollView contentContainerStyle={styles.container}>
      <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
        <Ellipse cx="20%" cy="20%" rx="300" ry="300" fill="#6FBEE9" />
      </Svg>
      <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
        <Ellipse cx="80%" cy="90%" rx="250" ry="250" fill="#6FBEE9" />
      </Svg>

      <Text style={styles.Text}>
        Personal <Text style={[styles.Text, { color: 'white' }]}>Details</Text>
      </Text>

      <View style={styles.Indicator}>
        <View style={styles.PageIndicatorActive} />
        <View style={styles.PageIndicator} />
        <View style={styles.PageIndicator} />
        <View style={styles.PageIndicator} />
      </View>

      <View style={styles.ButtonContainer}>
        <TextInput
          placeholder='Enter Your Full Name'
          ref={textInputRef}
          multiline={true}
          style={styles.Input}
          onChangeText={handleTextChange}
        />
        <TextInput
          placeholder='Enter Your Age'
          ref={textInputRef}
          multiline={true}
          style={styles.Input}
          onChangeText={handleTextChange}
        />
        <TextInput
          placeholder='Enter Your Email'
          ref={textInputRef}
          multiline={true}
          style={styles.Input}
          onChangeText={handleTextChange}
        />
        <TextInput
          placeholder='Enter Your Address'
          ref={textInputRef}
          multiline={true}
          style={styles.Input}
          onChangeText={handleTextChange}
        />
        <TextInput
          placeholder='Enter Your Phone Number'
          ref={textInputRef}
          multiline={true}
          style={styles.Input}
          onChangeText={handleTextChange}
        />
        <TextInput
          placeholder='Enter Your CNIC Number'
          ref={textInputRef}
          multiline={true}
          style={styles.Input}
          onChangeText={handleTextChange}
        />
        <View style={styles.UploadButton}>
          <Text style={styles.UploadButtonText}>Upload Your Documents</Text> 
          <TouchableOpacity
          onPress={handleUploadDocuments}
          > 
            <Image style={styles.UploadButtonImage} source={require('../assets/plus.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundEllipse: {
    position: 'absolute',
  },
  Text: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 90,
    right: 30,
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
  ButtonContainer: {
    marginTop: 70,
    alignItems: 'center',
  },
  Input: {
    backgroundColor: '#B1D5E9',
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
    height: 70,
    width: 320,
  },
  UploadButton: {
    backgroundColor: '#B1D5E9',
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
    height: 80,
    width: 320,
    flexDirection: 'row',
    marginBottom: 15,   
  },
  UploadButtonText: {
    color: '#6E6E6E',
    textAlignVertical: 'center',
    flex: 1,
  },
  UploadButtonImage: {
    width: 50,
    height: 50,
    marginLeft: 50,
  },
});

export default GuidePersonalDetail;
