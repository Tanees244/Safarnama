import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const CreateAirline = () => {

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const RegisterContainer = containerWidth * 0.7;
  const inputWidth = containerWidth * 0.9;

  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const textInputRef = useRef(null);

  const handleTextChange = (newText, field) => {
    if (field === 'name') {
      setName(newText);
    } else if (field === 'description') {
      setDescription(newText);
    } else if (field === 'email') {
      setEmail(newText);
    }

    const totalHeight = (newText.split('\n').length * 25) + 50;

    if (textInputRef.current) {
      textInputRef.current.setNativeProps({
        height: Math.max(55, totalHeight),
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const isSubmitButtonEnabled = name !== '' && description !== '' && email !== '';

  const handleDashboard = () => {
    navigation.navigate('AirlineDashboard');
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.RegisterContainer, { width: RegisterContainer }]}>
          <Text style={styles.Text}>
            Register <Text style={[styles.Text, { color: 'white' }]}>Airline</Text>
          </Text>
        </View>
        <View style={[styles.HeadingContainer, { width: RegisterContainer }]}>
          <Text style={styles.Text}>
            Airline <Text style={[styles.Text, { color: 'white' }]}>Details</Text>
          </Text>
        </View>
        <View style={styles.ButtonContainer}>
          <Text style={styles.Heading}>Name Of Airline</Text>
          <TextInput
            placeholder='Enter Your Airline Name'
            ref={textInputRef}
            multiline={true}
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleTextChange(text, 'name')}
          />
          <Text style={styles.Heading}>Description Of Airline</Text>
          <TextInput
            placeholder='Enter Description Of Your Airline'
            ref={textInputRef}
            multiline={true}
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleTextChange(text, 'description')}
          />
          <Text style={styles.Heading}>Email Address Of Airline</Text>
          <TextInput
            placeholder='Enter Email Address Of Airline'
            ref={textInputRef}
            multiline={true}
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleTextChange(text, 'email')}
          />
          <Text style={styles.Heading}>Upload Your Logo</Text>
          <View style={styles.PopupButton}>
            <Text style={styles.ButtonText}>Upload Image</Text>
            <TouchableOpacity onPress={pickImage}>
              <Image style={styles.PopupImage} source={require('../../assets/plus2.png')}/>
            </TouchableOpacity>
          </View>
          {isSubmitButtonEnabled && (
            <TouchableOpacity style={styles.SubmitButton} onPress={handleDashboard}>
                <Text style={styles.SubmitText}>Apply</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  Container: {
    backgroundColor: '#cee7fa',
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: '#032844',
    shadowColor: 'black',
    elevation: 20,
    zIndex: -1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: {
    textAlign: 'center',
    top: 60,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  HeadingContainer:{
    backgroundColor: '#0a78cd',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: -30,
    marginLeft: 130,
    elevation: 10,
    shadowColor: 'black',
    zIndex: 3,
  },
  RegisterContainer: {
    backgroundColor: '#54aaec',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 20,
    marginTop: 30,
    marginBottom: 10,
    zIndex: 2,
    justifyContent: 'center',
  },
  Text: {
    fontSize: 32,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    paddingLeft: 15,
  },
  ButtonContainer: {
    marginTop: 20,
    backgroundColor: '#9dcef4',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  Heading: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  Input: {
    backgroundColor: '#b6daf7',
    paddingHorizontal: 15,
    borderRadius: 15,
    fontFamily: 'Poppins-Regular',
    height: 70,
    width: 320,
  },
  PopupButton: {
    backgroundColor: '#b6daf7',
    borderRadius: 30,
    padding: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  PopupImage: {
    width: 30,
    height: 30,
  },
  ButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
  },
  SubmitButton:{
    backgroundColor: '#0a78cd',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  SubmitText:{
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
});

export default CreateAirline;
