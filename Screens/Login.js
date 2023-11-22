  import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import {Svg, Ellipse } from 'react-native-svg';
  import { Vector } from '../assets';
  import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';
  import { FIREBASE_AUTH, auth } from '../firebase';
  import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
  import Category from './Category';
  import AdminDashboard from '../Screens/Admin/AdminRegister'; 
  import { MaterialIcons } from '@expo/vector-icons';

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const navigation = useNavigation();

    const handleRegister = () => {
      navigation.navigate("Category");
    };

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible); // Toggle password visibility state
    };

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // Check if the user's ID is your special admin ID
          if (user.uid === 'I7Qez7HAXhYIADFusuhrMEdJUq63') {
            navigation.navigate(AdminDashboard); // Redirect to the Admin Dashboard
          } else {
            navigation.navigate(Category); // Redirect to the regular Category screen
          }
        }
      });

      return unsubscribe;
    }, []);

    const handleSignIn = async () => {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
      } catch (error) {
        console.error(error);
        alert('Sign in failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    const ResetPassword = () => {
      if (email != null) {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            alert('Password reset mail has been sent successfully!');
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
          });
      } else {
        alert('Enter a valid email');
      }
    };

    return (
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.container}>

        <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
          <Ellipse cx="20%" cy="20%" rx="300" ry="300" fill="#071B26" />
        </Svg>

        <View style={styles.Textcontainer}>
          <Image style={styles.vector} source={Vector}/>
          <Text style={styles.text}>Safarnama</Text>
          <Text style={{color: '#319BD6', fontSize: 16, fontFamily: 'Poppins-SemiBold', top:-15}}>Login To Explore Pakistan</Text>
        
          <View style={styles.ButtonContainer}>

            <View style={styles.InputContainer}>
              <TextInput
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.Input}
                />
              
              <View style={styles.PasswordInputContainer}>
                <TextInput
                  placeholder='Password'
                  value={password}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={!passwordVisible} // Conditionally set secureTextEntry
                  style={styles.PasswordInput}
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.PasswordVisibilityButton}
                  onPress={togglePasswordVisibility}
                >
                  <MaterialIcons
                    name={passwordVisible ? 'visibility' : 'visibility-off'}
                    size={24}
                    color='#A4B0B2'
                  />
                </TouchableOpacity>
              </View>
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
      fontSize: 45,
      fontFamily: 'Poppins-Bold',
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
      fontFamily: 'Poppins-Bold',
    },
    GoogleButton: {
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#A4B0B2',
      padding: 16,
      marginTop: 30,
      width: '90%',
      height: 60,
      flexDirection: 'row',
    },
    GoogleText: {
      textAlign: 'center',
      fontFamily: 'Poppins-SemiBold',
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
      width: '90%',
      height: 60,
      flexDirection: 'row',
    },
    FacebookText: {
      textAlign: 'center',
      fontFamily: 'Poppins-SemiBold',
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
      fontFamily: 'Poppins-Regular',
    },
    boldText: {
      fontSize: 15,
      fontFamily: 'Poppins-SemiBold',
      bottom: 0.5,
    },
    PasswordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    PasswordInput: {
      backgroundColor: '#A4B0B2',
      paddingHorizontal: 15,
      paddingVertical: 16,
      borderRadius: 10,
      marginTop: 10,
      fontFamily: 'Poppins-SemiBold',
      flex: 1, // Fill available space in the row
    },
    PasswordVisibilityButton: {
      padding: 10,
    },
  });

  export default Login;
