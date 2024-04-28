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
        console.log(data);
      } catch (error) {
        console.error("Error fetching guide packages:", error);
      }
    };

    fetchGuidePackages();
  }, []);

  const navigateToGuideHome = () => {
    navigation.navigate("GuideHomeScreen");
  };

  const handleReadMore = (pkg) => {
    setSelectedPackage(pkg);
  };

  const closeModal = () => {
    setSelectedPackage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <ImageBackground
        style={styles.Rectangle}
        source={require("../../assets/5.png")}
      >
        <Text style={styles.Text}>
          Current{" "}
          <Text style={[styles.Text, { color: "white" }]}>Packages</Text>
        </Text>
      </ImageBackground>
      <View style={styles.ProfileContainer}>
        {packages &&
          packages.length > 0 &&
          packages.map((pkg, index) => (
            <View key={index} style={styles.PackageBox}>
              <Image
                style={styles.UserIcon}
                source={require("../../assets/ellipse.png")}
              />
              <View style={styles.Buttons}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Package ID: {pkg.package_id}
                </Text>
                <Text>Status: {pkg.status}</Text>
                <TouchableOpacity
                  style={styles.ReadMoreButton}
                  onPress={() => handleReadMore(pkg)}
                >
                  <Text style={styles.ReadMoreButtonText}>Read More</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
      <TouchableOpacity
        onPress={navigateToGuideHome}
        style={styles.ProfileButton}
      >
        <Image
          source={require("../../assets/Home.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      <Modal
        visible={selectedPackage !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.ModalContainer}>
          <View style={styles.ModalContent}>
            <Text style={styles.ModalHeading}>Package Details</Text>
            <Text>Package ID: {selectedPackage?.package_id}</Text>
            <Text>Status: {selectedPackage?.status}</Text>
            <TouchableOpacity
              style={styles.CloseButton}
              onPress={closeModal}
            >
              <Text style={styles.CloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    fontSize: 30,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginTop: 100,
    right: 15,
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
    width: Dimensions.get("window").width - 40,
  },
  UserIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  Buttons: {
    alignItems: "center",
  },
  ReadMoreButton: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  ReadMoreButtonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  ModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  ModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40,
    alignItems: "center",
  },
  ModalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  CloseButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  CloseButtonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
  },
});

export default GuideCurrentPackage;