import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';
import { ScrollView } from 'react-native';


const GuideClientsFeedback = () => {

    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.8;
    const buttonWidth = containerWidth * 0.8;

    return (
        <ScrollView contentContainerStyle={styles.Container} >
            
            <ImageBackground style={styles.Rectangle1} source={require("../../assets/3.jpg")}>
                <Text style={{ color: 'black', fontSize: 28, fontFamily:'Poppins-SemiBold', left: 20, top: 200}}>Clients Feedback</Text>
                <View style={styles.Rectangle}> 
                    <View style={styles.Package}>
                    <Image
                        style={styles.PackageImage}
                        source={require("../../assets/ellipse.png")}
                    />
                        <View style={styles.Textbox}>
                            <Text style={[styles.PackageText, { textAlign: 'center', fontFamily: 'Poppins-SemiBold', }]}>Package 1</Text>
                        </View>
                    </View>
                    <View style={styles.Package}>
                    <Image
                        style={styles.PackageImage}
                        source={require("../../assets/ellipse.png")}
                    />
                        <View style={styles.Textbox}>
                            <Text style={[styles.PackageText, { textAlign: 'center', fontFamily: 'Poppins-SemiBold', }]}>Package 2</Text>
                        </View>
                    </View>
                    <View style={styles.Package}>
                    <Image
                        style={styles.PackageImage}
                        source={require("../../assets/ellipse.png")}
                    />
                        <View style={styles.Textbox}>
                            <Text style={[styles.PackageText, { textAlign: 'center', fontFamily: 'Poppins-SemiBold', }]}>Package 3</Text>
                        </View>
                    </View>
                    <View style={styles.ButtonContainer1}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Image style={styles.homeicon}
                            contentFit="cover"
                            source={require("../../assets/camera-indoor-black.png")}/>
                            <Text style={styles.home}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Image style={styles.homeicon}
                            contentFit="cover"
                            source={require("../../assets/account-circle-black.png")}/>
                            <Text style={styles.home}>Profile</Text>
                    </TouchableOpacity>
                </View>
                </View>  
            </ImageBackground>
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
        fontFamily: 'poppins-bold',
        textAlign: 'center'
    },
    homeicon: {
        width: 24,
        height: 24,
        overflow: "hidden",
        alignItems: 'center'
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
        height: '100%',
        top: 240,
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center',
    },
    Rectangle1: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        flex: 1,
    },
    Package: {
        width: 350,
        height: 170,
        backgroundColor: '#D9D9D9',
        borderRadius: 50,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    PackageImage: {
        width: 120,
        height: 120,
        borderRadius: 50,
        marginLeft: 20,
    },
    Textbox: {
        backgroundColor: 'white',
        left: 10,
        top: 20,
        height: 60,
        width: 180,
        borderRadius: 50,
        justifyContent: 'center',
    },
    PackageText: {
        fontSize: 14,
        color: 'black',
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
        backgroundColor: '#071B26',
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

export default GuideClientsFeedback;
