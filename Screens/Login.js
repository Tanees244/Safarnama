  import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, Image,ImageBackground, Dimensions } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import {Svg, Ellipse } from 'react-native-svg';
  import { Vector } from '../assets';
  import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';
  import { FIREBASE_AUTH, auth } from '../firebase';
  import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
  import Category from './Category';
  import AdminDashboard from '../Screens/Admin/AdminRegister'; 
  import { MaterialIcons } from '@expo/vector-icons';
  import * as Animatable from 'react-native-animatable';

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
        <ImageBackground  source={require('../assets/p5.jpg')}
          styles={styles.backgroundImage}>

        <View style={styles.Textcontainer}>
          <Image style={styles.vector} source={Vector}/>
          <Text style={styles.text}>Safarnama</Text>
        
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
                    color='black'
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

            <Animatable.View
              animation={"pulse"}
              easing="ease-in-out"
              iterationCount={"infinite"}
              style={styles.LoginButton}
            >
            <TouchableOpacity
              activeOpacity={0.5} 
              onPress={handleSignIn}
              >
              <Text style={styles.LoginText}>Login</Text>
              </TouchableOpacity>
            </Animatable.View>
           

            <View style={styles.Signup}>
            <Text style={styles.text2}>DONT HAVE AN ACCOUNT</Text>
              <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleRegister}
              >
              <Animatable.Text
              animation={'pulse'}
              easing={'ease-in-out-back'}
              iterationCount={'infinite'}
              >
                <Text style={styles.boldText}> SIGN UP !</Text>
                </Animatable.Text>
              </TouchableOpacity>
          </View>

          </View>
        </View>
        </ImageBackground>
      </View>
      </GestureHandlerRootView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    backgroundEllipse: {
      position: 'absolute',
    },
    backgroundImage: {
    width: Dimensions.get('window').width * 2.5,
    position: 'relative',
  },
    Textcontainer: {
      flex: 1,
      top: 140,
      alignItems: 'center',
    },
    vector:{
      top: 30,
      right: 140,
    },
    text: {
      fontSize: 45,
      fontFamily: 'Poppins-Bold',
      color: 'white',
    },
    ButtonContainer: {
      marginTop: 110,
      width: 338,
      alignItems: 'center',
    },
    InputContainer: {
      width: '100%',
    },
    Input: {
      paddingHorizontal: 15,
      paddingVertical: 16,
      borderRadius: 10,
      marginTop: 10,
      fontFamily: 'Poppins-SemiBold',
      backgroundColor: 'transparent',
      borderColor:'black',
      borderWidth:1,
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
      backgroundColor: '#092547',
      paddingHorizontal: 15,
      paddingVertical: 15,
      width: '80%',
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
      paddingHorizontal: 15,
      paddingVertical: 16,
      borderRadius: 10,
      marginTop: 10,
      fontFamily: 'Poppins-SemiBold',
      flex: 1, // Fill available space in the row
      backgroundColor: 'transparent',
      borderColor:'black',
      borderWidth:1,
    },
    PasswordVisibilityButton: {
      padding: 10,
    },
  });

  export default Login;
