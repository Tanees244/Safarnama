import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';


const TouristPersonalDetail = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const inputWidth = containerWidth * 0.9;
  const submitButton = screenWidth * 0.4;
  const uploadButtonWidth = containerWidth * 0.9;

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    address: '',
    phoneNumber: '',
    cnicNumber: '',
  });

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUploadDocuments = () => {
    // Your previous validation here if needed

    /*if (!isFormDataValid()) {
      Alert.alert('Fill All Fields', 'Please fill in all the fields correctly before proceeding.');
      return;
    }*/

    const formDataToStore = formData;
    navigation.navigate('GuideDocument', { formData: formDataToStore });
  };

  const isFormDataValid = () => {
    return (
      formData.fullName &&
      formData.age &&
      formData.email &&
      formData.address &&
      formData.phoneNumber &&
      formData.cnicNumber
    );
  };

  const handleSubmit = () => {
    navigation.navigate("Discover");
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
          <Ellipse cx="20%" cy="20%" rx="300" ry="300" fill="#4f697c" />
        </Svg>
        <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
          <Ellipse cx="80%" cy="90%" rx="250" ry="250" fill="#355369" />
        </Svg>

        <Text style={styles.Text}>
          Personal <Text style={[styles.Text, { color: 'white' }]}>Details</Text>
        </Text>
        <View style={styles.ButtonContainer}>
          <TextInput
            placeholder='Enter Your Full Name'
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange('fullName', text)}
            value={formData.fullName}
          />
          <TextInput
            placeholder='Enter Your Age'
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange('age', text)}
            value={formData.age}
            keyboardType='numeric'
          />
          <TextInput
            placeholder='Enter Your Email'
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange('email', text)}
            value={formData.email}
          />
          <TextInput
            placeholder='Enter Your Address'
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange('address', text)}
            value={formData.address}
          />
          <TextInput
            placeholder='Enter Your Phone Number'
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange('phoneNumber', text)}
            value={formData.phoneNumber}
            keyboardType='numeric'
          />
          <TextInput
            placeholder='Enter Your CNIC'
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange('cnicNumber', text)}
            value={formData.cnicNumber}
            keyboardType='numeric'
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.UploadButton, { width: uploadButtonWidth }]}
            onPress={handleUploadDocuments}
          >
            <Text style={styles.UploadButtonText}>Upload Your Picture</Text>
            <Image style={styles.UploadButtonImage} source={require('../../assets/plus.png')} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} style={[styles.submitButton, { width: submitButton }]} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
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
  backgroundEllipse: {
    position: 'absolute',
  },
  Text: {
    fontSize: 32,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    marginTop: 40,
    padding: 20,
  },
  indicator: {
    flexDirection: 'row',
    top: 30,
  },
  submitButton: {
    borderRadius: 38,
    backgroundColor: '#319BD6',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginTop: 30,
  },
  submitButtonText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  ButtonContainer: {
    marginBottom: 70,
    width: '100%',
    alignItems: 'center',
  },
  Input: {
    backgroundColor: '#cccccc',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    height: 80,
    fontFamily: 'Poppins-SemiBold',
  },
  UploadButton: {
    backgroundColor: '#cccccc',
    borderRadius: 10,
    marginTop: 10,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  UploadButtonText: {
    color: '#6E6E6E',
    fontFamily: 'Poppins-SemiBold',
  },
  UploadButtonImage: {
    width: 50,
    height: 50,
  },
});

export default TouristPersonalDetail;
