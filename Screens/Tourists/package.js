import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const packageData = [
    {
        id: "7",
        image: require("../../assets/Naran1.png"),
    },
    {
        id: "8",
        image: require("../../assets/Naran2.png"),
    },
    {
        id: "9",
        image: require("../../assets/Naran3.png"),
    },
    {
        id: "10",
        image: require("../../assets/Naran4.png"),
    },
];

const Packages = () => {
    const [apiPackageData, setApiPackageData] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://192.168.100.12:8000/api/routes/packages/");
            setApiPackageData(response.data);
            setFilteredPackages(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const filterPackages = (preference) => {
        const filtered = apiPackageData.filter(packageItem => packageItem.preferences === preference);
        setFilteredPackages(filtered);
    };

    const handleDiscoverPress = () => {
        navigation.navigate("Discover");
    };

    const handleBookNowPress = async (packageItem) => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            console.log(token);
    
            if (!token) {
                console.log("Token not found. Redirecting to login...");
                Alert.alert(
                    "Sign In Required",
                    "Please sign in to book the package.",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                        },
                        { text: "Sign In", onPress: () => navigation.navigate("Login") },
                    ],
                    { cancelable: false }
                );
                return; // Exit the function if token is not found
            }
    
            // Make the API call to book the package using the package ID
            const response = await axios.get(
                `http://192.168.100.12:8000/api/routes/booked-packages?packageId=${packageItem}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            console.log("Package booked successfully:", response.data);
            // Handle success response as needed
        } catch (error) {
            console.error("Error booking package:", error);
            // Handle error or set an appropriate state
        }
    };
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const formattedDate = `${day}${getDaySuffix(day)} ${month} ${year}`;
        return formattedDate;
    };

    const getDaySuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    // Sort the filtered packages based on rating in descending order
    const topRatedPackages = filteredPackages.slice().sort((a, b) => b.rating - a.rating);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Safarnama</Text>
            </View>
            <TouchableOpacity
                style={styles.homeButton}
                onPress={handleDiscoverPress}
                activeOpacity={0.5}
            >
                <Image source={require("../../assets/Home.png")} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.preferenceBar}>
                <TouchableOpacity onPress={() => filterPackages('Solo')}>
                    <Text style={[styles.preferenceText, { color: 'white' }]}>Solo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => filterPackages('Family')}>
                    <Text style={[styles.preferenceText, { color: 'white' }]}>Family</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => filterPackages('Friends')}>
                    <Text style={[styles.preferenceText, { color: 'white' }]}>Friends</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {topRatedPackages.map((packageItem) => {
                    const randomIndex = Math.floor(Math.random() * packageData.length);
                    const randomPackageData = packageData[randomIndex];
                    return (
                        <ImageBackground
                            key={packageItem.package_id}
                            source={randomPackageData ? randomPackageData.image : null}
                            style={styles.packageItemBackground}
                            imageStyle={styles.imageStyle}
                        >
                            <View style={styles.packageItem}>
                                <View style={styles.textContainer}>
                                    <View style={styles.rightText}>
                                        <Image
                                            source={require("../../assets/star.png")}
                                            style={styles.icon}
                                        />
                                        <Text style={{ color: "white" }}>
                                            {packageItem.rating}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.packageDestination}>
                                    Destination: {packageItem.destination}
                                </Text>
                                <View style={styles.Time}>
                                    <View style={styles.dates}>
                                        <Text style={styles.packageDates}>
                                            Start: {formatDate(packageItem.start_date)}
                                        </Text>
                                    </View>
                                    <View style={styles.dates}>
                                        <Text style={styles.packageDates}>
                                            End: {formatDate(packageItem.end_date)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.packageInfo}>
                                    <Text style={styles.packagePrice}>
                                        {packageItem.preferences}
                                    </Text>
                                    <Text style={styles.packagePrice}>
                                        Price: {parseFloat(packageItem.price)} pkr
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.bookNowButton}
                                    onPress={() => handleBookNowPress(packageItem.package_id)}
                                >
                                    <Text style={styles.bookNowButtonText}>Book Now</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        height: 140,
        backgroundColor: "#032844",
    },
    headerText: {
        fontSize: 30,
        color: "white",
        fontFamily: "Poppins-Bold",
        marginTop: 40,
    },
    homeButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        width: 70,
        height: 70,
        padding: 15,
        borderRadius: 50,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        zIndex: 2,
    },
    scrollView: {
        flexGrow: 1,
    },
    textContainer: {
        flexDirection: "row",
    },
    rightText: {
        width: "65%",
        justifyContent: "center",
        paddingTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    dates: {
        alignItems: "center",
        borderColor: "white",
        borderWidth: 3,
        borderRadius: 25,
        marginRight: 0,
        padding: 10,
        width: 115,
    },
    Time: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 5,
    },
    packageItemBackground: {
        margin: 20,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
    },
    imageStyle: {
        borderRadius: 20,
    },
    packageItem: {
        backgroundColor: "rgba(38, 71, 105, 0.5)",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
    },
    packageDestination: {
        fontFamily: "Poppins-Bold",
        fontSize: 18,
        color: "white",
    },
    packageDates: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        marginTop: 5,
        color: "white",
    },
    packagePrice: {
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        color: "white",
        marginTop: 5,
    },
    bookNowButton: {
        backgroundColor: "#071B26",
        width: 150,
        height: 50,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    bookNowButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Poppins-Bold",
    },
    preferenceBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 10,
    },
    preferenceText: {
        fontSize: 18,
        fontFamily: "Poppins-Bold",
    },
});

export default Packages;
