import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const TrainDetails = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const inputWidth = containerWidth * 0.9;
  const uploadButtonWidth = containerWidth * 0.8;
  const buttonWidth = screenWidth * 0.4;

  const handleUploadDocuments = () => {
    navigation.navigate(GuideDocument);
  };

  const handleVendorDashboard = () => {
    navigation.navigate('HotelDashboard');
  };
  
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
        <Ellipse cx="20%" cy="20%" rx="300" ry="300" fill="#6FBEE9" />
      </Svg>
      <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
        <Ellipse cx="80%" cy="90%" rx="250" ry="250" fill="#6FBEE9" />
      </Svg>

      <Text style={styles.Text}>
        Vendor <Text style={[styles.Text, { color: 'white' }]}>Details</Text>
      </Text>

      <View style={styles.ButtonContainer}>
        <TextInput
          placeholder='Enter Your Full Name'
          ref={textInputRef}
          multiline={true}
          style={[styles.Input, { width: inputWidth }]}
          onChangeText={handleTextChange}
        />
        <TextInput
          placeholder='Enter Your Age'
          ref={textInputRef}
          multiline={true}
          style={[styles.Input, { width: inputWidth }]}
          onChangeText={handleTextChange}
        />
        <TextInput
          placeholder='Enter Your Address'
          ref={textInputRef}
          multiline={true}
          style={[styles.Input, { width: inputWidth }]}
          onChangeText={handleTextChange}
        />
        <TextInput
          placeholder='Enter Your Phone Number'
          ref={textInputRef}
          multiline={true}
          style={[styles.Input, { width: inputWidth }]}
          onChangeText={handleTextChange}
        />
        <TextInput
          placeholder='Enter Your CNIC Number'
          ref={textInputRef}
          multiline={true}
          style={[styles.Input, { width: inputWidth }]}
          onChangeText={handleTextChange}
        />
        <View style={[styles.UploadButton, { width: uploadButtonWidth }]}>
          <Text style={styles.UploadButtonText}>Upload Your Picture</Text> 
          <TouchableOpacity > 
            <Image style={styles.UploadButtonImage} source={require('../../assets/plus.png')}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleVendorDashboard} activeOpacity={0.9} style={[styles.buttonText, { width: buttonWidth }]}> 
          <Text style={styles.TextDesign}>
            NEXT
          </Text>
        </TouchableOpacity>
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
  buttonText: {
    marginTop: 30,
    flexDirection: 'row',
    borderRadius: 38,
    backgroundColor: 'blue',
    justifyContent: 'center',
    height: 50,
    marginBottom:10,
  },
  TextDesign: {
    fontSize: 20,
    fontWeight: '900',
    padding: 10,
    color: 'white',
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

export default TrainDetails;
