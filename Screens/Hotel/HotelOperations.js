import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native-elements';


const HotelOperation = () => {
    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.8;
    const buttonWidth = containerWidth * 0.8;
    const navigation = useNavigation();

    const navigateToHotelCreatePackage = () => {
      navigation.navigate('HotelCreatePackages'); // Replace with your screen name
    };
    const navigateToHotelProfile = () => {
        navigation.navigate('HotelProfile');
      };

      const navigateToHotelOperations = () => {
        navigation.navigate('HotelOperations');
      };

    const navigateToHotelUpdatePackage = () => {
        navigation.navigate('HotelUpdatePackage'); // Replace with your screen name
      };

    const navigateToHotelViewPackages = () => {
        navigation.navigate('HotelViewPackages'); // Replace with your screen name
      };

    const navigateToHotelDeletePackage = () => {
        navigation.navigate('HotelDeletePackage'); // Replace with your screen name
      };


    return (
        <ScrollView contentContainerStyle={styles.Container} >
            <View style={styles.Rectangle}>
                <Text style={styles.text}>Safarnama</Text>
                <Text style={{ color: 'black', fontSize: 28, fontWeight: '900', top: 10 }}>Welcome Vendor!</Text>

            </View>

            <View style={[styles.ButtonContainer, { width: containerWidth }]}>
                <TouchableOpacity activeOpacity={0.9} onPress={navigateToHotelCreatePackage} style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text style={styles.ButtonText}>Create Rooms</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToHotelUpdatePackage} style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text style={styles.ButtonText}>Update Rooms</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToHotelViewPackages} style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text style={styles.ButtonText}>View Rooms </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToHotelDeletePackage} style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text style={styles.ButtonText}>Delete Rooms</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ButtonContainer1}>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToHotelOperations}>
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/camera-indoor-black.png")}/>
                         <Text style={styles.home}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToHotelProfile} >
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/account-circle-black.png")}/>
                         <Text style={styles.home}>Profile</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'white',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 50,
        fontWeight: '900',
        color: 'white',
    },
    homeicon: {
        width: 24,
        height: 24,
        overflow: "hidden",
      },
      home: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: "700",
        marginTop: 2,
        textAlign: "center",
        color: 'white',
      },
    Rectangle: {
        backgroundColor: '#A5A2D8',
        borderRadius: 46,
        height: 320,
        top: -10,
        width: '100%',
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    ButtonContainer: {
        borderRadius: 33,
        marginTop: 260,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
    },
    Buttons: {
        backgroundColor: '#071B26',
        height: 100,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    ButtonContainer1: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#213555',
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 50,
        marginTop:50,
        width: 160,
        
    },
   
    ButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
});

export default HotelOperation;

