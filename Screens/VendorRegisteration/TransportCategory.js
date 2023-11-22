import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Vector } from '../../assets';
import * as Animatable from "react-native-animatable";

const TransportCategory = () => {  
  const navigation = useNavigation();

  const navigateToAirline = () => {
    navigation.navigate('Register'); // Make sure to use the correct route name
  };

  const navigateToBus = () => {
    navigation.navigate('Register'); // Make sure to use the correct route name
  };

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.27;
  const cardButtonWidth = cardWidth + 20; // Adding margin for the button

  return (
    <Animatable.View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={require("../../assets/background.jpg")} >
        <View style={styles.Textcontainer}>
          <Image style={styles.vector} source={Vector} />
          <Text style={styles.text}>Safarnama</Text>
        </View>
        <View style={styles.CategoryContainer}>
          <View style={[styles.card, { width: cardWidth }]}>
            <Image style={styles.cardImage} source={require("../../assets/vendor1.png")} />
            <TouchableOpacity style={[styles.cardButton, { width: cardButtonWidth }]} onPress={navigateToAirline}>
              <Text style={[styles.buttonText, { fontFamily: 'Poppins-SemiBold' }]}>Airline</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, { width: cardWidth }]}>
            <Image style={styles.cardImage} source={require("../../assets/vendor3.png")} />
            <TouchableOpacity style={[styles.cardButton, { width: cardButtonWidth }]} onPress={navigateToBus}>
              <Text style={[styles.buttonText, { fontFamily: 'Poppins-SemiBold' }]}>Bus</Text>
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
    top: Dimensions.get('window').height * 0.2, // Approximately 20% of screen height
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
    marginTop: Dimensions.get('window').height * 0.35, // Approximately 30% of screen height
  },
  card: {
    backgroundColor: '#D9D9D9',
    borderRadius: 60,
    height: Dimensions.get('window').width * 0.27, // Approximately 27% of screen width
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  cardImage: {
    width: Dimensions.get('window').width * 0.13, // Approximately 13% of screen width
    height: Dimensions.get('window').width * 0.13,
    top: Dimensions.get('window').width * 0.3, // Half the card's height
  },
  cardButton: {
    backgroundColor: '#071B26',
    height: 60,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').width * 0.4, // Approximately 9.75% of screen width
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default TransportCategory;
