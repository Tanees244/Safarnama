import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { Image } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GuideHomeScreen = () => {
  const [guideData, setGuideData] = useState(null);
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 1;
  const buttonWidth = containerWidth * 0.7;
  const navigation = useNavigation();

  const navigateToGuideHome = () => {
    navigation.navigate("GuideProfile"); // Replace with your screen name
  };

  const navigateToGuideCurrentPackage = () => {
    navigation.navigate("GuideCurrentPackage"); // Replace with your screen name
  };

  const navigateToGuideUserReview = () => {
    navigation.navigate("GuideUserReview"); // Replace with your screen name
  };

  const navigateToGuideClientsFeedback = () => {
    navigation.navigate("GuideClientsFeedback"); // Replace with your screen name
  };

  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        const response = await fetch(
          "http://192.168.100.18:8000/api/guideRoutes/guide-details",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch guide details");
        }
        setGuideData(data);
      } catch (error) {
        console.error("Error fetching guide details:", error);
      }
    };

    fetchGuideDetails();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>

      <ScrollView contentContainerStyle={styles.Container}>
        <View style={[styles.InfoContainer, { width: containerWidth }]}>
          <Image
            style={styles.userIcon}
            source={{ uri: `data:image/jpeg;base64,${guideData?.picture}` }}
          />
          <View style={styles.details}>
            <Text style={styles.guideName}>
              Welcome {"\n"} {guideData?.name}!
            </Text>
            <Text style={styles.guideId}>Guide ID : {guideData?.guide_id}</Text>
          </View>
        </View>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={navigateToGuideCurrentPackage}
            style={[styles.Buttons, { width: buttonWidth }]}
          >
            <Text style={styles.ButtonText}>Packages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={navigateToGuideClientsFeedback}
            style={[styles.Buttons, { width: buttonWidth }]}
          >
            <Text style={styles.ButtonText}>Guide's Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={navigateToGuideUserReview}
            style={[styles.Buttons, { width: buttonWidth }]}
          >
            <Text style={styles.ButtonText}>User Reviews </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={navigateToGuideHome}
        style={styles.ProfileButton}
      >
        <Image
          source={require("../../assets/account-circle-black.png")}
          style={[{ width: 40, height: 40 }]}
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
  InfoContainer: {
    backgroundColor: "#506266",
    // top: 20,
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ProfileButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 90,
    height: 90,
    padding: 15,
    borderRadius: 35,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 2,
  },
  userIcon: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  guideName: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    textAlign: "center",
  },
  guideId: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    textAlign: "center",
    marginTop: 5,
  },
  Rectangle: {
    backgroundColor: "#A5A2D8",
    borderRadius: 46,
    height: 320,
    top: -10,
    width: "100%",
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonContainer: {
    borderRadius: 33,
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  Buttons: {
    backgroundColor: "#071B26",
    height: 100,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  ButtonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
});

export default GuideHomeScreen;
