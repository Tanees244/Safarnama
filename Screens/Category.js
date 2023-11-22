import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Vector } from '../assets';
import * as Animatable from "react-native-animatable";

const Category = () => {  
  const navigation = useNavigation();

  const navigateToTourist = () => {
    navigation.navigate('TouristRegister'); // Make sure to use the correct route name
  };

  const navigateToGuide = () => {
    navigation.navigate('GuideRegister'); // Make sure to use the correct route name
  };

  const navigateToVendor = () => {
    navigation.navigate('VendorCategory'); // Make sure to use the correct route name
  };

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.25; // Approximately 27% of screen width
  const cardButtonWidth = cardWidth + 5; // Adding some margin

  return (
    <Animatable.View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={require("../assets/background.jpg")} >
        <View style={styles.Textcontainer}>
          <Image style={styles.vector} source={Vector} />
          <Text style={styles.text}>Safarnama</Text>
        </View>
        <View style={styles.CategoryContainer}>
          <View style={[styles.card, { width: cardWidth }]}>
            <Image style={styles.cardImage} source={require("../assets/Card1.png")} />
            <TouchableOpacity style={[styles.cardButton, { width: cardButtonWidth }]} onPress={navigateToTourist}>
              <Text style={[styles.buttonText, { fontFamily: 'Poppins-SemiBold' }]}>Tourist</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, { width: cardWidth }]}>
            <Image style={styles.cardImage} source={require("../assets/Card2.png")} />
            <TouchableOpacity style={[styles.cardButton, { width: cardButtonWidth }]} onPress={navigateToGuide}>
              <Text style={[styles.buttonText, { fontFamily: 'Poppins-SemiBold' }]}>Guide</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, { width: cardWidth }]}>
            <Image style={styles.cardImage} source={require("../assets/Card3.png")} />
            <TouchableOpacity style={[styles.cardButton, { width: cardButtonWidth }]} onPress={navigateToVendor}>
              <Text style={[styles.buttonText, { fontFamily: 'Poppins-SemiBold' }]}>Vendor</Text>
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
    top: Dimensions.get('window').height * 0.25, // Approximately 25% of screen height
    alignItems: 'center',
  },
  vector: {
    top: 20,
    right: Dimensions.get('window').width * 0.35, // Approximately 30% of screen width
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
    marginTop: Dimensions.get('window').height * 0.45, // Approximately 35% of screen height
  },
  card: {
    backgroundColor: '#D9D9D9',
    borderRadius: 60,
    height: Dimensions.get('window').width * 0.27, // Approximately 27% of screen width
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardImage: {
    width: Dimensions.get('window').width * 0.13, // Approximately 13% of screen width
    height: Dimensions.get('window').width * 0.13,
    top: Dimensions.get('window').width * 0.065, // Half the card's height
  },
  cardButton: {
    backgroundColor: '#071B26',
    height: 60,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    top: Dimensions.get('window').width * 0.195, // Positioning from the top of the card
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default Category;
