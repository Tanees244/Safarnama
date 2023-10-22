import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native-elements';

const AdminGuide = () => {
    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.8;
    const buttonWidth = containerWidth * 0.8;
    const navigation = useNavigation();

    const navigateToAdminRegister = () => {
        navigation.navigate('AdminRegister');
      };

    const navigateToGuideApplicationRequest = () => {
        navigation.navigate('AdminGuideApplication'); // Replace with your screen name
      };

    const navigateToGuideDetails = () => {
        navigation.navigate('GuideList'); // Replace with your screen name
      };


    return (
        <ScrollView contentContainerStyle={styles.Container} >
            <View style={styles.Rectangle}>
                <Text style={styles.text}>Safarnama</Text>
                <Text style={{ color: 'black', fontSize: 28, fontWeight: '900', top: 10 }}>Welcome Admin!</Text>
            </View>

            <View style={[styles.ButtonContainer, { width: containerWidth }]}>
            
            <View style={styles.Rectangle1} />
            <View style={styles.Rectangle2} />
                
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToGuideApplicationRequest} style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text style={styles.ButtonText}>Guide Application {'\n'}Request</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToGuideDetails} style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text style={styles.ButtonText}>Delete Package</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ButtonContainer1}>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToAdminRegister}>
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/camera-indoor-black.png")}/>
                         <Text style={styles.home}>Home</Text>
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
    
    Rectangle1: {
      backgroundColor: '#d9d9d9',
      borderRadius: 34,
      width: 163,
      height: 400,
      position: 'absolute',
      top: 80,
      left: '0%', 
      zIndex: -1, 
  },
  
  Rectangle2: {
      backgroundColor: '#5bc0f8', 
      borderRadius: 34, 
      height: 280,
      width: 163,
      position: 'absolute',
      top: 200, 
      left: '55%',
      zIndex: -1, 
  },

    text: {
        fontSize: 50,
        fontWeight: '900',
        color: 'white',
        alignItems: 'center',
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
        height: 360,
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
        marginTop: 70,
        width: 120,
    },
   
    ButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        textAlign:'center',
        padding: 10,        
    },
});

export default AdminGuide;


