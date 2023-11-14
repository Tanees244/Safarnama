import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const GuideDocument = () => {
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth * 0.26;
  const submitButton = screenWidth * 0.4;
  const containerWidth = screenWidth * 0.9;
  const indicatorWidth = screenWidth * 0.2;

  const [imageUri1, setImageUri1] = useState(null);
  const [imageUri2, setImageUri2] = useState(null);
  const [imageUri3, setImageUri3] = useState(null);
  const [imageUri4, setImageUri4] = useState(null);

  const pickImage = async (setImageUri) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    setImageUri(result.uri);
    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!(imageUri1 && imageUri2 && imageUri3 && imageUri4)) {
      navigation.navigate('GuideExperience');
    } else {
      Alert.alert('Upload Images', 'Please upload all required images before submitting.');
    }
  };
  

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
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
            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: buttonWidth }]}
              onPress={() => pickImage(setImageUri1)}
            >
              {imageUri1 ? (
                <Image source={{ uri: imageUri1 }} style={styles.image} />
              ) : (
                <Image source={require('../../assets/upload.png')} style={styles.image} />
              )}
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={[{ fontFamily: 'Poppins-Regular', color: 'white' }]}>Picture Of Yourself</Text>
            </View>
          </View>
          <View style={styles.subContainer}>
            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: buttonWidth }]}
              onPress={() => pickImage(setImageUri2)}
            >
              {imageUri2 ? (
                <Image source={{ uri: imageUri2 }} style={styles.image} />
              ) : (
                <Image source={require('../../assets/upload.png')} style={styles.image} />
              )}
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={[{ fontFamily: 'Poppins-Regular', color: 'white' }]}>CNIC (FRONT)</Text>
            </View>
          </View>
          <View style={styles.subContainer}>
            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: buttonWidth }]}
              onPress={() => pickImage(setImageUri3)}
            >
              {imageUri1 ? (
                <Image source={{ uri: imageUri3 }} style={styles.image} />
              ) : (
                <Image source={require('../../assets/upload.png')} style={styles.image} />
              )}
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={[{ fontFamily: 'Poppins-Regular', color: 'white' }]}>CNIC (BACK)</Text>
            </View>
          </View>
          <View style={styles.subContainer}>
            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: buttonWidth }]}
              onPress={() => pickImage(setImageUri4)}
            >
              {imageUri1 ? (
                <Image source={{ uri: imageUri4 }} style={styles.image} />
              ) : (
                <Image source={require('../../assets/upload.png')} style={styles.image} />
              )}
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={[{ fontFamily: 'Poppins-Regular', color: 'white' }]}>Tour Guide License</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.9} style={[styles.submitButton, { width: submitButton }]} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
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
    color: 'black',
    fontFamily: 'Poppins-Bold',
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
    backgroundColor: '#4f697c',
    borderRadius: 60,
    height: 120,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 60,
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
    fontFamily: 'Poppins-Regular',
  },
  submitButton: {
    borderRadius: 38,
    backgroundColor: '#319BD6',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginTop: 30,
    marginBottom: 30,
  },
  submitButtonText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
});

export default GuideDocument;
