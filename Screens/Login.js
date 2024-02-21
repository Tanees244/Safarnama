import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.82;

  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("Category");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.100.12:8000/api/users/', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.find(user => user.email === email && user.password === password);
        if (user) {
          navigation.navigate("Category");
        } else {
          alert('Sign in failed: Invalid email or password');
        }
      } else {
        alert('Sign in failed: An error occurred.');
      }
    } catch (error) {
      console.error(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground style={styles.backgroundImage} source={require("../assets/p11.jpg")} >
        <View style={styles.contentContainer}>
          <View style={styles.Textcontainer}>
            <Text style={styles.text}>Safarnama</Text>
            <View style={[styles.ButtonContainer, { width: containerWidth }]}>
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
                    secureTextEntry={!passwordVisible}
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
                style={styles.LoginButton}
                onPress={handleSignIn}
                disabled={loading}
              >
                <Text style={styles.LoginText}>{loading ? 'Loading...' : 'Login'}</Text>
              </TouchableOpacity>

              <View style={styles.Signup}>
                <Text style={styles.text2}>Don't have an account</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={handleRegister}
                >
                  <Text style={styles.boldText}> Sign Up!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  Textcontainer: {
    flex: 1,
    top: 140,
    alignItems: 'center',
  },
  text: {
    fontSize: 45,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    elevation: 50,
    shadowColor: 'black',
  },
  ButtonContainer: {
    padding: 20,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
    borderColor: 'white',
    borderWidth: 1,
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
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  PasswordVisibilityButton: {
    padding: 10,
  },
  LoginButton: {
    justifyContent: 'center',
    backgroundColor: '#092547',
    width: '80%',
    height: 56,
    borderRadius: 20,
    marginTop: 25,
    elevation: 5,
  },
  LoginText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  Signup: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  text2: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  boldText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    bottom: 2,
  },
});

export default Login;
