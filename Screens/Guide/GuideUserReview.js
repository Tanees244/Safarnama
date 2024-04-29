import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const GuideUserReview = () => {
  const screenWidth = Dimensions.get("window").width;

  const [packages, setPackages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);
  const [ratingInput, setRatingInput] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
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

  const openRatingModal = (index) => {
    setSelectedPackageIndex(index);
    setModalVisible(true);
  };

  const handleRatingSubmit = async () => {
    const rating = parseInt(ratingInput);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      alert("Please enter a valid rating (1-5).");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await fetch(
        "http://192.168.100.18:8000/api/guideRoutes/update-user-rating",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userRating: rating,
            packageId: packages[selectedPackageIndex]?.package_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user rating");
      }

      // Update packages state with the new user rating
      const updatedPackages = [...packages];
      updatedPackages[selectedPackageIndex].user_rating = rating;
      setPackages(updatedPackages);

      console.log("Rating updated successfully");
      setModalVisible(false);
      setSelectedPackageIndex(null);
      setRatingInput("");
    } catch (error) {
      console.error("Error updating user rating:", error);
      alert("Failed to update user rating");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={styles.ProfileContainer}>
          <Text style={styles.Text}>
            Guide's{" "}
            <Text style={[styles.Text, { color: "#506266" }]}>Feedback</Text>
          </Text>
          {packages &&
            packages.length > 0 &&
            packages.map((pkg, index) => (
              <View key={index} style={styles.reviewBox}>
                <Text style={styles.detailsHeading}>Details</Text>
                <Text style={styles.details}>Package ID: {pkg.package_id}</Text>
                <Text style={styles.details}>
                  Guide Rating:{" "}
                  {pkg.user_rating ? (
                    <Text>{pkg.user_rating}</Text>
                  ) : (
                    <Text style={styles.notAvailableText}>Not Available</Text>
                  )}
                </Text>
                {pkg.user_rating && (
                  <TouchableOpacity
                    style={styles.updateRatingButton}
                    onPress={() => openRatingModal(index)}
                  >
                    <Text style={styles.buttonText}>Update Rating</Text>
                  </TouchableOpacity>
                )}
                {!pkg.user_rating && (
                  <TouchableOpacity
                    style={styles.rateNowButton}
                    onPress={() => openRatingModal(index)}
                  >
                    <Text style={styles.buttonText}>Rate Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Rate Now</Text>
            <TextInput
              style={styles.ratingInput}
              placeholder="Enter rating (1-5)"
              keyboardType="numeric"
              value={ratingInput}
              onChangeText={setRatingInput}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleRatingSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  ProfileContainer: {
    alignItems: "center",
    paddingBottom: 100,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "70%",
    padding: 20,
    alignItems: "center",
  },
  modalHeading: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginBottom: 20,
  },
  ratingInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    marginBottom: 20,
  },
  notAvailableText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginBottom: 5,
    color: "#FF6347",
  },
  rateNowButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  updateRatingButton: {
    backgroundColor: "#FF6347", // Red color for emphasis
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10, // Adjust spacing as needed
  },
  modalButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
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

export default GuideUserReview;
