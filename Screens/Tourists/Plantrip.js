import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    FlatList,
    ImageBackground,
    ScrollView,
    Dimensions,
    TextInput,
    Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { Controller, useForm } from "react-hook-form";
import LoadingScreen from "./LoadingScreen";

const API_KEY = "AIzaSyDtcKlTsY0a2stiqNhoSmHy8PFn1BHBggE";
const MODEL_NAME = "gemini-1.5-pro-latest";


const Plantrip = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigation = useNavigation();

    const [isLoading, SetisLoading] = useState(false);
    const onSubmit = async (data) => {
        SetisLoading(true);

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });

            const generationConfig = {
                temperature: 1,
                topK: 0,
                topP: 0.95,
                maxOutputTokens: 8192,
            };

            const safetySettings = [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ];

            const chat = model.startChat({
                generationConfig,
                safetySettings,
                history: [
                ],
            });

            const prompt = `
            Name: ${data.name}
            Starting place: ${data.startingPlace}
            Destination: ${data.destination}
            Duration: ${data.duration} days
            Budget: ${data.budget} PKR
        
            please provide a day-wise itinerary for visiting the famous and popular places, as well as locally famous places, including why they are famous and what local food to try. Also, recommend hotels, how to reach them, and any cautions to be taken care of. Please note that budget does include flight, train, and hotels. The hotel and flight prices may vary , and the provided information is just an estimate. `;

            const result = await chat.sendMessage(prompt);
            const response = result.response;
            console.log(response.text());
            navigation.navigate('Details', { itinerary: response.text() });

        } catch (error) {
            console.error(error);
        }
        finally {
            SetisLoading(false);
        }
    };

    const ProfileNavigate = () => {
        navigation.navigate("Discover");
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <>
                <View style={styles.header}>
                <Text style={styles.headerText}>Safarnama</Text>
            </View>
            <View style={styles.formcontainer}>
                    <Text style={styles.heading}>
                        AI Travel Itinerary Generator
                    </Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Enter your Name"
                                placeholderTextColor="gray"
                            />
                        )}
                        name="name"
                    />
                    {errors.name && <Text style={styles.error}> Name is required</Text>}

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Enter Starting Place"
                                placeholderTextColor="gray"
                            />
                        )}
                        name="startingPlace"
                    />
                    {errors.name && <Text style={styles.error}> Starting Place is required</Text>}

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Enter Destination"
                                placeholderTextColor="gray"
                            />
                        )}
                        name="destination"
                    />
                    {errors.name && <Text style={styles.error}> Destination is required</Text>}
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Enter Duration in Days"
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                            />
                        )}
                        name="duration"
                    />
                    {errors.name && <Text style={styles.error}> Duration is required</Text>}
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Enter Budget in PKR"
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                                
                            />
                        )}
                        name="budget"
                    />
                    {errors.name && <Text style={styles.error}> Budget must be a valid number</Text>}

                    <TouchableOpacity onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Generate Itinerary
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ProfileNavigate} style={styles.profileButton}>
                            <Image
                                source={require("../../assets/Home.png")}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>
                    </View>
                </>
                
            )}
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4EBFF",
    },
    formcontainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontFamily: 'Poppins-Bold',
        marginBottom: 30,
        marginTop:50,
        color: 'black',
        fontSize: 20,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        height: 120,
        backgroundColor: "#032844",
    },
    headerText: {
        fontSize: 30,
        color: "#FFF",
        fontFamily: "Poppins-Bold",
        marginTop: 40,
    },
    input: {
        height: 50,
        width: '80%',
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 7,
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 15,
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    profileButton: {
        position: "absolute",
        bottom: -100,
        left: 20,
        zIndex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "white",
        borderRadius: 35,
        width: 75,
        height: 75,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#071B26',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
    },
});

export default Plantrip;
