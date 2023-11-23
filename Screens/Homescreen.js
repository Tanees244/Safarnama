import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Vector } from '../assets';
import * as Animatable from "react-native-animatable";
import Login from "./Login";
import Discover from './Tourists/Discover';


const HomeScreen = () => {

  const navigation = useNavigation();

  const handleRegisterPress = () => {
    // Navigate to the registration screen
    navigation.navigate("Category");
  };

  const handleLoginPress = () => {
    // Navigate to the login screen
    navigation.navigate("CreateHotel");
  };

  const handleDiscoverPress = () => {
    // Navigate to the login screen
    navigation.navigate(Discover);
  };

  return(
    <Animatable.View style={styles.container}>
    <ImageBackground style={styles.backgroundImage} source={require('../assets/5.jpg')} >
    <View style={styles.Textcontainer}>

        <Image style={styles.vector} source={Vector}/>
        <Text style={styles.text}>Safarnama</Text>

        <TouchableOpacity
        onPress={handleLoginPress}
        activeOpacity={0.5}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.gap} />

        <TouchableOpacity
        onPress={handleRegisterPress}
        activeOpacity={0.5} 
        style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.horizontalLine1}></View>

        <View style={styles.guest}>
          
          <Text style={styles.Text2}>Continue as</Text>
            <TouchableOpacity
            onPress={handleDiscoverPress}
            activeOpacity={0.5}
            >
              <Text style={styles.boldText}> GUEST</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine2}></View>

    </View>
    </ImageBackground>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Textcontainer: {
    flex: 1,
    top: 180,
    alignItems: 'center',
  },
  vector:{
    top: 20,
    right: 160,
  },
  backgroundImage: {
    flex: 1,
  },
  text: {
    fontSize: 45,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  button: {
    backgroundColor: '#319BD6',
    paddingHorizontal: 15,
    paddingVertical: 16,
    width: '60%',
    top: 250,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor: '#319BD6',
    borderWidth: 3,
  },
  buttonOutlineText: {
    color: '#319BD6',
    fontSize: 16,
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
  },
  guest: {
    marginTop: 280,
    flexDirection: 'row',
  },
  Text2: {
    color: '#339fe0',
    fontFamily: 'Poppins-Black',
    fontSize: 14,
  },
  boldText: {
    fontSize: 14,
    fontFamily: 'Poppins-Black',
    color: '#000000',
  },
  gap:{
    height: 10,
  },
  horizontalLine1: {
    borderBottomColor: '#59788E',
    borderWidth: 1,
    width: 70,
    top: 293,
    right: 118,
  },
  horizontalLine2: {
    borderBottomColor: '#59788E',
    borderWidth: 1,
    width: 70,
    bottom: 18,
    left: 118,
  },
});


export default HomeScreen;