import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';

const Hotel = () => {

    const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1 }}>
        <Animatable.View style={styles.ImageContainer}>
            <ImageBackground style={styles.backgroundImage} source={require('../assets/HotelBackground.png')}>
                <View style={styles.ContentContainer}></View>   
            </ImageBackground>
        </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    ImageContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        height: 500,
    },
    ContentContainer: {
        flex: 1,
        backgroundColor: 'white', 
        top: 200,
        height: 200,
        borderRadius: 25, // Adjust as needed
      },
});

export default Hotel;
