//done
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GuideBankDetail = () => {
    const [text, setText] = useState('');
    const textInputRef = useRef(null);
    const navigation = useNavigation();

    const handleTextChange = (newText) => {
        setText(newText);
        const totalHeight = (newText.split('\n').length * 25) + 50;

        if (textInputRef.current) {
            textInputRef.current.setNativeProps({
                height: Math.max(55, totalHeight),
            });
        }
    };

    const handleGuideQuestionnaire = () => {
        navigation.navigate('GuideQuestionnaire');
      };

    const screenWidth = Dimensions.get('window').width;
    const inputContainerWidth = screenWidth * 0.9;
    const buttonWidth = screenWidth * 0.4;
    const inputBoxWidth = inputContainerWidth - 40; // Subtract padding

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>
                <Text style={styles.bank}>Bank</Text>
                <Text style={styles.details}> Details</Text>
            </Text>

            <View style={styles.indicator}>
                <View style={styles.pageIndicatorActive} />
                <View style={styles.pageIndicatorActive} />
                <View style={styles.pageIndicatorActive} />
                <View style={styles.pageIndicator} />
            </View>

            <View style={[styles.inputContainer, { width: inputContainerWidth }]}>
                <Text style={styles.inputHeading}>Account Name : </Text>
                <View style={[styles.inputBox, { width: inputBoxWidth }]}>
                    <TextInput
                        ref={textInputRef}
                        multiline={true}
                        style={styles.input}
                        onChangeText={handleTextChange}
                    />
                </View>
            </View>

            <View style={[styles.inputContainer, { width: inputContainerWidth }]}>
                <Text style={styles.inputHeading}>Your IBAN No# :</Text>
                <View style={[styles.inputBox, { width: inputBoxWidth }]}>
                    <TextInput
                        ref={textInputRef}
                        multiline={true}
                        style={styles.input}
                        onChangeText={handleTextChange}
                    />
                </View>
            </View>
            <View>
                <TouchableOpacity activeOpacity={0.5} onPress={handleGuideQuestionnaire}
                    style={[styles.buttonText, { width: buttonWidth }]}>
                    <Text style={styles.TextDesign}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 80,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        right: 60,
      },
      bank: {
        color: 'black', // Change the color to your desired color for "Bank"
      },
      details: {
        color: '#319BD6', // Change the color to your desired color for "Details"
      },
    indicator: {
        flexDirection: 'row',
        marginTop: 20,
    },
    pageIndicator: {
        borderWidth: 1,
        borderRadius: 30,
        width: 80,
        height: 15,
        borderColor: 'black',
        backgroundColor: '#D9D9D9',
        marginHorizontal: 2,
    },
    pageIndicatorActive: {
        borderWidth: 1,
        borderRadius: 30,
        width: 80,
        height: 15,
        borderColor: 'white',
        backgroundColor: '#071B40',
        marginHorizontal: 5,
    },
    inputContainer: {
        marginTop: 30,
        alignItems: 'flex-start',
    },
    inputHeading: {
        fontSize: 20,
    },
    inputBox: {
        marginTop: 10,
        backgroundColor: '#D9D9D9',
        height: 40,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',

    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    buttonText: {
        marginTop: 30,
        flexDirection: 'row',
        borderRadius: 38,
        backgroundColor: '#319BD6',
        justifyContent: 'center',


    },
    TextDesign: {
        fontSize: 20,
        fontWeight: '900',
        padding: 10,
        color: 'white',
    },

});

export default GuideBankDetail;