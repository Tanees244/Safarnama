import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TouristPersonalDetail = () => {
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
    image: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    age: "",
    email: "",
    phoneNumber: "",
    cnicNumber: "",
  });

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          image: result.assets[0].uri,
        }));
        console.log("Selected Image URI:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    pickImage();
  };

  const isFormDataValid = () => {
    let errors = {
      fullName: "",
      age: "",
      email: "",
      phoneNumber: "",
      cnicNumber: "",
    };

    let isValid = true;

    if (!formData.fullName) {
      errors.fullName = "Full Name is required";
      isValid = false;
    }

    if (
      !formData.age ||
      isNaN(formData.age) ||
      formData.age <= 0 ||
      formData.age > 100
    ) {
      errors.age = "Age must be a number between 1 and 100";
      isValid = false;
    }

    if (!formData.email || !formData.email.includes("@")) {
      errors.email = "Invalid Email";
      isValid = false;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 11) {
      errors.phoneNumber = "Phone Number must be 11 digits";
      isValid = false;
    }

    if (!formData.cnicNumber || formData.cnicNumber.length !== 13) {
      errors.cnicNumber = "CNIC must be 13 digits";
      isValid = false;
    }

    setFormErrors(errors);

    return isValid;
  };

  const handleSubmit = async () => {
    console.log("Submit button pressed");

    if (!formData.image) {
      console.log("Form data or image is invalid");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log(token);
      const formDataWithImage = new FormData();
      formDataWithImage.append("image", {
        uri: formData.image,
        type: "image/jpeg",
        name: "photo.jpg",
      });
      console.log(userId);
      formDataWithImage.append("fullName", formData.fullName);
      formDataWithImage.append("age", formData.age);
      formDataWithImage.append("email", formData.email);
      formDataWithImage.append("address", formData.address);
      formDataWithImage.append("phoneNumber", formData.phoneNumber);
      formDataWithImage.append("cnicNumber", formData.cnicNumber);
      formDataWithImage.append("userId", userId);

      const response = await fetch(
        "http://192.168.100.18:8000/api/routes/tourist_personal_details",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formDataWithImage,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        // Assuming you want to navigate after successful submission
        navigation.navigate("Login");
      } else {
        console.error("Error in API response:", response.statusText);
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
          {formErrors.fullName !== "" && (
            <Text style={styles.errorText}>{formErrors.fullName}</Text>
          )}

          <TextInput
            placeholder="Enter Your Age"
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange("age", text)}
            value={formData.age}
            keyboardType="numeric"
          />
          {formErrors.age !== "" && (
            <Text style={styles.errorText}>{formErrors.age}</Text>
          )}

          <TextInput
            placeholder="Enter Your Email"
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange("email", text)}
            value={formData.email}
          />
          {formErrors.email !== "" && (
            <Text style={styles.errorText}>{formErrors.email}</Text>
          )}

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
          {formErrors.phoneNumber !== "" && (
            <Text style={styles.errorText}>{formErrors.phoneNumber}</Text>
          )}

          <TextInput
            placeholder="Enter Your CNIC Number"
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={(text) => handleFieldChange("cnic", text)}
            value={formData.cnic}
            keyboardType="numeric"
          />
          {formErrors.cnicNumber !== "" && (
            <Text style={styles.errorText}>{formErrors.cnicNumber}</Text>
          )}

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.UploadButton, { width: uploadButtonWidth }]}
            onPress={handleImagePicker}
          >
            <Text style={styles.UploadButtonText}>Upload Your Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.submitButton, { width: inputWidth }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
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
    justifyContent: "center",
    alignItems: "center",
    // width: inputWidth,
  },
  UploadButtonText: {
    color: "#6E6E6E",
    fontFamily: "Poppins-SemiBold",
  },
  errorText: {
    color: "red",
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#071B40",
    borderRadius: 10,
    marginTop: 20,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
});

export default TouristPersonalDetail;
