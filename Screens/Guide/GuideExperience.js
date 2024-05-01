import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const GuideExperience = () => {
  const [text, setText] = useState("");
  const textInputRef = useRef(null);
  const navigation = useNavigation();
  const [experience, setExperience] = useState("");
  const [motivation, setMotivation] = useState("");

  const route = useRoute();
  const { guideId } = route.params;

  const handleTextChange = (newText) => {
    setText(newText);
    const totalHeight = newText.split("\n").length * 25 + 50;

      if (textInputRef.current) {
        textInputRef.current.setNativeProps({
          height: Math.max(0, totalHeight),
        });
      }
    };

  const handleExperienceChange = (newExperience) => {
    setExperience(newExperience);
  };

  const handleMotivationChange = (newMotivation) => {
    setMotivation(newMotivation);
  };

  const handleGuideBankDetail = async () => {
    if (experience && motivation) {
      try {
        const response = await axios.post(
          "http://192.168.100.12:8000/api/guideRoutes/guide_experience",
          {
            experience,
            motivation,
            guideId,
          }
        );

        console.log("Guide ID in GuideExperience:", guideId);

        if (response.status === 200) {
          console.log("Guide experience submitted successfully");
          navigation.navigate("GuideBankDetail", { guideId });
        } else {
          console.error("Failed to submit guide experience");
          Alert.alert("Failed to submit guide experience. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting guide experience:", error);
        Alert.alert(
          "An error occurred while submitting guide experience. Please try again later."
        );
      }
    } else {
      Alert.alert("Please fill in all fields before submitting.");
    }
  };

  const screenWidth = Dimensions.get("window").width;
  const inputContainerWidth = screenWidth * 0.9;
  const buttonWidth = screenWidth * 0.4;
  const submitButton = screenWidth * 0.8;
  const inputBoxWidth = inputContainerWidth - 1; // Subtract padding

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>Experience</Text>

        <View style={styles.indicator}>
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicator} />
          <View style={styles.pageIndicator} />
        </View>

        <View style={[styles.inputContainer, { width: inputContainerWidth }]}>
          <Text style={styles.inputHeading}>Your Past Experience</Text>
          <View style={[styles.inputBox, { width: inputBoxWidth }]}>
            <TextInput
              ref={textInputRef}
              multiline={true}
              style={styles.input}
              onChangeText={handleExperienceChange}
            />
          </View>
        </View>

        <View style={[styles.inputContainer, { width: inputContainerWidth }]}>
          <Text style={styles.inputHeading}>Motivation to become a guide</Text>
          <View style={[styles.inputBox, { width: inputBoxWidth }]}>
            <TextInput
              ref={textInputRef}
              multiline={true}
              style={styles.input}
              onChangeText={handleMotivationChange}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.submitButton, { width: submitButton }]}
          onPress={handleGuideBankDetail}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  Container: {
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: "#1a1a1a",
    shadowColor: "black",
    elevation: 20,
    zIndex: -1,
  },
  headerText: {
    textAlign: "center",
    top: 60,
    color: "white",
    fontSize: 30,
    fontFamily: "Poppins-Bold",
  },
  text: {
    fontSize: 32,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginTop: 30,
    marginBottom: 20,
  },
  indicator: {
    flexDirection: "row",
    marginTop: 20,
  },
  pageIndicator: {
    borderWidth: 1,
    borderRadius: 30,
    width: 80,
    height: 15,
    borderColor: "black",
    backgroundColor: "#D9D9D9",
    marginHorizontal: 2,
  },
  pageIndicatorActive: {
    borderWidth: 1,
    borderRadius: 30,
    width: 80,
    height: 15,
    borderColor: "white",
    backgroundColor: "#071B40",
    marginHorizontal: 5,
  },
  inputContainer: {
    marginTop: 30,
    alignItems: "flex-start",
    
  },
  inputHeading: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
  inputBox: {
    marginTop: 10,
    backgroundColor: "#D9D9D9",
    height: 80,
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 25,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  submitButton: {
    borderRadius: 38,
    backgroundColor: "#319BD6",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginTop: 160,
    marginBottom: 30,
  },
  submitButtonText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
});

export default GuideExperience;
