import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Ellipse } from 'react-native-svg';
import { User, Vector } from '../assets';
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FIREBASE_AUTH, auth } from '../firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import Category from './Category';

const Login = () => {

  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState('false');
  const auth = FIREBASE_AUTH;
  
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate(Register);
  };

  useEffect (() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      if (user) {
        navigation.navigate(Category)
      }
    })

    return unsubscribe

  } ,[])

  const handleSignIn = async () =>{
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth,email,Password);
      console.log(response);
    }
    catch(error){
      console.error(error);
      alert('Sign in failed: ' + error.message); 
    }
    finally{
      setLoading(false);
    }
  }

  
  const ResetPassword = () => {
    if(email!=null)
    {
      sendPasswordResetEmail(auth,email)
      .then (() => {
        alert("Password reset mail has been sent successfully !");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
    }
    else
    {
      alert("Enter a valid email");
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>

      <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
        <Ellipse cx="20%" cy="20%" rx="300" ry="300" fill="#071B26" />
      </Svg>

      <View style={styles.Textcontainer}>
        <Image style={styles.vector} source={Vector}/>
        <Text style={styles.text}>Safarnama</Text>
        <Text style={{color: '#319BD6', fontSize: 18, fontWeight: '600', top:-5}}>Login To Explore Pakistan</Text>
      
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
            style={styles.PasswordButton}
            onPress={ResetPassword}
            >
            <Text style={styles.PasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5} 
            style={styles.LoginButton}
            onPress={handleSignIn}
            >
            <Text style={styles.LoginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5} 
            style={styles.GoogleButton}
            >
              <Image style={styles.GoogleImage} source={require('../assets/google.png')}/>
            <Text style={styles.GoogleText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5} 
            style={styles.FacebookButton}
            >
              <Image style={styles.FacebookImage} source={require('../assets/facebook.png')}/>
            <Text style={styles.FacebookText}>Continue with Facebook</Text>
          </TouchableOpacity>

          <View style={styles.Signup}>
          <Text style={styles.text2}>DONT HAVE AN ACCOUNT</Text>
            <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleRegister}
            >
              <Text style={styles.boldText}> SIGN UP !</Text>
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
    right: 150,
  },
  text: {
    fontSize: 50,
    fontWeight: '900',
    color: 'white',
  },
  ButtonContainer: {
    marginTop: 90,
    width: 338,
    alignItems: 'center',
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
    fontWeight: 'bold',
  },
  LoginButton: {
    backgroundColor: '#319BD6',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    height: 56,
    borderRadius: 10,
    marginTop: 15,
  },
  LoginText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
  },
  GoogleButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#A4B0B2',
    padding: 16,
    marginTop: 30,
    width: '80%',
    height: 60,
    flexDirection: 'row',
  },
  GoogleText: {
    textAlign: 'center',
    color: "#7F8A8C",
  },
  GoogleImage:{
    height: 25,
    width: 25,
    marginRight: 20,
    marginLeft: 10,
  },
  FacebookButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#A4B0B2',
    backgroundColor: '#1877F2',
    padding: 16,
    marginTop: 10,
    width: '80%',
    height: 60,
    flexDirection: 'row',
  },
  FacebookText: {
    textAlign: 'center',
    color: "white",
  },
  FacebookImage:{
    height: 25,
    width: 25,
    marginRight: 20,
    marginLeft: 10,
  },
  Signup: {
    marginTop: 30,
    flexDirection: 'row',
  },
  text2: {
    fontSize: 15,
    fontWeight: '300',
  },
  boldText: {
    fontSize: 15,
    fontWeight: 'bold',
    bottom: 0.5,
  },
});

export default Login;
