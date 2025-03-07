import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation , useRoute} from '@react-navigation/native';

const TrainDetails = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const inputWidth = containerWidth * 0.9;
  const submitButton = screenWidth * 0.4;
  const uploadButtonWidth = containerWidth * 0.9;
  const route = useRoute();
  const { transportId } = route.params;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
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
      formData.email &&
      formData.phoneNumber 
    );
  };

  const handleSubmit =  async () => {
    try {
      const response = await fetch(
        "http://192.168.100.12:8000/api/authRoutes/railway_details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, transportId }),
        }
      );

      if (response.ok) {
        const responseData = await response.json(); 
        console.log(responseData);
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
        Vendor <Text style={[styles.Text, { color: 'white' }]}>Details</Text>
        </Text>

        <View style={styles.ButtonContainer}>
          <TextInput
            placeholder='Enter Train Name'
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange('fullName', text)}
            value={formData.fullName}
          />
          <TextInput
            placeholder='Enter Your Email'
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange('email', text)}
            value={formData.email}
          />
          <TextInput
            placeholder='Enter Your Phone Number'
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange('phoneNumber', text)}
            value={formData.phoneNumber}
            keyboardType='numeric'
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.UploadButton, { width: uploadButtonWidth }]}
            onPress={handleUploadDocuments}
          >
            <Text style={styles.UploadButtonText}>Upload Your Logo</Text>
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
    fontSize: 40,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    marginTop: 60,
    padding: 0,
  },
  indicator: {
    flexDirection: 'row',
    top: 30,
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
    marginHorizontal: 2,
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

export default TrainDetails;
