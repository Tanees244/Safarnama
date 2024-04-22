import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/native";

const GuidePersonalDetail = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.9;
  const inputWidth = containerWidth * 0.9;
  const uploadButtonWidth = containerWidth * 0.9;
  const route = useRoute();
  const { userId } = route.params;

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    address: "",
    phoneNumber: "",
    cnicNumber: "",
  });

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const isFormDataValid = () => {
    return (
      formData.fullName &&
      formData.age &&
      formData.email &&
      formData.address &&
      formData.phoneNumber &&
      formData.cnicNumber
    );
  };

  const handleUploadDocuments = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.12:8000/api/guideRoutes/guide_personal_details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, userId }),
        }
      );

      if (response.ok) {
        const responseData = await response.json(); 
        console.log(responseData);
        navigation.navigate("GuideDocument" , { guideId: responseData.guideId });
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
        <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
          <Ellipse cx="20%" cy="20%" rx="300" ry="300" fill="#4f697c" />
        </Svg>
        <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
          <Ellipse cx="80%" cy="90%" rx="250" ry="250" fill="#355369" />
        </Svg>

        <Text style={styles.Text}>
          Personal{" "}
          <Text style={[styles.Text, { color: "white" }]}>Details</Text>
        </Text>

        <View style={styles.indicator}>
          <View style={styles.pageIndicatorActive} />
          <View style={styles.pageIndicator} />
          <View style={styles.pageIndicator} />
          <View style={styles.pageIndicator} />
        </View>

        <View style={styles.ButtonContainer}>
          <TextInput
            placeholder="Enter Your Full Name"
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange("fullName", text)}
            value={formData.fullName}
          />
          <TextInput
            placeholder="Enter Your Age"
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange("age", text)}
            value={formData.age}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Enter Your Email"
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange("email", text)}
            value={formData.email}
          />
          <TextInput
            placeholder="Enter Your Address"
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange("address", text)}
            value={formData.address}
          />
          <TextInput
            placeholder="Enter Your Phone Number"
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange("phoneNumber", text)}
            value={formData.phoneNumber}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Enter Your CNIC"
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange("cnicNumber", text)}
            value={formData.cnicNumber}
            keyboardType="numeric"
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.UploadButton, { width: uploadButtonWidth }]}
            onPress={handleUploadDocuments}
          >
            <Text style={styles.UploadButtonText}>Upload Your Documents</Text>
            <Image
              style={styles.UploadButtonImage}
              source={require("../../assets/plus.png")}
            />
          </TouchableOpacity>
        </View>
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
  backgroundEllipse: {
    position: "absolute",
  },
  Text: {
    fontSize: 32,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginTop: 40,
    padding: 20,
  },
  indicator: {
    flexDirection: "row",
    top: 30,
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
    marginHorizontal: 2,
  },
  PageIndicator: {
    borderWidth: 1,
    borderRadius: 30,
    width: 80,
    height: 15,
    borderColor: "black",
    backgroundColor: "#CCCCCC",
    marginHorizontal: 2,
  },
  PageIndicatorActive: {
    borderWidth: 1,
    borderRadius: 30,
    width: 80,
    height: 15,
    borderColor: "white",
    backgroundColor: "#071B26",
    marginHorizontal: 5,
  },
  ButtonContainer: {
    marginTop: 70,
    marginBottom: 70,
    width: "100%",
    alignItems: "center",
  },
  Input: {
    backgroundColor: "#cccccc",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    height: 80,
    fontFamily: "Poppins-SemiBold",
  },
  UploadButton: {
    backgroundColor: "#cccccc",
    borderRadius: 10,
    marginTop: 10,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  UploadButtonText: {
    color: "#6E6E6E",
    fontFamily: "Poppins-SemiBold",
  },
  UploadButtonImage: {
    width: 50,
    height: 50,
  },
});

export default GuidePersonalDetail;
