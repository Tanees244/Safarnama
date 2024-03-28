import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Ellipse } from 'react-native-svg';
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';

const GuideRegister = () => {

  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://192.168.100.12:8000/api/authRoutes/register/",
        {
          email: email,
          password: Password,
          user_type: "Guide",
          vendor_type: "",
          transport_type:"",
        }
      );

      console.log(response.data);
      navigation.navigate("GuidePersonalDetail" , { userId: response.data.userId });
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Network Error: Unable to connect to the server.");
    }
  };

  // const handleSignup = async () => {
  //   navigation.navigate('GuidePersonalDetail');
  // }
   
   
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>

      <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
        <Ellipse cx="20%" cy="5%" rx="400" ry="400" fill="#071B26" />
      </Svg>
      <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
        <Ellipse cx="80%" cy="120%" rx="400" ry="400" fill="#071B26" />
      </Svg>

      <View style={styles.Textcontainer}>
        <Text style={styles.text}>Guide Registration</Text>
      
        <View style={styles.ButtonContainer}>

          <View style={styles.InputContainer}>
            <TextInput
              placeholder='Email'
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.Input}
              />
            
            <TextInput
              placeholder='Password'
              style={styles.Input}
              value={Password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
              />
          </View>

          <TouchableOpacity
            activeOpacity={0.5} 
            style={styles.RegisterButton}
            onPress={handleSignup}
            >
            <Text style={styles.RegisterText}>Register</Text>
          </TouchableOpacity>
          


          <View style={styles.Signup}>
            <Text style={styles.text2}>ACCOUNT ALREADY EXISTS</Text>
            <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleLogin}
            > 

              <Text style={styles.boldText}> LOGIN !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundEllipse: {
    position: 'absolute',
  },
  Textcontainer: {
    flex: 1,
    top: 140,
    alignItems: 'center',
  },
  vector:{
    top: -30,
    right: 150,
  },
  text: {
    fontSize: 45,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    
    textAlign:'center',
  },
  ButtonContainer: {
    marginTop: 90,
    width: 338,
    alignItems: 'center',
  },
  VendorContainer:{
    padding: 20,
  },
  VendorButtons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Button:{
    backgroundColor: '#A4B0B2',
    borderRadius: 50,
    padding: 20,
    width: '40%',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  InputContainer: {
    width: '100%',
  },
  Input: {
    backgroundColor: '#A4B0B2',
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  PasswordButton: {
    right: -110,
    top: 5,
    borderBottomWidth: 2,
    borderColor: 'black',
  },
  PasswordText: {
    fontStyle: 'italic',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  RegisterButton: {
    backgroundColor: '#319BD6',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    height: 70,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 40,
  },
  RegisterText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  Signup: {
    marginTop: 30,
    flexDirection: 'row',
  },
  text2: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color:'white',
  },
  boldText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    bottom: 0.5,
    color:'white',
  },
});

export default GuideRegister;
