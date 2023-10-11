//done
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GuideDocument = () => {
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth * 0.26;
  const containerWidth = screenWidth * 0.9;
  const indicatorWidth = screenWidth * 0.2;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Documents</Text>

      <View style={styles.indicator}>
        <View style={[styles.pageIndicatorActive, { width: indicatorWidth }]} />
        <View style={[styles.pageIndicator, { width: indicatorWidth }]} />
        <View style={[styles.pageIndicator, { width: indicatorWidth }]} />
        <View style={[styles.pageIndicator, { width: indicatorWidth }]} />
      </View>

      <View style={[styles.uploadContainer, { width: containerWidth }]}>
        <View style={styles.subContainer}>
          <TouchableOpacity style={[styles.button, { width: buttonWidth, height: buttonWidth }]}>
            <Image source={require('../../assets/upload.png')} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text>Picture Of Yourself</Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity style={[styles.button, { width: buttonWidth, height: buttonWidth }]}>
            <Image source={require('../../assets/upload.png')} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text>CNIC (FRONT)</Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity style={[styles.button, { width: buttonWidth, height: buttonWidth }]}>
            <Image source={require('../../assets/upload.png')} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text>CNIC (BACK)</Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity style={[styles.button, { width: buttonWidth, height: buttonWidth }]}>
            <Image source={require('../../assets/upload.png')} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text>Tour Guide License</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 40,
  },
  text: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  indicator: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  pageIndicator: {
    borderWidth: 1,
    borderRadius: 30,
    height: 15,
    borderColor: 'black',
    backgroundColor: '#CCCCCC',
    marginHorizontal: 5,
  },
  pageIndicatorActive: {
    borderWidth: 1,
    borderRadius: 30,
    height: 15,
    borderColor: 'white',
    backgroundColor: '#071B26',
    marginHorizontal: 5,
  },
  uploadContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderRadius: 66,
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#319BD6',
    width: 200,
    height: 60,
    borderRadius: 40,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GuideDocument;
