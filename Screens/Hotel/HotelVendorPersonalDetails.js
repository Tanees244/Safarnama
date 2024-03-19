import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
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
  const [hotelIdModalVisible, setHotelIdModalVisible] = useState(false);
  const [hotelId, setHotelId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    address: '',
    contact_number: '',
    cnic_number: '',
    picture: null,
    hotel: null,
  });

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri1(result.uri);
        setFormData((prevData) => ({
          ...prevData,
          picture: result.uri,
        }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const isFormDataValid = () => {
    const {
      name,
      age,
      email,
      address,
      contact_number,
      cnic_number,
      picture,
      hotel,
    } = formData;

    return (
      name &&
      age &&
      email &&
      address &&
      contact_number &&
      cnic_number &&
      picture !== null &&
      hotel !== null
    );
  };

  const handleSubmit = async () => {
    try {
      if (!isFormDataValid()) {
        console.log('Please fill in all fields');
        return;
      }
  
      console.log('Form Data:', JSON.stringify(formData)); // Log form data
  
      const response = await fetch(
        'http://192.168.100.12:8000/api/hotel-vendor-personal-details/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
  
      const responseData = await response.json(); // Log the response data
      console.log('Response Data:', JSON.stringify(responseData));
  
      if (response.ok) {
        console.log('Form data submitted successfully');
        navigation.navigate('HotelDashboard');
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleHotelIdSubmit = () => {
    setFormData((prevData) => ({
      ...prevData,
      hotel: hotelId,
    }));
    setHotelIdModalVisible(false);
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
            onChangeText={(text) => handleFieldChange('name', text)}
            value={formData.name}
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
            onChangeText={(text) => handleFieldChange('contact_number', text)}
            value={formData.contact_number}
            keyboardType='numeric'
          />
          <TextInput
            placeholder='Enter Your CNIC'
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange('cnic_number', text)}
            value={formData.cnic_number}
            keyboardType='numeric'
          />
   <View style={[styles.UploadButton, { width: uploadButtonWidth }]}>
            <View style={styles.UploadButtonText}>
              <Text style={[{ fontFamily: 'Poppins-SemiBold', color: 'grey' }]}>
                Picture Of Yourself
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: buttonWidth }]}
              onPress={pickImage}
            >
              {imageUri1 ? (
                <Image source={{ uri: imageUri1 }} style={styles.image} />
              ) : (
                <Image
                  style={styles.UploadButtonImage}
                  source={require('../../assets/plus.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={[styles.UploadButton, { width: uploadButtonWidth }]}
          >
            <View style={styles.UploadButtonText}>
              <Text
                style={[{
                  fontFamily: 'Poppins-SemiBold',
                  color: 'grey',
                }]}
              >
                Hotel ID
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: buttonWidth }]}
              onPress={() => setHotelIdModalVisible(true)}
            >
              <Text>{hotelId || 'Select Hotel ID'}</Text>
            </TouchableOpacity>
          </View>
          {/* Other TextInputs... */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.submitButton, { width: submitButton }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={hotelIdModalVisible}
        onRequestClose={() => {
          setHotelIdModalVisible(!hotelIdModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Enter Hotel ID:</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              onChangeText={(text) => setHotelId(text)}
            />
            <Pressable
              style={[styles.modalButton, styles.modalButtonClose]}
              onPress={() => setHotelIdModalVisible(!hotelIdModalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.modalButtonSubmit]}
              onPress={handleHotelIdSubmit}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    justifyContent:''
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    paddingLeft: 10,
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  modalButtonClose: {
    backgroundColor: '#2196F3',
  },
  modalButtonSubmit: {
    backgroundColor: '#4CAF50',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default HotelVendorPersonalDetails;
