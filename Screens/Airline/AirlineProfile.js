import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import React from 'react';



const AirlineProfile = () => {

    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.8;
    const AccountContainer = containerWidth * 0.9;
    const buttonWidth = containerWidth * 0.5;
    const inputBoxWidth = containerWidth - 40; // Subtract padding
    const navigation = useNavigation();
   

    const navigateToAirlineProfile = () => {
        navigation.navigate('AirlineProfile');
      };
    
      const navigateToAirlineOperation = () => {
        navigation.navigate('AirlineOperation');
      };

    return (
        <View style={styles.Container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Safarnama</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container} >
                <View style={[styles.AccountContainer, { width: AccountContainer }]}>
                    <Text style={styles.Text}>
                        My <Text style={[styles.Text, { color: 'white' }]}>Account</Text>
                    </Text>
                </View>
                <View style={[styles.ProfileContainer, { width: containerWidth }]}>
                    <Image
                        style={styles.UserIcon}
                        contentFit="cover"
                        source={require("../../assets/USER.png")} 
                    />
                    <View style={[styles.Buttons, { width: buttonWidth }]}>
                        <Text>
                            Airline's Name
                        </Text>
                    </View>
                    <View style={[styles.Buttons, { width: buttonWidth }]}>
                        <Text>
                            Airline ID
                        </Text>
                    </View>
                    <Text style={styles.bio}>BIO</Text>
                    <View style={[styles.textBox, {width: inputBoxWidth}]}>
                        <Text>
                        We are ABC Airline provide you leisure and safe time in air, pakistan. lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum 
                        </Text>
                    </View>
                    <View style={styles.ButtonContainer1}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={{color:'white', fontWeight:'bold'}}>
                                LOGOUT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    Container: {
        backgroundColor: '#cee7fa',
        flex: 1,
    },
    header: {
        height: 140,
        backgroundColor: '#032844',
        shadowColor: 'black',
        elevation: 20,
        zIndex: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerText: {
        textAlign: 'center',
        top: 60,
        color: 'white',
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
    },
    AccountContainer: {
        backgroundColor: '#54aaec',
        marginHorizontal: 10,
        borderRadius: 20,
        paddingVertical: 20,
        marginTop: 30,
        marginBottom: 10,
        zIndex: 2,
        justifyContent: 'center',
    },
    Text: {
        fontSize: 32,
        color: 'black',
        fontFamily: 'Poppins-Bold',
        paddingLeft: 15,
      },
    text: {
        fontSize: 50,
        fontWeight: '900',
        color: 'white',
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
    ProfileContainer: {
        backgroundColor: '#BCCADF',
        borderRadius: 28,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
        marginTop: 20,
    },
});

export default AirlineProfile;


