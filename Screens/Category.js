import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Vector } from '../assets';
import * as Animatable from "react-native-animatable";

const Category = () => {  
  const navigation = useNavigation();

  const navigateToTourist = () => {
    navigation.navigate('Discover'); // Make sure to use the correct route name
  };

  const navigateToGuide = () => {
    navigation.navigate('GuideHome'); // Make sure to use the correct route name
  };

  const navigateToVendor = () => {
    navigation.navigate('VendorCategory'); // Make sure to use the correct route name
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
            <Image style={styles.cardImage} source={require("../assets/Card1.png")} />
            <TouchableOpacity style={styles.cardButton} onPress={navigateToTourist}>
            <Text style={[styles.buttonText, {fontFamily: 'Poppins-SemiBold'}]}>Tourist</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Image style={styles.cardImage} source={require("../assets/Card2.png")} />
            <TouchableOpacity style={styles.cardButton} onPress={navigateToGuide}>
            <Text style={[styles.buttonText, {fontFamily: 'Poppins-SemiBold'}]}>Guide</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Image style={styles.cardImage} source={require("../assets/Card3.png")} />
            <TouchableOpacity style={styles.cardButton} onPress={navigateToVendor}>
            <Text style={[styles.buttonText, {fontFamily: 'Poppins-SemiBold'}]}>Vendor</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 400,
  },
  card: {
    backgroundColor: '#D9D9D9',
    borderRadius: 60,
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardImage: {
    width: 50,
    height: 50,
    top: 25,
  },
  cardButton: {
    backgroundColor: '#071B26',
    width: 115,
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
