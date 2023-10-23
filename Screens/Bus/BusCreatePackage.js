import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BusCreatePackage = () => {
    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 1;
    const buttonWidth = containerWidth * 0.5;
    const inputBoxWidth = containerWidth - 40; // Subtract padding

    const navigation = useNavigation();

    const navigateToBusProfile = () => {
        navigation.navigate('BusProfile');
    };

    const navigateToBusOperations = () => {
        navigation.navigate('BusOperation');
    };

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateChange = (event, date) => {
        hideDatePicker();
        if (date) {
            setSelectedDate(date);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.Container} >
            <ImageBackground style={styles.Rectangle} source={require("../../assets/6.png")}>
                <Text style={styles.Text}>
                    Create <Text style={[styles.Text, { color: 'white' }]}> Packages</Text>
                </Text>
            </ImageBackground>

            <View style={[styles.ProfileContainer, { width: containerWidth }]}>
                <Text>Destination</Text>
                <Text>Origin</Text>

                <View>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text>Open Date Picker</Text>
                    </TouchableOpacity>
                    {isDatePickerVisible && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <Text>Selected Date: {selectedDate.toLocaleDateString()}</Text>
                </View>

                <Text>Return Date</Text>
                <Text>Tour Type</Text>
                <Text>Price PKR</Text>
                <TextInput
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    style={styles.textBox}
                />
                <Text>Discount (%)</Text>
                <TextInput
                    value={discount}
                    onChangeText={(text) => setDiscount(text)}
                    style={styles.textBox}
                />
            </View>

            <View style={styles.ButtonContainer1}>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToBusOperations}>
                    <Image style={styles.homeicon} contentFit="cover" source={require("../../assets/camera-indoor-black.png")} />
                    <Text style={styles.home}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToBusProfile}>
                    <Image style={styles.homeicon} contentFit="cover" source={require("../../assets/account-circle-black.png")} />
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
    Text: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 100,
        right: 15,
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
    home: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: "700",
        marginTop: 2,
        textAlign: "center",
        color: 'white',
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
        marginTop: 200,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
        height: 480,
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

export default BusCreatePackage;
