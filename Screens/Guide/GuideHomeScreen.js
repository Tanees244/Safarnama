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

const GuideHome = () => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.8;
  const buttonWidth = containerWidth * 0.8;
  const navigation = useNavigation();

  const navigateToGuideProfile = () => {
    navigation.navigate("GuideProfile");
  };

  const navigateToGuideHome = () => {
    navigation.navigate("GuideHomeScreen");
  };

  const navigateToGuideCurrentPackage = () => {
    navigation.navigate("GuideCurrentPackage");
  };

  const navigateToGuidePastPackage = () => {
    navigation.navigate("GuidePastPackage");
  };

  const navigateToGuideUserReview = () => {
    navigation.navigate("GuideUserReview");
  };

  const navigateToGuideClientsFeedback = () => {
    navigation.navigate("GuideClientsFeedback");
  };

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <View style={styles.Rectangle}>
        <Text style={styles.text}>Safarnama</Text>
        <Text
          style={{ color: "white", fontSize: 28, fontFamily: "Poppins-Regular", top: 10 }}
        >
          Welcome Guide!
        </Text>
      </View>

      <View style={[styles.ButtonContainer, { width: containerWidth }]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={navigateToGuideCurrentPackage}
          style={[styles.Buttons, { width: buttonWidth }]}
        >
          <Text style={styles.ButtonText}>Current Packages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={navigateToGuidePastPackage}
          style={[styles.Buttons, { width: buttonWidth }]}
        >
          <Text style={styles.ButtonText}>Past Packages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={navigateToGuideUserReview}
          style={[styles.Buttons, { width: buttonWidth }]}
        >
          <Text style={styles.ButtonText}>User Reviews </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={navigateToGuideClientsFeedback}
          style={[styles.Buttons, { width: buttonWidth }]}
        >
          <Text style={styles.ButtonText}>Client's Feedback</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={navigateToGuideProfile} style={styles.ProfileButton}>
        <Image
          source={require("../../assets/account-circle-black.png")}
          style={[{ width: 40, height: 40 }]}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#D9D9D9",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  homeicon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  home: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: "Poppins-Regular",
    marginTop: 2,
    textAlign: "center",
    color: "white",
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
  Rectangle: {
    backgroundColor: "#20262E",
    borderRadius: 40,
    height: 30,
    top: -10,
    width: "100%",
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  ButtonContainer: {
    borderRadius: 33,
    marginTop: 200,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  Buttons: {
    backgroundColor: "#071B26",
    height: 100,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  ButtonContainer1: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#292929",
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 50,
    marginTop: 50,
    width: 160,
  },

  ButtonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
});

export default GuideHome;
