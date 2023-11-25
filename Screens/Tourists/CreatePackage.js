import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions, Pressable, Platform } from 'react-native';
import Dropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';


const CreatePackage = () => {

    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.9;
    const RegisterContainer = containerWidth * 0.7;
    const inputWidth = containerWidth * 0.6;
    const RWidth = containerWidth * 0.9;

    const cities = ['Balakot', 'Naran', 'Kaghan', 'Gilgit Baltistan', 'Kashmir', 'Muzaffarabad'];
    const preference = ['Going Solo', 'Partner', 'Friends', 'Family']

    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [dateSelect1, setdateSelect1] = useState('');
    const [dateSelect2, setdateSelect2] = useState('');
    const [destination, setDestination] = useState(null);
    const [adultPreference, setAdultPreference] = useState(null);
    const [numberOfIndividuals, setNumberOfIndividuals] = useState('');


    const toggleDatepicker1 = () => {
        setShowPicker1(!showPicker1)
    };
    const toggleDatepicker2 = () => {
        setShowPicker2(!showPicker2)
    };


    const onChange1 = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatepicker1();
                setdateSelect1(currentDate.toDateString());
            }
        }
        else {
            toggleDatepicker1();
        }
    };
    const onChange2 = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatepicker2();
                setdateSelect2(currentDate.toDateString());
            }
        }
        else {
            toggleDatepicker2();
        }
    };

    const saveDataToState = () => {
        setDestination(destination);
        setdateSelect1(dateSelect1);
        setdateSelect2(dateSelect2);
        setAdultPreference(adultPreference);
        setNumberOfIndividuals(numberOfIndividuals);
        if (!destination || !dateSelect1 || !dateSelect2 || !adultPreference || !numberOfIndividuals) {
            // If any of the fields is empty, show an alert or take appropriate action
            alert('Please fill in all fields before proceeding.');
            return;
        }

        navigation.navigate('CreatePackage2');
    };

    return (
        <View style={styles.Container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Safarnama</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.RegisterContainer, { width: RegisterContainer }]}>
                    <Text style={styles.Text}>
                        Create Your <Text style={[styles.Text, { color: 'white' }]}>Package</Text>
                    </Text>
                </View>

                <View style={styles.ButtonContainer}>
                    <Text style={styles.Heading}>Where Do You Want To Go?</Text>
                    <View style={[{ width: RWidth }, styles.Roww]}>
                        <View style={[{ width: inputWidth }, styles.Input]}>
                            <Dropdown
                                options={cities}
                                defaultValue="Select Destination"
                                style={styles.DropdownText}
                                textStyle={{ fontSize: 15, color: 'white' }}
                                dropdownStyle={styles.DropdownContainer}
                                onSelect={(index, value) => setDestination(value)}
                                dropdownTextStyle={styles.CustomDropdownText}
                                dropdownPosition={0}
                                dropdownOffset={{ top: 0, left: 10 }}
                            />
                        </View>
                        <Image style={styles.calendar} contentFit="cover" source={require('../../assets/locationlogo.png')} />
                    </View>

                    <Text style={styles.Heading}>When do you want to go?</Text>
                    <Text style={{ color: 'red', fontSize: 12, textAlign: 'center', }}>*Choose a date range up to 7 days</Text>

                    <View style={[{ width: RWidth }, styles.Roww]}>
                        <View style={[{ width: inputWidth }, styles.Input]}>
                            {showPicker1 && (
                                <DateTimePicker mode='date'
                                    display='spinner'
                                    value={date}
                                    onChange={onChange1}
                                />
                            )}
                            {!showPicker1 && (
                                <Pressable onPress={toggleDatepicker1}>
                                    <TextInput style={styles.DropdownText}
                                        placeholder='Start Date      >'
                                        placeholderTextColor={'white'}
                                        value={dateSelect1}
                                        onChangeText={setdateSelect1}
                                        editable={false}
                                    />
                                </Pressable>
                            )}
                        </View>
                        <Image style={styles.calendar} contentFit="cover" source={require('../../assets/calendar.png')} />
                    </View>

                    <View style={[{ width: RWidth }, styles.Roww]}>
                        <View style={[{ width: inputWidth }, styles.Input]}>
                            {showPicker2 && (
                                <DateTimePicker mode='date'
                                    display='spinner'
                                    value={date}
                                    onChange={onChange2}
                                />
                            )}
                            {!showPicker2 && (
                                <Pressable onPress={toggleDatepicker2}>
                                    <TextInput style={styles.DropdownText}
                                        placeholder='End Date      >'
                                        placeholderTextColor={'white'}
                                        value={dateSelect2}
                                        onChangeText={setdateSelect2}
                                        editable={false}
                                    />
                                </Pressable>
                            )}
                        </View>
                        <Image style={styles.calendar} source={require('../../assets/calendar.png')} />
                    </View>

                    <Text style={styles.Heading}>Preferences: </Text>
                    <View style={styles.Input}>
                        <Dropdown
                            options={preference}
                            defaultValue="Select Preference                          >"
                            textStyle={styles.DropdownText}
                            dropdownStyle={styles.DropdownContainer}
                            onSelect={(index, value) => setAdultPreference(value)}
                            dropdownTextStyle={styles.CustomDropdownText}
                            dropdownPosition={0}
                            dropdownOffset={{ top: 0, left: 10 }}
                        />

                    </View>
                    <Text style={styles.Heading}>Number of Individual: </Text>

                    <View style={styles.Input}>
                        <TextInput
                            placeholder='Enter No. of Individual...'
                            placeholderTextColor={'white'}
                            style={{color:'white',textAlign:'center'}}
                            keyboardType="numeric"
                            onChangeText={setNumberOfIndividuals}>
                            
                        </TextInput>
                    </View>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.5} onPress={saveDataToState}
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
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    buttonText: {
        margin: 10,
        flexDirection: 'row',
        borderRadius: 38,
        backgroundColor: '#54aaec',
        justifyContent: 'center',
        alignContent: 'center',
        left: 75,
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
    HeadingContainer: {
        backgroundColor: '#0a78cd',
        marginHorizontal: 10,
        borderRadius: 20,
        paddingVertical: 15,
        marginTop: -60,
        marginLeft: 130,
        elevation: 10,
        shadowColor: 'black',
        zIndex: 3,
    },

    RegisterContainer: {
        backgroundColor: '#092547',
        marginHorizontal: 10,
        borderRadius: 50,
        paddingVertical: 20,
        marginTop: 30,
        marginBottom: 10,
        zIndex: 2,
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
    },
    Text: {
        fontSize: 40,
        color: '#54aaec',
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
    },
    ButtonContainer: {
        marginTop: 20,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    Heading: {
        fontFamily: 'Poppins-SemiBold',
        marginTop: 20,
        marginBottom: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    SubHeading: {
        fontFamily: 'Poppins-Medium',
        paddingVertical: 10,
        paddingLeft: 10,
    },

    Roww: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#092547',
        borderRadius: 30,
    },

    calendar: {
        margin: 8,
        marginTop: 15,
    },

    Input: {
        backgroundColor: '#092547',
        paddingHorizontal: 15,
        borderRadius: 30,
        fontFamily: 'Poppins-Regular',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,

    },
    DropdownText: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'Poppins-Regular',
        paddingVertical: 10,


    },
    DropdownContainer: {
        backgroundColor: '#b6daf7',
        borderRadius: 15,
        width: 320,

    },
    CustomDropdownText: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        paddingLeft: 10,
        color: 'black',
    },
});

export default CreatePackage;
