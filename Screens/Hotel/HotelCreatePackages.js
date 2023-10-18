import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image, ScrollView, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HotelCreatePackages = () => {
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 1;

  const navigation = useNavigation();

  const navigateToHotelProfile = () => {
    navigation.navigate('HotelProfile');
  };

  const navigateToHotelOperations = () => {
    navigation.navigate('HotelOperations');
  };

  const [roomType, setRoomType] = useState('');
  const [roomPrice, setRoomPrice] = useState('');

  const handleAddRoom = () => {
    // Handle adding the room type and price, e.g., send to an API or store in state.
    // You can use the values of `roomType` and `roomPrice`.
  };

  return (
    <ScrollView contentContainerStyle={styles.Container} >
    
    <ImageBackground style={styles.Rectangle} source={require("../../assets/5.png")}>
                <Text style={styles.Text}>
                    Create <Text style={[styles.Text, { color: 'white' }]}> Room Packages</Text>
                </Text>
            </ImageBackground>
            <View style={[styles.ProfileContainer, { width: containerWidth }]}>
                {/* write form here
                 */}


            </View>
            <View style={styles.ButtonContainer1}>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToGuideHome}>
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/camera-indoor-black.png")} />
                    <Text style={styles.home}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToGuideProfile}>
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/account-circle-black.png")} />
                    <Text style={styles.home}>Profile</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 200,
    right: 5,
  },
  rectangle: {
    borderRadius: 46,
    height: 600,
    top: -10,
    width: '100%',
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
  },
  profileContainer: {
    backgroundColor: 'white',
    borderRadius: 28,
    marginTop: 280,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    height: 480,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#213555',
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 50,
    marginTop: 50,
    width: 160,
  },
  homeIcon: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  home: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default HotelCreatePackages;
