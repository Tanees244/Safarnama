import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TouristInfo = () => {
    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 1;
    const buttonWidth = containerWidth * 0.5;
    const inputBoxWidth = containerWidth - 40; // Subtract padding

  const navigation = useNavigation();

  const navigateToAdminRegister = () => {
    navigation.navigate('AirlineProfile');
  };

  return (
    <ScrollView contentContainerStyle={styles.Container} >
        <ImageBackground style={styles.Rectangle} source={require("../../assets/5.png")}>
            <Text style={styles.Text}>
                Tourists <Text style={[styles.Text, { color: 'white' }]}>Info</Text>
            </Text>
        </ImageBackground>
        
        <View style={[styles.ProfileContainer, { width: containerWidth }]}>
            <TouchableOpacity style={[styles.textBox, {width: inputBoxWidth}]}>
                <Image
                    style={styles.UserIcon}
                    contentFit="cover"
                    source={require("../../assets/ellipse.png")} 
                />
                <View style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>
                        Package # 1
                    </Text>
                    <Text>
                    Learn More --
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.textBox, {width: inputBoxWidth}]}>
                <Image
                    style={styles.UserIcon}
                    contentFit="cover"
                    source={require("../../assets/ellipse.png")}
                 />

                <View style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>
                        Package # 2
                    </Text>
                    <Text>
                    Learn More --
                    </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.textBox, {width: inputBoxWidth}]}>
                <Image
                    style={styles.UserIcon}
                    contentFit="cover"
                    source={require("../../assets/ellipse.png")} />

                <View style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>
                        Package # 3
                    </Text>
                    <Text>
                        Learn More --
                    </Text>
                </View>
                </TouchableOpacity>
                


            </View>
            <View style={styles.ButtonContainer1}>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToAdminRegister}>
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/camera-indoor-black.png")} />
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
    Text: {
        fontSize: 30,
        color: 'black',
        fontFamily:'Poppins-Bold',
        marginTop: 200,
        right: 50,
    },
    textBox: {
        marginTop: 10,
        backgroundColor:  '#D9D9D9',
        height: 140,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
    },
    homeicon: {
        width: 24,
        height: 24,
        overflow: "hidden",
    },
    bio: {
        color: 'black',
        right: 100,
        marginTop: 30,
        fontSize: 27,
    },

    home: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: "700",
        marginTop: 2,
        textAlign: "center",
        color: 'white',
    },

    UserIcon: {
        top: 20,
        left: 10,
        width: 90,
        height: 90,
        position: "absolute",
    },

    Rectangle: {
        backgroundColor: 'linear-gradient(190deg, rgb(3, 16, 69), rgb(3, 16, 69))',
        borderRadius: 46,
        height: 320,
        top: -10,
        width: '100%',
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
      
    },

    ProfileContainer: {
        backgroundColor: 'white',
        borderRadius: 28,
        marginTop: 280,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
        height: 480,
    },
    Buttons: {
        backgroundColor: 'white',
        height: 90,
        left: 90,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
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
        marginTop: 50,
        width: 160,

    },

});

export default TouristInfo;
