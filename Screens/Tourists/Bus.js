import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Bus = () => {

    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.9;
    const RegisterContainer = screenWidth * 1;
    const inputWidth = containerWidth * 0.45;
    const Buttonwidth = containerWidth * 1;


    const navigation = useNavigation();

    const handleCreatePackage3 = () => {
        navigation.navigate('CreatePackage3');
    };

    return (
        <View style={styles.Container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Safarnama</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.RegisterContainer, { width: RegisterContainer }]}>
                    <Text style={styles.Text}> BUSES</Text>
                </View>

                <View style={[styles.ButtonContainer, { width: Buttonwidth }]}>
                    <Image style={styles.calendar} contentFit="cover" source={require('../../assets/Daewoo.png')} />
                    <Text style={styles.Heading}>KHI to ISL</Text>
                   <View style={styles.Roww}>
                   <View style={[{ width: inputWidth }, styles.Input]} >
                                <Text style={styles.DropdownText}>
                                    8500 pkr
                                </Text>
                            </View>
                            <View style={[{ width: inputWidth }, styles.Input]} >
                                <Text style={styles.DropdownText}>
                                    Business
                                </Text>
                            </View>
                   </View>
                </View>

                <View style={[styles.ButtonContainer, { width: Buttonwidth }]}>
                    <Image style={styles.train} contentFit="cover" source={require('../../assets/faisal.png')} />
                    <Text style={styles.Heading}>KHI to ISL</Text>
                   <View style={styles.Roww}>
                   <View style={[{ width: inputWidth }, styles.Input]} >
                                <Text style={styles.DropdownText}>
                                    5000 pkr
                                </Text>
                            </View>
                            <View style={[{ width: inputWidth }, styles.Input]} >
                                <Text style={styles.DropdownText}>
                                    Economy
                                </Text>
                            </View>
                   </View>
                </View>


                <View>
                    <TouchableOpacity activeOpacity={0.5} onPress={handleCreatePackage3}
                        style={[styles.buttonText, { width: inputWidth }]}>
                        <Text style={styles.TextDesign}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

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
        zIndex: -1,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    buttonText: {
        margin: 20,
        flexDirection: 'row',
        borderRadius: 38,
        backgroundColor: '#54aaec',
        justifyContent: 'center',
        alignContent: 'center',
        left: 90,
    },
    TextDesign: {
        fontSize: 24,
        padding: 10,
        color: '#092547',
        fontFamily: 'Poppins-ExtraBold',
    },
    headerText: {
        textAlign: 'center',
        top: 60,
        color: 'white',
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
    },


    RegisterContainer: {
        backgroundColor: '#092547',
        borderTopLeftRadius:50 ,
        borderTopRightRadius:50 ,
        marginTop: 30,
        marginBottom: 10,
        height: 80,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    Text: {
        fontSize: 30,
        color: '#54aaec',
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
    },
    ButtonContainer: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    Heading: {
        fontFamily: 'Poppins-Bold',
        fontSize: 22,
        textAlign: 'center',
    },

    Roww: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 30,
    },

    calendar: {
        margin: 8,
        marginTop: 15,
        left:100,
        bottom:15,
    },

    train: {
        margin: 8,
        marginTop: 15,
        left:25,
        bottom:10,
    },
    Input: {
        backgroundColor: '#092547',
        margin:3,
        borderRadius: 30,
        fontFamily: 'Poppins-Regular',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom:15,
        padding: 7,

    },
    DropdownText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',


    },

});
export default Bus;
