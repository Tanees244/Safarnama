import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Vector } from '../assets';
import * as Animatable from "react-native-animatable";

const Category = () => {  
  const navigation = useNavigation();

  const navigateToTransport = () => {
    navigation.navigate('TransportCategory'); // Make sure to use the correct route name
  };

  const navigateToHotel = () => {
    navigation.navigate('HotelRegister'); // Make sure to use the correct route name
  };

  return (
    <Animatable.View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={require("../assets/background.jpg")} >
        <View style={styles.Textcontainer}>
          <Image style={styles.vector} source={Vector} />
          <Text style={styles.text}>Safarnama</Text>
        </View>
        <View style={styles.CategoryContainer}>
          <View style={styles.card}>
            <Image style={styles.cardImage} source={require("../assets/vendor1.png")} />
            <TouchableOpacity style={styles.cardButton} onPress={navigateToTransport}>
              <Text style={[styles.buttonText, { fontFamily: 'Poppins-SemiBold' }]}>Transport</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Image style={styles.cardImage} source={require("../assets/vendor2.png")} />
            <TouchableOpacity style={styles.cardButton} onPress={navigateToHotel}>
              <Text style={[styles.buttonText, { fontFamily: 'Poppins-SemiBold' }]}>Hotel</Text>
            </TouchableOpacity>
          </View>
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
    top: 180,
    alignItems: 'center',
  },
  vector: {
    top: 20,
    right: 150,
  },
  backgroundImage: {
    flex: 1,
  },
  text: {
    fontSize: 50,
    fontWeight: '900',
    color: 'white',
  },
  CategoryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#D9D9D9',
    borderRadius: 60,
    width: 110,
    height: 110, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  cardImage: {
    width: 50,
    height: 50,
    top: 30,
  },
  cardButton: {
    backgroundColor: '#071B26',
    width: 150,
    height: 60,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    top: 80, 
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default Category;
