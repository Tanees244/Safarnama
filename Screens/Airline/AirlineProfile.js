import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../Homescreen';

const AirlineProfile = () => {
    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.8;
    const navigation = useNavigation();

    const ProfileNavigate = () => {
        navigation.navigate('AirlineDashboard');
    }

    const handleHome = () => {
        navigation.navigate("HomeScreen");
    }

    return (
        <View style={styles.Container}>
            <TouchableOpacity
            onPress={ProfileNavigate}
            style={styles.ProfileButton}
             >
            <Image source={require('../../assets/Home.png')} style = {[{width: 40, height: 40}]}/>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.rectangle}>
                    <Text style={styles.text}>
                        Profile
                    </Text>
                </View>

                <View style={[styles.profileContainer, { width: containerWidth }]}>
                    <Image
                        style={styles.userIcon}
                        resizeMode='cover'
                        source={require("../../assets/serene.png")} 
                    />
                    <View style={styles.buttonsContainer}>
                            <Text style={styles.Name}>Serene Airlines</Text>
                            <Text style={styles.Id}>ID : #071B26</Text>
                    </View>      
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleHome} activeOpacity={0.5}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins-Bold' }}>
                                LOGOUT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.bio}>About</Text>

                <View style={[styles.textBox, { width: containerWidth }]}>
                    <Text style={{ color: 'white', fontFamily: 'Poppins-Regular' }}>
                        My name is Tanees Shakeel. I live in Karachi, Pakistan. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
      },
    Container: {
        backgroundColor: '#20262E',
        flex: 1,
    }, 
    ProfileButton:{
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 90,
        height: 90,
        padding: 15,
        borderRadius: 35,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'white',
        elevation: 1,
        zIndex: 2,
    },
    text: {
        fontSize: 40,
        color: 'white',
        fontFamily: 'Poppins-Bold',
        marginTop: 100,
    },
    profileContainer: {
        backgroundColor: '#BCCADF',
        borderRadius: 28,
        alignItems: 'center',
        padding: 25,
        marginTop: 180,
        flexDirection: 'column',
    },
    userIcon: {
        width: 90,
        height: 90,
    },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        padding: 20,
    },
    Name:{
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
    },
    Id: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
    },
    textBox: {
        borderRadius: 25,
        padding: 20,
        textAlign: 'center',
    },
    bio: {
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        marginTop: 30,
        fontSize: 25,
    },
    rectangle: {
        backgroundColor: '#4F515A',
        borderRadius: 40,
        height: 320,
        top: -20,
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#213555',
        height: 60,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 160,
    },
});

export default AirlineProfile;
