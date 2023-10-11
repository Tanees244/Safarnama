import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const GuideDocument = () => {
  
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.Text}>
        Documents
      </Text>

      <View style={styles.Indicator}>
        <View style={styles.PageIndicatorActive} />
        <View style={styles.PageIndicator} />
        <View style={styles.PageIndicator} />
        <View style={styles.PageIndicator} />
      </View>

      <View style={styles.UploadContainer}>
        <View style={styles.SubContainer}>
            <TouchableOpacity 
            style={styles.Button}
            >
                <Image source={require('../../assets/upload.png')} style={styles.Image}/>
            </TouchableOpacity>
            <View style={styles.TextContainer}>
                <Text>Picture Of Yourself</Text>
            </View>
        </View>
        <View style={styles.SubContainer}>
            <TouchableOpacity 
            style={styles.Button}
            >
                <Image source={require('../../assets/upload.png')} style={styles.Image}/>
            </TouchableOpacity>
            <View style={styles.TextContainer}>
                <Text>CNIC (FRONT)</Text>
            </View>
        </View>
        <View style={styles.SubContainer}>
            <TouchableOpacity 
            style={styles.Button}
            >
                <Image source={require('../../assets/upload.png')} style={styles.Image}/>
            </TouchableOpacity>
            <View style={styles.TextContainer}>
                <Text>CNIC (BACK)</Text>
            </View>
        </View>
        <View style={styles.SubContainer}>
            <TouchableOpacity 
            style={styles.Button}
            >
                <Image source={require('../../assets/upload.png')} style={styles.Image}/>
            </TouchableOpacity>
            <View style={styles.TextContainer}>
                <Text>Tour Guide License</Text>
            </View>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.SubmitButton}
      >
        <Text style={styles.SubmitButtonText}>Submit</Text>
      </TouchableOpacity>
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
    right: 60,
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
  UploadContainer: {
    top: 80,
    width: '100%',
    alignItems: 'center',
  },
  SubContainer: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderRadius: 66,
    height: 120,
    width: 320,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  Button: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: 60,
    height: 60,
  },
  TextContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  SubmitButton: {
    backgroundColor: '#319BD6',
    width: 200, // Set your desired width
    height: 60, // Set your desired height
    borderRadius: 40, // Set your desired border radius
    marginTop: 100, // Add space between the UploadContainer and SubmitButton
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubmitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GuideDocument;
