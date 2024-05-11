import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import LoadingScreen from './LoadingScreen';
import { useNavigation, useRoute } from '@react-navigation/native';

const renderItinerary = (text) => {
    const formattedText = text.replace(/\*\*/g, "");
    const dayWiseItinerary = [];
    const lines = formattedText.split("\n");

    let currentDayDetails = [];
    let currentDayTitle = "";

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith("Day") || line.startsWith("Budget") || line.startsWith("Local Food") || line.startsWith("Additional Activities") || line.startsWith("Transportation")) {
            if (currentDayDetails.length > 0) {
                dayWiseItinerary.push({
                    day: currentDayTitle,
                    details: currentDayDetails,
                });
            }

            currentDayTitle = line;
            currentDayDetails = [];
        } else {
            // Replace asterisks with big bold bullet points and remove hash symbols
            const formattedLine = line.replace(/#/g, "").replace(/^\*{3}/, '•').replace(/\*{2}\s*$/, '');



            currentDayDetails.push(
                <Text key={i} style={styles.itinerary}>
                    {formattedLine}
                </Text>
            );
        }
    }

    if (currentDayDetails.length > 0) {
        dayWiseItinerary.push({
            day: currentDayTitle,
            details: currentDayDetails,
        });
    }

    return dayWiseItinerary;
};

const Details = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { itinerary, isLoading } = route.params;

    const ProfileNavigate = () => {
        navigation.navigate("Discover");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Safarnama</Text>
            </View>
            <View style={styles.content}>
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        <FlatList
                            data={renderItinerary(itinerary)}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.dayContainer}>
                                    <Text style={styles.dayTitle}>{item.day}</Text>
                                    <View style={styles.detailsContainer}>{item.details}</View>
                                </View>
                            )}
                        />
                        <TouchableOpacity onPress={ProfileNavigate} style={styles.profileButton}>
                            <Image
                                source={require("../../assets/Home.png")}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4EBFF",
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
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    profileButton: {
        position: "absolute",
        bottom: 20,
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
    dayContainer: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        backgroundColor: "#FFF",
        elevation: 2,
    },
    dayTitle: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: "#333",
        marginBottom: 10,
    },
    itinerary: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: "Poppins-Regular",
    },
    detailsContainer: {
        justifyContent: 'space-evenly',
        marginTop: 5,
        fontFamily:"Poppins-Regular"
    },
});

export default Details;
