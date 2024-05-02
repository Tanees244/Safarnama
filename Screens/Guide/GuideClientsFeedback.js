import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const GuideClientsFeeback = () => {
  const screenWidth = Dimensions.get("window").width;

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          console.error("Token not found");
          return;
        }

        const response = await fetch(
          "http://192.168.100.12:8000/api/guideRoutes/guide-packages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPackages(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const navigation = useNavigation();

  const navigateToGuideHome = () => {
    navigation.navigate("GuideHomeScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={styles.ProfileContainer}>
          <Text style={styles.Text}>
            User's{" "}
            <Text style={[styles.Text, { color: "#506266" }]}> Feedback</Text>
          </Text>
          {packages &&
            packages.length > 0 &&
            packages.map((pkg, index) => (
              <View key={index} style={styles.reviewBox}>
                <Text style={styles.detailsHeading}>Details</Text>
                <Text style={styles.details}>Package ID: {pkg.package_id}</Text>
                <Text style={styles.details}>
                  User Rating:{" "}
                  {pkg.user_rating ? pkg.user_rating : "Not Available"}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={navigateToGuideHome}
        style={styles.ProfileButton}
      >
        <Image
          source={require("../../assets/Home.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  Text: {
    fontSize: 26,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginTop: 50,
    right: -10,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    backgroundColor: "#20262E",
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontFamily: "Poppins-Bold",
    marginTop: 40,
  },
  UserIcon: {
    top: 20,
    left: 10,
    width: 90,
    height: 90,
    position: "absolute",
  },
  ProfileContainer: {
    alignItems: "center",
    paddingBottom: 100,
  },
  Text: {
    fontSize: 26,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginTop: 50,
    right: -10,
  },
  reviewBox: {
    marginTop: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    padding: 20,
    width: "80%",
  },
  detailsHeading: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  details: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginBottom: 5,
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
});

export default GuideClientsFeeback;
