import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const HotelVendorPersonalDetails = () => {

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const inputWidth = containerWidth * 0.9;
  const submitButton = screenWidth * 0.4;
  const uploadButtonWidth = containerWidth * 0.9;
  const buttonWidth = screenWidth * 0.26;

  const [imageUri1, setImageUri1] = useState(null);

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

  const pickImage = async (setImageUri) => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    setImageUri(result.uri);
    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[1].uri);
    }
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
    navigation.navigate("HotelDashboard");
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
          <View  style={[styles.UploadButton, { width: uploadButtonWidth }]}>
            <View style={styles.UploadButtonText}>
              <Text style={[{ fontFamily: 'Poppins-SemiBold', color: 'grey' }]}>Picture Of Yourself</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: buttonWidth }]}
              onPress={() => pickImage(setImageUri1)}
            >
              {imageUri1 ? (
                <Image source={{ uri: imageUri1 }} style={styles.image} />
              ) : (
                <Image style={styles.UploadButtonImage} source={require('../../assets/plus.png')} />
              )}
            </TouchableOpacity>
          </View>
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
    fontFamily: 'Poppins-SemiBold',
  },
  UploadButtonImage: {
    width: 50,
    height: 50,
  },
  button: {
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HotelVendorPersonalDetails;
