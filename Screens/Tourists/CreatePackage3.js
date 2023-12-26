//done
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions,ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CreatePackage3 = () => {
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 1;
  const buttonWidth = containerWidth * 0.45; // 80% of container width
  const inputWidth = containerWidth * 0.6;

  const handleCreatePackage3 = () => {
      navigation.navigate('Option');
    };
  const navigateToHotelsLists = () => {
    navigation.navigate('HotelsLists'); // Replace with your screen name
  };

  const navigateToTransportLists = () => {
    navigation.navigate('TransportLists'); // Replace with your screen name
  };

  const navigateToPlacesLists = () => {
    navigation.navigate('PlaceLists'); // Replace with your screen name
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <ImageBackground style={styles.Rectangle} source={require("../../assets/8.png")}>
        <Text style={styles.Text}>
          Planning<Text style={[styles.Text, { color: 'white' }]}> Your Trip</Text>
        </Text>
      </ImageBackground>
     
     <View style={[styles.ProfileContainer, { width: containerWidth }]}>

        <View style={styles.Roww}>
          <Text style={styles.Heading}>Day 1</Text>
        </View>

        <Text style={styles.SubHeading}>Select Your Hotel and Place</Text>

        <View style={styles.buttonContainer}>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.buttons, { width: buttonWidth }]}
            onPress={navigateToHotelsLists}
          >
            <Text style={styles.buttonText}>Hotel</Text>
          </TouchableOpacity>
            
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.buttons, { width: buttonWidth }]}
            onPress={navigateToPlacesLists}
          >
            <Text style={styles.buttonText}>Places</Text>
          </TouchableOpacity>
            
        </View>

        <View style={styles.Button}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleCreatePackage3}
            style={[styles.buttonText2, { width: inputWidth }]}
            >
            <Text style={styles.TextDesign}>Next</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#071B26',
    flexGrow:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Rectangle: {
    height: 300,
    top: -10,
    width: '100%',
    position: 'absolute',
  },
  Text: {
    fontSize: 30,
    color: 'black',
    marginTop: 150,
    fontFamily: 'Poppins-ExtraBold',
    textAlign:'center',
  },
  SubHeading:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'white',
    marginRight: 10,
    marginVertical: 20,
  },
  Roww: {
    width: '100%',
    alignItems: 'flex-start',
  },
  Heading: {
    fontFamily: 'Poppins-Bold',
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 28,
    color:'white',
  },
  ProfileContainer: {
    backgroundColor: '#071B26',
    borderRadius: 40,
    marginTop: 250,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    flexGrow:1,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  buttons: {
    backgroundColor: 'white',
    height: 100,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  Button:{
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText2: {
      borderRadius: 38,
      backgroundColor: '#54aaec',
      justifyContent: 'center',
      alignItems: 'center',
  },
  TextDesign: {
      fontSize: 20,
      padding: 10,
      color: '#082847',
      fontFamily: 'Poppins-Bold',
  },
});

export default CreatePackage3;
