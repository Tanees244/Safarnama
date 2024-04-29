import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  Modal,
} from "react-native";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const GuideCurrentPackage = () => {
  const [packages, setPackages] = useState([]);
  const [ongoingPackages, setOngoingPackages] = useState([]);
  const [completedPackages, setCompletedPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGuidePackages = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          console.error("Token not found");
          return;
        }

        const response = await fetch(
          "http://192.168.100.18:8000/api/guideRoutes/guide-packages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPackages(data); // Update state with fetched packages
        separatePackages(data); // Separate ongoing and completed packages
        console.log(data);
      } catch (error) {
        console.error("Error fetching guide packages:", error);
      }
    };

    fetchGuidePackages();
  }, []);

  const separatePackages = (data) => {
    const ongoing = data.filter((pkg) => pkg.status === "Ongoing");
    const completed = data.filter((pkg) => pkg.status === "Completed");
    setOngoingPackages(ongoing);
    setCompletedPackages(completed);
  };

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
            Current{" "}
            <Text style={[styles.Text, { color: "#A5A2D8" }]}>Packages</Text>
          </Text>
          {packages &&
            packages.length > 0 &&
            packages
              .filter((pkg) => pkg.status === "ongoing")
              .map((pkg, index) => (
                <View key={index} style={styles.PackageBox}>
                  <Text style={styles.detailsHeading}>Details</Text>
                  <Text style={styles.details}>
                    Package ID: {pkg.package_id}
                  </Text>
                  <Text style={styles.details}>
                    User Rating: {pkg.user_rating}
                  </Text>
                  {pkg.guide_rating ? (
                    <Text style={styles.details}>
                      Guide Rating: {pkg.guide_rating}
                    </Text>
                  ) : (
                    <Text style={styles.needToBeRated}>Need To Be Rated</Text>
                  )}
                  <Text style={styles.detailsHeading}>Package Details</Text>
                  <Text style={styles.details}>
                    Destination: {pkg.destination}
                  </Text>
                  <Text style={styles.details}>
                    Start Date: {pkg.start_date}
                  </Text>
                  <Text style={styles.details}>End Date: {pkg.end_date}</Text>
                  <Text style={styles.details}>
                    Number of Persons: {pkg.no_of_person}
                  </Text>
                  <Text style={styles.detailsHeading}>Tourist Info</Text>
                  <Text style={styles.details}>Name: {pkg.name}</Text>
                  <Text style={styles.details}>
                    Contact Number: {pkg.contact_no}
                  </Text>
                  <Text style={styles.details}>Status: {pkg.status}</Text>
                </View>
              ))}
          <Text style={styles.Text}>
            Completed{" "}
            <Text style={[styles.Text, { color: "#A5A2D8", right: -10 }]}>
              Packages
            </Text>
          </Text>
          {packages &&
            packages.length > 0 &&
            packages
              .filter((pkg) => pkg.status === "completed")
              .map((pkg, index) => (
                <View key={index} style={styles.PackageBox}>
                  <Text style={styles.detailsHeading}>Details</Text>
                  <Text style={styles.details}>
                    Package ID: {pkg.package_id}
                  </Text>
                  <Text style={styles.details}>
                    User Rating: {pkg.user_rating}
                  </Text>
                  {pkg.guide_rating ? (
                    <Text style={styles.details}>
                      Guide Rating: {pkg.guide_rating}
                    </Text>
                  ) : (
                    <Text style={styles.needToBeRated}>Guide Rating: Need To Be Rated</Text>
                  )}
                  <Text style={styles.detailsHeading}>Package Details</Text>
                  <Text style={styles.details}>
                    Destination: {pkg.destination}
                  </Text>
                  <Text style={styles.details}>
                    Start Date: {pkg.start_date}
                  </Text>
                  <Text style={styles.details}>End Date: {pkg.end_date}</Text>
                  <Text style={styles.details}>
                    Number of Persons: {pkg.no_of_person}
                  </Text>
                  <Text style={styles.detailsHeading}>Tourist Info</Text>
                  <Text style={styles.details}>Name: {pkg.name}</Text>
                  <Text style={styles.details}>
                    Contact Number: {pkg.contact_no}
                  </Text>
                  <Text style={styles.details}>Status: {pkg.status}</Text>
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
  PackageBox: {
    marginTop: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    padding: 20,
    width: Dimensions.get("window").width * 0.8,
  },
  ProfileContainer: {
    alignItems: "center",
    paddingBottom: 100,
  },
  UserIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
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
  needToBeRated: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "red",
    marginBottom: 5,
  },
});

export default GuideCurrentPackage;
