//done
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import React from 'react';



const HotelProfile = () => {
    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.8;
    const buttonWidth = containerWidth * 0.5;
    const inputBoxWidth = containerWidth - 40; // Subtract padding
    const navigation = useNavigation();
   

    const navigateToHotelProfile = () => {
        navigation.navigate('HotelProfile');
      };
    
      const navigateToHotelOperation = () => {
        navigation.navigate('HotelOperations');
      };

    return (
        <ScrollView contentContainerStyle={styles.Container} >
            <View style={styles.Rectangle}>
                <Text style={styles.Text}>
                    My <Text style={[styles.Text, { color: 'white' }]}> Account</Text>
                </Text>

            </View>
            <View style={[styles.ProfileContainer, { width: containerWidth }]}>
                <Image
                    style={styles.UserIcon}
                    contentFit="cover"
                    source={require("../../assets/USER.png")} />

                <View style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text>
                        Hotel's Name
                    </Text>
                </View>
                <View style={[styles.Buttons, { width: buttonWidth }]}>
                    <Text>
                        Hotel ID
                    </Text>
                </View>
                <Text style={styles.bio}>BIO</Text>
                <View style={[styles.textBox, {width: inputBoxWidth}]}>
                    <Text>
                    We are hotel vendor based on northern pakistan 
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
            <View style={styles.ButtonContainer1}>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToHotelOperation}>
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/Home.png")} />
                    <Text style={styles.home}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToHotelProfile}>
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
    Text: {
        fontSize: 40,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 100,
        right: 30,
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
        backgroundColor: '#A5A2D8',
        borderRadius: 46,
        height: 320,
        top: -10,
        width: '100%',
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
      
    },

    ProfileContainer: {
        backgroundColor: '#BCCADF',
        borderRadius: 28,
        marginTop: 200,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
        height: 460,
    },
    Buttons: {
        backgroundColor: '#D9D9D9',
        height: 35,
        left: 40,
        borderRadius: 30,
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

    ButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
});

export default HotelProfile;


