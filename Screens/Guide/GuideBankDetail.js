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

const GuideBankDetail = () => {
  const [accountName, setAccountName] = useState("");
  const [ibanNumber, setIbanNumber] = useState("");
  const screenWidth = Dimensions.get("window").width;
  const inputContainerWidth = screenWidth * 0.9;
  const submitButton = screenWidth * 0.8;
  const inputBoxWidth = inputContainerWidth - 1;
  const textInputRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { guideId } = route.params;

  const handleGuideQuestionnaire = async () => {
    if (!accountName || !ibanNumber) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    // if (ibanNumber.length !== 24) {
    //   Alert.alert("Invalid IBAN Number", "IBAN number must be 24 characters long.");
    //   return;
    // }

    try {
      const response = await axios.post(
        "http://192.168.100.12:8000/api/guideRoutes/guide_bank_details",
        {
          guideId,
          accountName,
          ibanNumber,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        navigation.navigate("GuideQuestionnaire", { guideId });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>
          <Text style={styles.bank}>Bank</Text>
          <Text style={styles.details}> Details</Text>
        </Text>

        <View style={styles.indicator}>
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicator} />
        </View>

        <View style={[styles.inputContainer, { width: inputContainerWidth }]}>
          <Text style={styles.inputHeading}>Account Name</Text>
          <View style={[styles.inputBox, { width: inputBoxWidth }]}>
            <TextInput
              ref={textInputRef}
              multiline={true}
              style={styles.input}
              onChangeText={setAccountName}
            />
          </View>
        </View>

        <View style={[styles.inputContainer, { width: inputContainerWidth }]}>
          <Text style={styles.inputHeading}>IBAN Number</Text>
          <View style={[styles.inputBox, { width: inputBoxWidth }]}>
            <TextInput
              ref={textInputRef}
              multiline={true}
              style={styles.input}
              value={ibanNumber}
              onChangeText={setIbanNumber}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.submitButton, { width: submitButton }]}
          onPress={handleGuideQuestionnaire}
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
  bank: {
    color: "black", // Change the color to your desired color for "Bank"
  },
  details: {
    color: "#319BD6", // Change the color to your desired color for "Details"
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
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  input: {
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

export default GuideBankDetail;
