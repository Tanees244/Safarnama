import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Ellipse } from 'react-native-svg';
import {  Vector } from '../assets';
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FIREBASE_AUTH, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {

  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState('false');
  const auth = FIREBASE_AUTH;
  
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleVendor = () => {
    navigation.navigate('CreateAirline');
  };

  const handleGuide = () => {
    navigation.navigate('GuideRegister');
  };
  
  useEffect (() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      if (user) {
        navigation.navigate("Login")
      }
    })

    return unsubscribe

  } ,[])

  const handleSignup = async () =>{
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth,email,Password);
      console.log(response);
    }
    catch(error){
      console.error(error);
      alert('Sign Up failed: ' + error.message); 
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>

      <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
        <Ellipse cx="50%" cy="20%" rx="400" ry="400" fill="#071B26" />
      </Svg>

      <View style={styles.Textcontainer}>
        <Image style={styles.vector} source={Vector}/>
        <Text style={styles.text}>Safarnama</Text>
        <Text style={{color: '#319BD6', fontSize: 16, fontFamily: 'Poppins-SemiBold', top:-15}}>Join With Us To Travel Around Pakistan</Text>
      
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
          

          <View style={styles.VendorContainer}>
            <Text style={styles.text2}>SIGNUP AS</Text>
          </View>

          <View style={styles.VendorButtons}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleVendor}
              style={styles.Button}
            >
              <Text style={styles.boldText}>VENDOR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleGuide}
              style={styles.Button}
            >
              <Text style={styles.boldText}>GUIDE</Text>
            </TouchableOpacity>
          </View>


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
    top: 20,
    right: 160,
  },
  text: {
    fontSize: 45,
    fontFamily: 'Poppins-Bold',
    color: 'white',
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
  },
  boldText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    bottom: 0.5,
  },
});

export default Register;
