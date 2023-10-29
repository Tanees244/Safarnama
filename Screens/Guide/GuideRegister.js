import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Ellipse } from 'react-native-svg';
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FIREBASE_AUTH, auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const GuideRegister = () => {

  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState('false');
  const auth = FIREBASE_AUTH;
  
  const navigation = useNavigation();
  
  useEffect (() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      if (!user) {
        navigation.navigate("GuidePersonalDetail")
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
        <Ellipse cx="20%" cy="5%" rx="400" ry="400" fill="#071B26" />
      </Svg>
      <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
        <Ellipse cx="80%" cy="120%" rx="400" ry="400" fill="#071B26" />
      </Svg>

      <View style={styles.Textcontainer}>
        <Text style={styles.text}>Guide {'\n'}Register</Text>
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
    textAlign: 'center',
  },
  ButtonContainer: {
    marginTop: 90,
    width: 338,
    alignItems: 'center',
  },
  InputContainer: {
    width: '100%',
    marginTop: 20,
  },
  Input: {
    backgroundColor: '#A4B0B2',
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  RegisterButton: {
    backgroundColor: '#319BD6',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '70%',
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
});

export default GuideRegister;
