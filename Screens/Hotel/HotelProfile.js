import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../Login";
import { withTheme } from "react-native-elements";

const HotelProfile = () => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.8;
  const navigation = useNavigation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("authToken")
      .then((token) => {
        console.log("Token retrieved from AsyncStorage:", token);
        if (token) {
          fetchUserProfile(token);
        } else {
          console.log("Token not found. Redirecting to login...");
          Alert.alert(
            "Sign In Required",
            "Please sign in to view your profile.",
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
        }
      })
      .catch((error) => {
        console.error("Error retrieving token:", error);
      });
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      console.log("Bearer token:", token);

      const response = await fetch(
        "http://192.168.100.12:8000/api/VendorsRoutes/hotel-vendor-details/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error("Failed to fetch user profile", response.status);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const ProfileNavigate = () => {
    navigation.navigate("HotelDashboard");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.navigate(Login);
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={ProfileNavigate} style={styles.ProfileButton}>
        <Image
          
          source={require("../../assets/Home.png")}
          style={[{ width: 40, height: 40 }]}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.rectangle}>
          <Text style={styles.text}>Hotel Profile</Text>
        </View>

        <View style={[styles.profileContainer, { width: containerWidth }]}>
          <Image
            style={styles.userIcon}
            source={{ uri: `data:image/jpeg;base64,${user?.picture}` }}
          />
          <View style={styles.buttonsContainer}>
            <Text style={styles.Name}>{user?.name}</Text>
            <Text style={styles.Id}>Hotel Vendor ID : {user?.hotel_vendor_personal_id}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogout} activeOpacity={0.5}>
              <Text style={{ color: "white", fontFamily: "Poppins-Bold" }}>
                LOGOUT
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        

        <View style={[styles.textBox, { width: containerWidth }]}>
        <Text style={styles.bio}>Email </Text>
          <Text style={styles.details}> {user?.email}</Text>
          <Text style={styles.bio}>Contact Number </Text>
          <Text style={styles.details}> {user?.contact_number}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  Container: {
    backgroundColor: "#20262E",
    flex: 1,
  },
  ProfileButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 75,
    height: 75,
    padding: 15,
    borderRadius: 35,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "white",
    elevation: 0,
    zIndex: 2,
  },
  text: {
    fontSize: 40,
    color: "white",
    fontFamily: "Poppins-Bold",
    marginTop: 100,
  },
  profileContainer: {
    backgroundColor: "#BCCADF",
    borderRadius: 28,
    alignItems: "center",
    padding: 25,
    marginTop: 180,
    flexDirection: "column",
  },
  userIcon: {
    width: 240,
    height: 130,
    borderRadius: 40,
    resizeMode:'contain',
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
  },
  Name: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    textAlign:'center',
  },
  Id: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  details: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: 'white',
    textAlign:'center',
  },
  textBox: {
    borderRadius: 25,
    padding: 20,
    textAlign: "center",
    marginBottom: 100,
  },
  bio: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginTop: 30,
    fontSize: 25,
    textAlign:'center',
  },
  rectangle: {
    backgroundColor: "#4F515A",
    borderRadius: 40,
    height: 320,
    top: -20,
    width: "100%",
    position: "absolute",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#213555",
    height: 60,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 160,
  },
});

export default HotelProfile;
